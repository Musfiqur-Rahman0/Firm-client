export type CertificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ProduceCategory =
  | "Vegetables"
  | "Fruits"
  | "Herbs"
  | "Seeds"
  | "Microgreens"
  | "Mushrooms";

export interface Produce {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProduceCategory;
  certificationStatus: CertificationStatus;
  availableQuantity: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProduceFormData = Omit<
  Produce,
  "id" | "createdAt" | "updatedAt" | "certificationStatus"
>;

export interface ProduceFilters {
  query: string;
  category: ProduceCategory | "";
  status: CertificationStatus | "";
  isActive: "all" | "active" | "inactive";
  sort:
    | "name-asc"
    | "name-desc"
    | "price-asc"
    | "price-desc"
    | "qty-asc"
    | "qty-desc"
    | "newest";
}

export type ModalMode = "create" | "edit" | null;
