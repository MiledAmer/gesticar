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
import { AgenciesTable } from "./_components/agencies-table";
import AgencyForm from "./_components/agency-form";
import type { Agency } from "~/types/agency";

// Sample data - replace with your actual data fetching logic
const sampleAgencies: Agency[] = [
  {
    id: "1",
    name: "Agence Paris Centre",
    telephone: "01 23 45 67 89",
    email: "paris@example.com",
    address: "123 Rue de Paris",
    town: "1er Arrondissement",
    city: "Paris",
    postalCode: "75001",
    rne: "RNE123456",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Agence Lyon",
    telephone: "04 56 78 90 12",
    email: "lyon@example.com",
    address: "456 Avenue de Lyon",
    town: "La Part-Dieu",
    city: "Lyon",
    postalCode: "69003",
    rne: "RNE789012",
    createdAt: new Date(),
  },
];

export default function AgenciesPage() {
  const [agencies] = useState<Agency[]>(sampleAgencies);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Agences</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nouvelle Agence
        </Button>
      </div>

      <AgenciesTable agencies={agencies} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle Agence</DialogTitle>
          </DialogHeader>
          <AgencyForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
