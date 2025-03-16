
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const GhibliBackground: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          theme === "light"
            ? "bg-gradient-to-b from-ghibli-blueLight via-ghibli-blue to-ghibli-blue"
            : "bg-gradient-to-b from-ghibli-dark via-ghibli-darkLight to-ghibli-dark"
        }`}
      />

      {/* Animated clouds/elements */}
      <div className="absolute inset-0">
        {/* Clouds - visible in light mode */}
        <div className={`transition-opacity duration-700 ${theme === "light" ? "opacity-60" : "opacity-0"}`}>
          <div className="absolute top-[15%] left-[10%] w-32 h-16 bg-white rounded-full filter blur-md animate-float"></div>
          <div className="absolute top-[20%] left-[25%] w-48 h-20 bg-white rounded-full filter blur-md animate-float" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-[10%] right-[20%] w-40 h-16 bg-white rounded-full filter blur-md animate-float" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-[30%] right-[10%] w-32 h-12 bg-white rounded-full filter blur-md animate-float" style={{ animationDelay: "1.5s" }}></div>
        </div>

        {/* Stars - visible in dark mode */}
        <div className={`transition-opacity duration-700 ${theme === "dark" ? "opacity-70" : "opacity-0"}`}>
          {Array.from({ length: 50 }).map((_, index) => {
            const size = Math.random() * 3 + 1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 4 + 2;
            
            return (
              <div
                key={index}
                className="absolute rounded-full bg-white animate-pulse-gentle"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDuration: `${animationDuration}s`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD4KPC9zdmc+')] opacity-50"></div>
    </div>
  );
};

export default GhibliBackground;
