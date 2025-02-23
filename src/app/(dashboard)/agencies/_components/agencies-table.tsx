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
import type { Agency } from "@prisma/client";
import React from "react";
import { AlertModal } from "~/components/shared/alert-modal";
import { Badge } from "~/components/ui/badge";
import { DeleteAgency } from "~/actions/agency";

interface AgenciesTableProps {
  agencies: Agency[];
}

export function AgenciesTable({ agencies }: AgenciesTableProps) {
  const [selectedAgencyDelete, setSelectedAgencyDelete] =
    React.useState<Agency | null>(null);
  // const [selectedAgencyUpdate, setSelectedAgencyUpdate] =
  //   React.useState<Agency | null>(null);
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ville</TableHead>
            <TableHead>RNE</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agencies.map((agency) => (
            <TableRow key={agency.id}>
              <TableCell className="font-medium">{agency.name}</TableCell>
              <TableCell>{agency.phone}</TableCell>
              <TableCell>{agency.email}</TableCell>
              <TableCell>{agency.city}</TableCell>
              <TableCell>{agency.rne}</TableCell>
              <TableCell>
                <Badge variant={agency.deleted ? "destructive" : "default"}>
                  {agency.deleted ? "Supprimé" : "Actif"}
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
                    <DropdownMenuItem
                    // onClick={() => setSelectedAgencyUpdate(agency)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setSelectedAgencyDelete(agency)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedAgencyDelete && (
        <AlertModal
          open={!!selectedAgencyDelete}
          message="agence supprimer avec success"
          onCancel={() => setSelectedAgencyDelete(null)}
          onSubmit={() => DeleteAgency(selectedAgencyDelete.id)}
        />
      )}
    </div>
  );
}
