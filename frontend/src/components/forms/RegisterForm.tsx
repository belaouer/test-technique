"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirm"],
  });

type RegisterFormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post("/auth/register", data);
      router.push("/login");
    } catch (err) {
      console.error("Erreur d’inscription", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input
        {...register("firstName")}
        placeholder="Prénom"
        className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          errors.firstName ? "ring-2 ring-red-500" : ""
        }`}
      />
      <input
        {...register("lastName")}
        placeholder="Nom"
        className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          errors.lastName ? "ring-2 ring-red-500" : ""
        }`}
      />
      <input
        {...register("email")}
        placeholder="Email"
        className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          errors.email ? "ring-2 ring-red-500" : ""
        }`}
      />
      <input
        type="password"
        {...register("password")}
        placeholder="Mot de passe"
        className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          errors.password ? "ring-2 ring-red-500" : ""
        }`}
      />
      <input
        type="password"
        {...register("passwordConfirm")}
        placeholder="Confirme mot de passe"
        className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          errors.passwordConfirm ? "ring-2 ring-red-500" : ""
        }`}
      />
      {errors.passwordConfirm && (
        <p className="text-red-500 text-sm">{errors.passwordConfirm.message}</p>
      )}
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 rounded-lg text-white font-semibold hover:bg-indigo-700 transition"
      >
        Créer un compte
      </button>
    </form>
  );
}
