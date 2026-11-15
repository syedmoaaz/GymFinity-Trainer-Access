import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { dark, toggleDark } = useTheme();

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.94 }}
      onClick={toggleDark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-600 ${className}`}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </motion.button>
  );
}
