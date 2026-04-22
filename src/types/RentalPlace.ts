export type Availability = "AVAILABLE" | "BOOKED" | "MAINTENANCE";

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "size-asc";

export interface RentalSpace {
  id: string;
  vendorId: string;
  pricePerDay: number;
  farm: string;
  location: string;
  size: string;
  sizeOrder: number;
  price: number;
  availability: Availability;
  imageUrl?: string;
  updatedAt: string;
  amenities: string[];
  description?: string;

  //    id           String            @id @default(uuid())
  //   vendorId     String
  //   location     String
  //   size         String
  //   pricePerDay  Decimal           @db.Decimal(10, 2)
  //   availability SpaceAvailability @default(AVAILABLE)
  //   description  String?
  //   imageUrl     String?
  //   amenities    String[]          @default([])
  //   createdAt    DateTime          @default(now())
  //   updatedAt    DateTime          @updatedAt
}

export interface Filters {
  query: string;
  status: Availability | "";
  size: string;
  minPrice: string;
  maxPrice: string;
  sort: SortOption;
  amenities: string[];
}

export interface BookingFormData {
  startDate: string;
  endDate: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export type BookingStep = 1 | 2 | 3 | "success";
