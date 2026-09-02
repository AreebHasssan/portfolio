"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/lib/api";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const apiUrl = getApiUrl();
      const res = await fetch(
        `${apiUrl}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        },
      );

      const contentType = res.headers.get("content-type");
      let data: any = {};

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else if (!res.ok) {
        throw new Error(`Backend service unreachable (${res.status} Bad Gateway). Please check if backend server is running.`);
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          value={form.password}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
