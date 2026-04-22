import type { Produce, ProduceCategory } from "../types";

export const CATEGORIES: ProduceCategory[] = [
  "Vegetables",
  "Fruits",
  "Herbs",
  "Seeds",
  "Microgreens",
  "Mushrooms",
];

export const CATEGORY_COLORS: Record<
  ProduceCategory,
  { bg: string; text: string; border: string }
> = {
  Vegetables: { bg: "#d6f2dc", text: "#1a5228", border: "#a8e0b3" },
  Fruits: { bg: "#fef3cd", text: "#92400e", border: "#fcd34d" },
  Herbs: { bg: "#e0f2fe", text: "#075985", border: "#7dd3fc" },
  Seeds: { bg: "#f3e8ff", text: "#6b21a8", border: "#d8b4fe" },
  Microgreens: { bg: "#ecfdf5", text: "#065f46", border: "#6ee7b7" },
  Mushrooms: { bg: "#fef9c3", text: "#713f12", border: "#fde047" },
};

export const CARD_PATTERNS = [
  ["#d6f2dc", "#a8e0b3"],
  ["#fef3cd", "#fcd34d"],
  ["#e0f2fe", "#7dd3fc"],
  ["#f3e8ff", "#d8b4fe"],
  ["#ecfdf5", "#6ee7b7"],
  ["#fef9c3", "#fde047"],
];

export const MOCK_PRODUCE: Produce[] = [
  {
    id: "1",
    name: "Organic Kale",
    description:
      "Fresh, dark leafy kale grown without pesticides. Rich in vitamins A, K, and C. Harvested weekly.",
    price: 4.99,
    category: "Vegetables",
    certificationStatus: "APPROVED",
    availableQuantity: 120,
    isActive: true,
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-04-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Cherry Tomatoes",
    description:
      "Sweet and juicy heirloom cherry tomatoes. Perfect for salads and snacking. Vine-ripened.",
    price: 6.5,
    category: "Vegetables",
    certificationStatus: "APPROVED",
    availableQuantity: 85,
    isActive: true,
    createdAt: "2026-01-15T08:00:00Z",
    updatedAt: "2026-04-02T10:00:00Z",
  },
  {
    id: "3",
    name: "Fresh Basil",
    description:
      "Fragrant Genovese basil, grown in our greenhouse. Bunches sold fresh with stems.",
    price: 3.25,
    category: "Herbs",
    certificationStatus: "APPROVED",
    availableQuantity: 60,
    isActive: true,
    createdAt: "2026-02-01T08:00:00Z",
    updatedAt: "2026-04-03T10:00:00Z",
  },
  {
    id: "4",
    name: "Oyster Mushrooms",
    description:
      "Delicate and meaty oyster mushrooms grown on sustainable substrates. Earthy, mild flavour.",
    price: 8.99,
    category: "Mushrooms",
    certificationStatus: "PENDING",
    availableQuantity: 40,
    isActive: true,
    createdAt: "2026-02-10T08:00:00Z",
    updatedAt: "2026-04-04T10:00:00Z",
  },
  {
    id: "5",
    name: "Pea Shoots",
    description:
      "Tender young pea shoots — sweet, crisp, and packed with nutrients. Great for garnishing.",
    price: 5.5,
    category: "Microgreens",
    certificationStatus: "APPROVED",
    availableQuantity: 75,
    isActive: true,
    createdAt: "2026-02-15T08:00:00Z",
    updatedAt: "2026-04-05T10:00:00Z",
  },
  {
    id: "6",
    name: "Chia Seeds",
    description:
      "Raw organic chia seeds, cold-pressed and dried. High in omega-3 and fibre.",
    price: 12.0,
    category: "Seeds",
    certificationStatus: "APPROVED",
    availableQuantity: 200,
    isActive: true,
    createdAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-04-06T10:00:00Z",
  },
  {
    id: "7",
    name: "Strawberries",
    description:
      "Hand-picked, naturally sweet strawberries grown in raised beds with drip irrigation.",
    price: 7.99,
    category: "Fruits",
    certificationStatus: "REJECTED",
    availableQuantity: 0,
    isActive: false,
    createdAt: "2026-03-05T08:00:00Z",
    updatedAt: "2026-04-07T10:00:00Z",
  },
  {
    id: "8",
    name: "Rosemary Bundle",
    description:
      "Woody, fragrant rosemary bundles. Ideal for roasting, grilling, and infused oils.",
    price: 2.99,
    category: "Herbs",
    certificationStatus: "PENDING",
    availableQuantity: 30,
    isActive: true,
    createdAt: "2026-03-10T08:00:00Z",
    updatedAt: "2026-04-08T10:00:00Z",
  },
];
