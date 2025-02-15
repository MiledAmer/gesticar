export type UserRole = "admin" | "manager" | "user";

export type User = {
  id: string;
  name: string;
  telephone: string;
  address: string;
  email: string;
  role: UserRole;
  createdAt: Date;
};
