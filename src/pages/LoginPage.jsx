import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast.error("Please enter both fields!");
      return;
    }
    try {
      setBusy(true);
      await login(username.trim(), password);
      toast.success("Login successful!");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Invalid trainer id or password"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-dvh justify-center items-center gap-8 md:gap-10 bg-[#f5f7f8] relative px-4 py-8 sm:p-6 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full md:w-[45%] flex flex-col justify-center items-center gap-2 text-center"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="GymFinity Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 translate-y-1 md:translate-y-2.5"
          />
          <h1 className="text-5xl sm:text-6xl md:text-[90px] font-bold text-[#3aafa9] leading-none">
            GymFinity
          </h1>
        </div>
        <p className="text-base sm:text-lg md:text-[30px] font-medium text-[#1c323a]">
          Track. Manage. Grow.
        </p>
        <p className="text-xs sm:text-sm text-[#3aafa9] font-semibold tracking-wide uppercase mt-1">
          Trainer Access
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
        className="w-full md:w-[45%] flex justify-center items-center"
      >
        <form
          onSubmit={handleLogin}
          className="bg-white p-7 sm:p-8 md:p-10 rounded-xl border-2 border-[#1c323a] w-full max-w-[320px] text-center shadow-lg"
        >
          <h2 className="mb-6 text-2xl font-bold text-[#1c323a]">Log In</h2>

          <div className="mb-4 relative flex items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Trainer id"
              inputMode="tel"
              autoComplete="username"
              className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg outline-none text-sm focus:border-[#3cb6a5] transition-colors"
            />
            <FaUser className="text-[#110c0c] text-lg ml-2 shrink-0" />
          </div>

          <div className="mb-4 relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              autoComplete="current-password"
              className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg outline-none text-sm focus:border-[#3cb6a5] transition-colors"
            />
            <AnimatePresence mode="wait" initial={false}>
              {showPassword ? (
                <motion.button
                  key="hide"
                  type="button"
                  initial={{ opacity: 0.4, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.4, scale: 0.9 }}
                  className="ml-2 shrink-0 p-0.5"
                  onClick={() => setShowPassword(false)}
                  aria-label="Hide password"
                >
                  <FaEye className="text-[#110c0c] text-lg cursor-pointer" />
                </motion.button>
              ) : (
                <motion.button
                  key="show"
                  type="button"
                  initial={{ opacity: 0.4, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.4, scale: 0.9 }}
                  className="ml-2 shrink-0 p-0.5"
                  onClick={() => setShowPassword(true)}
                  aria-label="Show password"
                >
                  <FaEyeSlash className="text-[#110c0c] text-lg cursor-pointer" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            disabled={busy}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#3cb6a5] text-white rounded-lg font-semibold text-[15px] hover:bg-[#2d8a7d] disabled:opacity-60 transition-colors"
          >
            {busy ? "Logging in..." : "Log In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
