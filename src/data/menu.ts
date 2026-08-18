export type MenuItem = {
  name: string;
  description?: string;
  price: string;
};

export type MenuGroup = {
  title: string;
  items: MenuItem[];
};

export type MenuSection = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  groups: MenuGroup[];
};

export const menuSections: MenuSection[] = [
  {
    id: "petit-dejeuner",
    eyebrow: "I — Le matin",
    title: "Petit Déjeuner",
    intro:
      "Des matinées lentes, dressées à la main. Servi jusqu'à 12h, à partager ou à savourer seul.",
    groups: [
      {
        title: "Formules",
        items: [
          {
            name: "Starter",
            description: "Café, croissant, eau 0.5L & mini jus",
            price: "12",
          },
          {
            name: "Sweet Mountain",
            description:
              "Café, eau 0.5L, croissant ou gâteau, confiture, miel, chocolat, pancake ou crêpe, jus, fondant, pain",
            price: "22",
          },
          {
            name: "Everest — 1 pers.",
            description:
              "Café, pâte à tartiner, poulet croustillant et sa sauce, batbout harissa-thon, fondant, confiture, pommes de terre crémeuses, croissant, pancake, omelette, charcuterie & fruits de saison",
            price: "32",
          },
          { name: "Everest — 2 pers.", price: "49" },
          { name: "Everest — 3 pers.", price: "69" },
          {
            name: "Kids",
            description:
              "Pancake ou crêpe, salade de fruits, œuf, yaourt, eau 0.5L, grain d'or & lait au chocolat",
            price: "15",
          },
        ],
      },
    ],
  },
  {
    id: "cafes",
    eyebrow: "II — La torréfaction",
    title: "Cafés & Chocolats",
    intro:
      "Un grain arabica torréfié lentement, tiré court. Le cœur de la maison depuis le premier jour.",
    groups: [
      {
        title: "Cafés",
        items: [
          { name: "Espresso", price: "4" },
          { name: "Américano", price: "4,5" },
          { name: "Cappucin", price: "4,5" },
          { name: "Lait chocolaté", price: "5" },
          { name: "Café latte", price: "5" },
          { name: "Cappuccino", price: "6" },
          { name: "Macchiato caramel", price: "6" },
          { name: "Macchiato noisette", price: "6" },
          { name: "Café glacé", price: "7" },
          { name: "Affogato", price: "8" },
        ],
      },
      {
        title: "Chocolat Chaud",
        items: [
          { name: "Classique", price: "8" },
          { name: "Nutella", price: "10" },
          { name: "Snickers", price: "10" },
          { name: "Kinder", price: "10" },
        ],
      },
      {
        title: "Thé",
        items: [
          { name: "Classique", price: "3,5" },
          { name: "Sirop", price: "4,5" },
          { name: "Amande", price: "7" },
          { name: "Pignons", price: "9" },
        ],
      },
      {
        title: "Frappuccino",
        items: [
          { name: "Caramel", price: "10" },
          { name: "Noisette", price: "10" },
          { name: "Vanille", price: "10" },
          { name: "Oreo", price: "11" },
          { name: "Nutella", price: "11" },
          { name: "Speculoos", price: "13" },
        ],
      },
    ],
  },
  {
    id: "fraicheur",
    eyebrow: "III — La fraîcheur",
    title: "Mojitos, Jus & Smoothies",
    intro:
      "Fruits pressés à la commande, glace pilée, menthe cueillie le matin même.",
    groups: [
      {
        title: "Mojito",
        items: [
          { name: "Virgin", price: "9" },
          { name: "Blue", price: "10" },
          { name: "Red", price: "10" },
          { name: "Pêche", price: "11" },
          { name: "Kiwi", price: "11" },
          { name: "Fraise", price: "11" },
          { name: "Énergétique", price: "14" },
        ],
      },
      {
        title: "Jus",
        items: [
          { name: "Orange", price: "7" },
          { name: "Citronnade", price: "8" },
          { name: "Fraise", price: "8" },
          { name: "Cocktail", price: "10" },
          { name: "Piña Colada", price: "11" },
          { name: "Cocktail énergétique", price: "13" },
        ],
      },
      {
        title: "Smoothie",
        items: [
          { name: "Fraise banane", price: "12" },
          { name: "Acajou banane", price: "12" },
          { name: "Kiwi banane", price: "12" },
          { name: "Fruits rouges banane", price: "13" },
          { name: "Blue berry", price: "13" },
          { name: "Avocat banane", price: "14" },
        ],
      },
      {
        title: "Detox",
        items: [
          { name: "Gingembre citron ananas", price: "10" },
          { name: "Kiwi banane orange", price: "10" },
          { name: "Gingembre mangue", price: "10" },
        ],
      },
      {
        title: "Milkshake",
        items: [
          { name: "Caramel", price: "10" },
          { name: "Oreo", price: "11" },
          { name: "Nutella", price: "12" },
          { name: "Kinder", price: "12" },
          { name: "Snickers", price: "12" },
          { name: "Sweet blood", price: "13" },
          { name: "Oreo Nutella", price: "14" },
        ],
      },
      {
        title: "Saveurs Liquides",
        items: [
          { name: "Eau minérale 0.5L", price: "2,5" },
          { name: "Eau minérale 1L", price: "3,5" },
          { name: "Soda", price: "4,5" },
          { name: "Eau gazeuse", price: "5" },
          { name: "Boisson énergétique", price: "10" },
        ],
      },
    ],
  },
  {
    id: "sucre",
    eyebrow: "IV — Le sucré",
    title: "Crêpes, Pancakes & Pâtisseries",
    intro:
      "Pâte reposée, cuisson minute, chocolat coulant. Le geste le plus attendu de la maison.",
    groups: [
      {
        title: "Crêpe Sucrée",
        items: [
          { name: "Nutella", price: "13" },
          { name: "Ottelo", price: "14" },
          { name: "Snickers", price: "14" },
          { name: "Kinder", price: "15" },
          { name: "Rocher", price: "15" },
          { name: "Nutella & fruits secs", price: "15" },
          { name: "Nutella & banane", price: "16" },
          { name: "Pistache", price: "16" },
        ],
      },
      {
        title: "Pancake",
        items: [
          { name: "Nutella", price: "13" },
          { name: "Ottelo", price: "14" },
          { name: "Snickers", price: "14" },
          { name: "Kinder", price: "15" },
          { name: "Rocher", price: "15" },
          { name: "Nutella & fruits secs", price: "15" },
          { name: "Nutella & banane", price: "16" },
          { name: "Pistache", price: "16" },
        ],
      },
      {
        title: "Pâtisseries",
        items: [
          { name: "Croissant", price: "3,5" },
          { name: "Cake", price: "4" },
          { name: "Tarte", price: "5" },
          { name: "Gâteaux", price: "7" },
          { name: "Fondant au chocolat", price: "8" },
          { name: "Glace", price: "9" },
          { name: "Cheesecake", price: "13" },
        ],
      },
      {
        title: "Suppléments",
        items: [
          { name: "Sirop", price: "1" },
          { name: "Crème chantilly", price: "2" },
          { name: "Fruits secs", price: "4" },
          { name: "Fruits frais", price: "4" },
          { name: "Frites", price: "4" },
        ],
      },
    ],
  },
  {
    id: "sale",
    eyebrow: "V — Le salé",
    title: "Salé & Four à Bois",
    intro:
      "Pain travaillé chaque matin, escalope marinée, sauces maison. Généreux, jamais bruyant.",
    groups: [
      {
        title: "Pizza",
        items: [
          { name: "Margherita", price: "12" },
          { name: "Végétarienne", price: "12" },
          { name: "Jambon", price: "14" },
          { name: "Neptune", price: "15" },
          { name: "Escalope", price: "17" },
          { name: "4 saisons", price: "18" },
          { name: "4 fromages", price: "20" },
        ],
      },
      {
        title: "Baguette Farcie",
        items: [
          { name: "Thon", price: "12" },
          { name: "Escalope", price: "15" },
          { name: "Escalope croustillante", price: "16" },
        ],
      },
      {
        title: "Makloub",
        items: [
          { name: "Thon", price: "12" },
          { name: "Escalope", price: "14" },
          { name: "Escalope croustillante", price: "15" },
        ],
      },
      {
        title: "Crêpe Salée",
        items: [
          { name: "Classique", price: "12" },
          { name: "Française", price: "13" },
          { name: "Tunisienne", price: "13" },
          { name: "Fromage", price: "14" },
          { name: "Escalope", price: "15" },
        ],
      },
      {
        title: "Omelette",
        items: [
          { name: "Fromage", price: "8" },
          { name: "Thon", price: "10" },
          { name: "Jambon", price: "10" },
          { name: "Escalope", price: "13" },
        ],
      },
      {
        title: "Chicha",
        items: [
          { name: "Turc", price: "13" },
          { name: "Kaloud", price: "15" },
        ],
      },
    ],
  },
];
