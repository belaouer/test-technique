"use client";

import { useAuth } from "@/stores/useAuth";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {

    // Supprimer le cookie token côté client car j'ai pas mis un cookie httponly
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Mets à jour Zustand
    logout();

    // Redirige vers la page login
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
    >
      Se déconnecter
    </button>
  );
}
