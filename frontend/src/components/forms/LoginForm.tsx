"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useAuth } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const schema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

type LoginData = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });
  const login = useAuth((s) => s.login);
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await api.post("/auth/login", data);
      const { access_token, user } = res.data;
      Cookies.set("token", access_token, { expires: 7, sameSite: "lax" });
      login(access_token, user);

      toast.success("Connexion réussie !");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Erreur de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 rounded-lg text-white font-semibold hover:bg-indigo-700 transition"
        >
          Se connecter
        </button>
      </form>
    </>
  );
}
