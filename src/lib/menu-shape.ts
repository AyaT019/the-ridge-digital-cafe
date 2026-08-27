import { menuSections, type MenuSection } from "@/data/menu";

export type MenuItemRow = {
  id: string;
  section_id: string;
  group_title: string;
  sort_order: number;
  name: string;
  description: string | null;
  price: string;
};

export const sectionMeta = menuSections.map((s) => ({
  id: s.id,
  title: s.title,
}));

export function buildSections(rows: MenuItemRow[]): MenuSection[] {
  return menuSections
    .map((section) => {
      const sectionRows = rows
        .filter((r) => r.section_id === section.id)
        .sort((a, b) => a.sort_order - b.sort_order);

      const groups: MenuSection["groups"] = [];
      for (const row of sectionRows) {
        let group = groups.find((g) => g.title === row.group_title);
        if (!group) {
          group = { title: row.group_title, items: [] };
          groups.push(group);
        }
        group.items.push({
          name: row.name,
          description: row.description ?? undefined,
          price: row.price,
        });
      }

      return { ...section, groups };
    })
    .filter((section) => section.groups.length > 0);
}
