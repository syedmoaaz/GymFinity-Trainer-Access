import { useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[radial-gradient(circle_at_top,_#d7f3f1,_#f3f7f7_55%)]">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-lg border border-black/5 p-6">
        <p className="text-xs font-semibold tracking-wide text-[#3aafa9] uppercase">
          GymFinity
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#17252a]">Trainer login</h1>
        <p className="mt-1 text-sm text-gray-500">
          Use the phone number and password your gym owner gave you.
        </p>

        <form
          className="mt-6 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setBusy(true);
              await login(phone.trim(), password);
              toast.success("Welcome");
            } catch (err) {
              toast.error(
                err?.response?.data?.message ||
                  err.message ||
                  "Login failed"
              );
            } finally {
              setBusy(false);
            }
          }}
        >
          <label className="block text-sm">
            <span className="text-gray-600">Phone</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              autoComplete="username"
              placeholder="03XXXXXXXXX"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3aafa9]/40"
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-gray-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3aafa9]/40"
              required
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-[#3aafa9] text-white py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
