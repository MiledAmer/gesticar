"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { DialogFooter } from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { UserRole } from "~/types/user";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  telephone: z.string().min(10, "Numéro de téléphone invalide"),
  email: z.string().email("Adresse email invalide"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  role: z.enum(["admin", "manager", "user"] as const, {
    required_error: "Veuillez sélectionner un rôle",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel: () => void;
}

const roles: { label: string; value: UserRole }[] = [
  { label: "Administrateur", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Utilisateur", value: "user" },
];

export default function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      telephone: "",
      email: "",
      address: "",
      role: "user",
    },
  });

  async function handleSubmit(data: FormValues) {
    await onSubmit(data);
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input {...form.register("name")} placeholder="Entrez le nom" />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            {...form.register("telephone")}
            type="tel"
            placeholder="Entrez le numéro de téléphone"
          />
          {form.formState.errors.telephone && (
            <p className="text-sm text-destructive">
              {form.formState.errors.telephone.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...form.register("email")}
            type="email"
            placeholder="Entrez l'adresse email"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input {...form.register("address")} placeholder="Entrez l'adresse" />
        {form.formState.errors.address && (
          <p className="text-sm text-destructive">
            {form.formState.errors.address.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Rôle</Label>
        <Select
          onValueChange={(value: UserRole) => form.setValue("role", value)}
          defaultValue={form.getValues("role")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un rôle" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.role && (
          <p className="text-sm text-destructive">
            {form.formState.errors.role.message}
          </p>
        )}
      </div>

      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "Enregistrement..."
            : "Enregistrer l'utilisateur"}
        </Button>
      </DialogFooter>
    </form>
  );
}
