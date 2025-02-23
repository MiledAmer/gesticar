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
import type { Agency, Role } from "@prisma/client";
import { toast } from "sonner";
import { CreateUser } from "~/actions/user";

const formSchema = z.object({
  firstname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("Adresse email invalide"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"] as const, {
    required_error: "Veuillez sélectionner un rôle",
  }),
  agency: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const roles: { label: string; value: Role }[] = [
  { label: "Administrateur", value: "SUPER_ADMIN" },
  { label: "Manager", value: "ADMIN" },
  { label: "Utilisateur", value: "USER" },
];

export default function UserForm({ agencies }: { agencies: Agency[] }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      phone: "",
      email: "",
      address: "",
      role: "USER",
      agency: "",
    },
  });

  async function handleSubmit(data: FormValues) {
    const respense = await CreateUser({
      firstname: data.firstname,
      phone: parseInt(data.phone),
      email: data.email,
      adress: data.address,
      role: data.role,
      agency: { connect: { id: data.agency } },
      active: true,
      deleted: false,
    });
    if (respense) {
      toast.success("Agence enregistrée avec succès");
    } else {
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    }
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input {...form.register("firstname")} placeholder="Entrez le nom" />
        {form.formState.errors.firstname && (
          <p className="text-sm text-destructive">
            {form.formState.errors.firstname.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            {...form.register("phone")}
            type="tel"
            placeholder="Entrez le numéro de téléphone"
          />
          {form.formState.errors.phone && (
            <p className="text-sm text-destructive">
              {form.formState.errors.phone.message}
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
          onValueChange={(value: Role) => form.setValue("role", value)}
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

      <div className="space-y-2">
        <Label htmlFor="agency">Agence</Label>
        <Select
          onValueChange={(value: Role) => form.setValue("agency", value)}
          defaultValue={form.getValues("agency")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une agence" />
          </SelectTrigger>
          <SelectContent>
            {agencies.map((agency) => (
              <SelectItem key={agency.id} value={agency.id}>
                {agency.name}
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
        <Button variant="outline" type="button">
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
