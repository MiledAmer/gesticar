"use server";
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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { db } from "~/server/db";

export default async function AgenciesPage() {
  const agencies = await db.agency.findMany();
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Agences</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouvelle Agence
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nouvelle Agence</DialogTitle>
            </DialogHeader>
            <AgencyForm />
          </DialogContent>
        </Dialog>
      </div>

      <AgenciesTable agencies={agencies} />
    </div>
  );
}
