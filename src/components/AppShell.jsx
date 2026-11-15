import { NavLink, Outlet } from "react-router-dom";
import {
  CalendarDays,
  Home,
  LogOut,
  Users,
  Wallet,
  Clock3,
  UserRound,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const linkClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 px-2 py-2 text-[11px] ${
    isActive ? "text-[#3aafa9] font-semibold" : "text-gray-500"
  }`;

export default function AppShell() {
  const { trainer, logout } = useAuth();

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs text-gray-500">
              {trainer?.gym?.name || "GymFinity"}
            </p>
            <h1 className="text-base font-semibold text-[#17252a]">
              {trainer?.name || "Trainer"}
            </h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-600"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-black/5 bg-white">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          <NavLink to="/" end className={linkClass}>
            <Home size={18} />
            Home
          </NavLink>
          <NavLink to="/clients" className={linkClass}>
            <Users size={18} />
            Clients
          </NavLink>
          <NavLink to="/earnings" className={linkClass}>
            <Wallet size={18} />
            Pay
          </NavLink>
          <NavLink to="/attendance" className={linkClass}>
            <Clock3 size={18} />
            Clock
          </NavLink>
          <NavLink to="/schedule" className={linkClass}>
            <CalendarDays size={18} />
            Schedule
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export function ProfileHint() {
  return (
    <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
      <UserRound size={16} />
      Read-only trainer portal
    </div>
  );
}
