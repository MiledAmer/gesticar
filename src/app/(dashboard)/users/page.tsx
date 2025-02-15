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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { db } from "~/server/db";

export default async function UsersPage() {
  const users = await db.user.findMany();
  const agencies = await db.agency.findMany();
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouvel Utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nouvel Utilisateur</DialogTitle>
            </DialogHeader>
            <UserForm agencies={agencies} />
          </DialogContent>
        </Dialog>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
