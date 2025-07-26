import LoginForm from "@/components/forms/LoginForm";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboard"); 
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-white text-center">
          Connexion
        </h1>
        <LoginForm />
        <p className="mt-6 text-center text-gray-400">
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="text-indigo-500 hover:text-indigo-400 font-semibold"
          >
            S’inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
