export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
}

export interface AuthResponse {
  token: string;
  user: User;
}