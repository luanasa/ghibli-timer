
import React from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Timer from "../components/Timer";
import ThemeToggle from "../components/ThemeToggle";
import GhibliBackground from "../components/GhibliBackground";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
        <GhibliBackground />
        <ThemeToggle />
        
        <div className="text-center z-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
            Ghibli Timer
          </h1>
          <p className="text-lg text-foreground/80 mb-12 max-w-md mx-auto">
            A gentle timer inspired by Studio Ghibli's magical worlds
          </p>
          
          <Timer />
          
          <div className="mt-16 text-sm text-foreground/60">
            <p>🌸✨ Let your heart soar like Chihiro on Haku's back, and remember—even the smallest moments can spark wonder. 🌿🐉</p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
