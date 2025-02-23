"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import type { Role, User } from "@prisma/client";
import React from "react";
import { AlertModal } from "~/components/shared/alert-modal";
import { DeleteUser } from "~/actions/user";

interface UsersTableProps {
  users: User[];
}

const roleBadgeVariants: Record<Role, "default" | "secondary" | "destructive"> =
  {
    SUPER_ADMIN: "destructive",
    ADMIN: "secondary",
    USER: "default",
  };

const roleLabels: Record<Role, string> = {
  SUPER_ADMIN: "Administrateur",
  ADMIN: "Manager",
  USER: "Utilisateur",
};

export function UsersTable({ users }: UsersTableProps) {
  // const [selectedUserUpdate, setSelectedUserUpdate] =
  //   React.useState<User | null>(null);
  const [selectedUserDelete, setSelectedUserDelete] =
    React.useState<User | null>(null);
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead className="w-[100px]">Etat</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.firstname}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge variant={roleBadgeVariants[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant={user.deleted ? "destructive" : "default"}>
                      {user.deleted ? "Supprimé" : "Actif"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir le menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setSelectedUserDelete(user)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-4 text-center">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedUserDelete && (
        <AlertModal
          open={!!selectedUserDelete}
          message="Utiliseteur supprimer avec success"
          onCancel={() => setSelectedUserDelete(null)}
          onSubmit={async () => DeleteUser(selectedUserDelete?.id)}
        />
      )}
    </>
  );
}
