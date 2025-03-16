
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full glassmorphism button-hover absolute top-6 right-6 z-10"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-ghibli-dark transition-all" />
      ) : (
        <Sun className="h-5 w-5 text-ghibli-beige transition-all" />
      )}
    </Button>
  );
};

export default ThemeToggle;
