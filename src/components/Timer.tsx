import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import TimerControls from "./TimerControls";
import { Button } from "@/components/ui/button";

interface TimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
}

const Timer: React.FC<TimerProps> = ({
  initialHours = 0,
  initialMinutes = 25,
  initialSeconds = 0,
}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempHours, setTempHours] = useState(initialHours.toString());
  const [tempMinutes, setTempMinutes] = useState(initialMinutes.toString());
  const [tempSeconds, setTempSeconds] = useState(initialSeconds.toString());
  
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          toast("Time's up!", {
            description: "Your timer has completed.",
            duration: 5000,
          });
        }
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hours, minutes, seconds, isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  
  const handleReset = () => {
    setIsRunning(false);
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  const toggleEdit = () => {
    if (isEditing) {
      const newHours = Math.min(Math.max(0, parseInt(tempHours) || 0), 23);
      const newMinutes = Math.min(Math.max(0, parseInt(tempMinutes) || 0), 59);
      const newSeconds = Math.min(Math.max(0, parseInt(tempSeconds) || 0), 59);
      
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
      
      initialHours = newHours;
      initialMinutes = newMinutes;
      initialSeconds = newSeconds;
    } else {
      setTempHours(hours.toString());
      setTempMinutes(minutes.toString());
      setTempSeconds(seconds.toString());
    }
    
    setIsEditing(!isEditing);
  };

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className="mb-8 glassmorphism p-10 rounded-3xl ghibli-shadow animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        {isEditing ? (
          <div className="flex items-center gap-2 timer-display">
            <input
              type="number"
              value={tempHours}
              onChange={(e) => setTempHours(e.target.value)}
              className="w-24 bg-transparent border-b border-foreground/20 focus:border-foreground outline-none text-center"
              min="0"
              max="23"
            />
            <span>:</span>
            <input
              type="number"
              value={tempMinutes}
              onChange={(e) => setTempMinutes(e.target.value)}
              className="w-24 bg-transparent border-b border-foreground/20 focus:border-foreground outline-none text-center"
              min="0"
              max="59"
            />
            <span>:</span>
            <input
              type="number"
              value={tempSeconds}
              onChange={(e) => setTempSeconds(e.target.value)}
              className="w-24 bg-transparent border-b border-foreground/20 focus:border-foreground outline-none text-center"
              min="0"
              max="59"
            />
          </div>
        ) : (
          <div className="timer-display animate-slide-up">
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
          </div>
        )}
      </div>
      
      {!isRunning && (
        <Button 
          onClick={toggleEdit}
          variant="ghost"
          className="mb-4 text-sm text-foreground/70 hover:text-foreground transition-colors"
        >
          {isEditing ? "Save" : "Edit Timer"}
        </Button>
      )}
      
      {!isEditing && (
        <TimerControls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default Timer;
