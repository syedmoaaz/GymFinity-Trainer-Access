import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
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
  `relative flex flex-col items-center gap-1 px-1 py-2.5 text-[11px] transition-colors ${
    isActive ? "text-[#3aafa9] font-semibold" : "text-gray-500"
  }`;

export default function AppShell() {
  const { trainer, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-dvh pb-[calc(4.75rem+env(safe-area-inset-bottom))] bg-[#f5f7f8]">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-3 safe-pt">
          <div className="flex items-center gap-2.5 min-w-0">
            {trainer?.imageUrl ? (
              <img
                src={trainer.imageUrl}
                alt={trainer.name}
                className="w-9 h-9 rounded-full object-cover border border-[#3aafa9]/40 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#3aafa9] text-white flex items-center justify-center shrink-0 text-lg">
                <FaUserCircle />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs text-gray-500 truncate">
                {trainer?.gym?.name || "GymFinity"}
              </p>
              <h1 className="text-base font-semibold text-[#1c323a] truncate">
                {trainer?.name || "Trainer"}
              </h1>
            </div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={logout}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-600 active:bg-gray-50"
          >
            <LogOut size={14} />
            Logout
          </motion.button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-black/5 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto grid max-w-lg grid-cols-6">
          <NavLink to="/" end className={linkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1.5 top-0 h-0.5 rounded-full bg-[#3aafa9]"
                  />
                )}
                <Home size={17} />
                Home
              </>
            )}
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1.5 top-0 h-0.5 rounded-full bg-[#3aafa9]"
                  />
                )}
                <UserRound size={17} />
                Profile
              </>
            )}
          </NavLink>
          <NavLink to="/clients" className={linkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1.5 top-0 h-0.5 rounded-full bg-[#3aafa9]"
                  />
                )}
                <Users size={17} />
                Clients
              </>
            )}
          </NavLink>
          <NavLink to="/earnings" className={linkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1.5 top-0 h-0.5 rounded-full bg-[#3aafa9]"
                  />
                )}
                <Wallet size={17} />
                Pay
              </>
            )}
          </NavLink>
          <NavLink to="/attendance" className={linkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1.5 top-0 h-0.5 rounded-full bg-[#3aafa9]"
                  />
                )}
                <Clock3 size={17} />
                Clock
              </>
            )}
          </NavLink>
          <NavLink to="/schedule" className={linkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1.5 top-0 h-0.5 rounded-full bg-[#3aafa9]"
                  />
                )}
                <CalendarDays size={17} />
                Plan
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
