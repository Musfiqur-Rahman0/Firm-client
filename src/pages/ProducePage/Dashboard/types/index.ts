export type UserRole = "ADMIN" | "VENDOR" | "CUSTOMER";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "PENDING";
export type CertStatus = "APPROVED" | "PENDING" | "REJECTED";
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
export type SpaceStatus = "AVAILABLE" | "BOOKED" | "MAINTENANCE";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface Vendor {
  id: string;
  userId: string;
  name: string;
  farmName: string;
  location: string;
  certStatus: CertStatus;
  productsCount: number;
  revenue: number;
  joinedAt: string;
}

export interface Produce {
  id: string;
  name: string;
  vendorName: string;
  category: string;
  price: number;
  quantity: number;
  certStatus: CertStatus;
  isActive: boolean;
}

export interface RentalSpace {
  id: string;
  farmName: string;
  location: string;
  size: string;
  pricePerDay: number;
  status: SpaceStatus;
}

export interface Order {
  id: string;
  customerName: string;
  produceName: string;
  vendorName: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

export interface VendorRequest {
  id: string;
  vendorName: string;
  farmName: string;
  certAgency: string;
  submittedAt: string;
  status: CertStatus;
}

export interface ActivityItem {
  id: string;
  type:
    | "user_joined"
    | "order_placed"
    | "cert_submitted"
    | "space_booked"
    | "vendor_approved";
  message: string;
  time: string;
  avatar: string;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export type DashSection =
  | "overview"
  | "users"
  | "vendors"
  | "produce"
  | "rentals"
  | "orders"
  | "requests";
