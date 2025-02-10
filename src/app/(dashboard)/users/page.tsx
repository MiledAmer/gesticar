"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { UsersTable } from "./_components/users-table";
import UserForm from "./_components/user-form";
import type { User } from "~/types/user";

// Sample data - replace with your actual data fetching logic
const sampleUsers: User[] = [
  {
    id: "1",
    name: "Jean Dupont",
    telephone: "01 23 45 67 89",
    email: "jean.dupont@example.com",
    address: "123 Rue de Paris, 75001 Paris",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Marie Martin",
    telephone: "01 98 76 54 32",
    email: "marie.martin@example.com",
    address: "456 Avenue de Lyon, 69003 Lyon",
    role: "manager",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Pierre Bernard",
    telephone: "01 45 67 89 01",
    email: "pierre.bernard@example.com",
    address: "789 Boulevard de Marseille, 13001 Marseille",
    role: "user",
    createdAt: new Date(),
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateUser = async (data: Omit<User, "id" | "createdAt">) => {
    // Add your API call here
    const newUser: User = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setUsers((prev) => [...prev, newUser]);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nouvel Utilisateur
        </Button>
      </div>

      <UsersTable users={users} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvel Utilisateur</DialogTitle>
          </DialogHeader>
          <UserForm
            onSubmit={handleCreateUser}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
