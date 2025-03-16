
import React from "react";
import { Play, Pause, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-10 animate-fade-in">
      <Button
        onClick={isRunning ? onPause : onStart}
        className="w-16 h-16 rounded-full glassmorphism button-hover flex items-center justify-center shadow-lg"
        variant="ghost"
        aria-label={isRunning ? "Pause timer" : "Start timer"}
      >
        {isRunning ? (
          <Pause className="h-8 w-8 text-foreground" />
        ) : (
          <Play className="h-8 w-8 text-foreground" />
        )}
      </Button>
      
      <Button
        onClick={onReset}
        className="w-12 h-12 rounded-full glassmorphism button-hover flex items-center justify-center shadow-lg"
        variant="ghost"
        aria-label="Reset timer"
      >
        <RefreshCw className="h-6 w-6 text-foreground" />
      </Button>
    </div>
  );
};

export default TimerControls;
