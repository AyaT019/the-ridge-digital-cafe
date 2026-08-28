import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  getAdminSession,
  passwordMatches,
  requireAdmin,
} from "./admin-session.server";
import type { MenuItemRow } from "./menu-shape";

const itemInput = z.object({
  section_id: z.string().trim().min(1).max(60),
  group_title: z.string().trim().min(1).max(80),
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(600).optional().or(z.literal("")),
  price: z.string().trim().min(1).max(20),
});

export const getAdminState = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await getAdminSession();
    if (!session.data.unlocked) return { unlocked: false as const, items: [] };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("menu_items")
      .select("id, section_id, group_title, sort_order, name, description, price")
      .order("section_id")
      .order("sort_order");
    if (error) throw new Error(error.message);

    return { unlocked: true as const, items: (data ?? []) as MenuItemRow[] };
  },
);

export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) =>
    z.object({ password: z.string().trim().min(1).max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"]?.trim();
    if (!expected) throw new Error("ADMIN_PASSWORD is not configured");
    if (!passwordMatches(data.password, expected)) {
      return { ok: false as const };
    }
    const session = await getAdminSession();
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

export const createMenuItem = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => itemInput.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: last } = await supabaseAdmin
      .from("menu_items")
      .select("sort_order")
      .eq("section_id", data.section_id)
      .eq("group_title", data.group_title)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = await supabaseAdmin.from("menu_items").insert({
      section_id: data.section_id,
      group_title: data.group_title,
      name: data.name,
      description: data.description ? data.description : null,
      price: data.price,
      sort_order: (last?.sort_order ?? 0) + 1,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const updateMenuItem = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    itemInput.extend({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("menu_items")
      .update({
        section_id: data.section_id,
        group_title: data.group_title,
        name: data.name,
        description: data.description ? data.description : null,
        price: data.price,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteMenuItem = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("menu_items")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
