import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '@/utils/audioManager';
import sproutCharacter from '@/assets/sprout-character.png';
import bunnyCharacter from '@/assets/bunny-character.png';
import totoroCharacter from '@/assets/totoro-character.png';

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isBreak: boolean;
  cycles: number;
  soundEnabled: boolean;
}

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

const workMessages = [
  "You're doing great! Keep focusing! 🌱",
  "The forest believes in you! 🐰",
  "Stay strong, little sprout! 🌿",
  "Totoro is cheering you on! 🍃",
  "Focus like a wise forest spirit! ✨"
];

const breakMessages = [
  "Time to rest in the forest! 🌳",
  "Take a peaceful break, friend! 🐰",
  "Even sprouts need water breaks! 💧",
  "Relax with your forest friends! 🍃",
  "Breathe the fresh forest air! 🌿"
];

export const PomodoroTimer = () => {
  const [timer, setTimer] = useState<TimerState>({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    isBreak: false,
    cycles: 0,
    soundEnabled: true
  });

  const [currentMessage, setCurrentMessage] = useState(workMessages[0]);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Initialize audio on first user interaction
  const initializeAudio = async () => {
    if (!audioInitialized) {
      await audioManager.initialize();
      setAudioInitialized(true);
    }
  };

  const playSound = (soundType: 'startPause' | 'reset' | 'modeSwitch' | 'complete') => {
    if (!timer.soundEnabled) return;
    
    switch (soundType) {
      case 'startPause':
        audioManager.playStartPause();
        break;
      case 'reset':
        audioManager.playReset();
        break;
      case 'modeSwitch':
        audioManager.playModeSwitch();
        break;
      case 'complete':
        audioManager.playTimerComplete();
        break;
    }
  };

  const updateMessage = useCallback(() => {
    const messages = timer.isBreak ? breakMessages : workMessages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
  }, [timer.isBreak]);

  useEffect(() => {
    updateMessage();
  }, [timer.isBreak, updateMessage]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer(prev => {
          const totalSeconds = prev.minutes * 60 + prev.seconds;
          
          if (totalSeconds <= 1) {
            // Timer finished - play completion sound
            playSound('complete');
            
            const newIsBreak = !prev.isBreak;
            const newCycles = !prev.isBreak ? prev.cycles + 1 : prev.cycles;
            const newTime = newIsBreak ? BREAK_TIME : WORK_TIME;
            
            return {
              minutes: Math.floor(newTime / 60),
              seconds: newTime % 60,
              isRunning: false,
              isBreak: newIsBreak,
              cycles: newCycles,
              soundEnabled: prev.soundEnabled
            };
          }
          
          const newTotalSeconds = totalSeconds - 1;
          return {
            ...prev,
            minutes: Math.floor(newTotalSeconds / 60),
            seconds: newTotalSeconds % 60
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.isRunning]);

  const toggleTimer = async () => {
    await initializeAudio();
    playSound('startPause');
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = async () => {
    await initializeAudio();
    playSound('reset');
    const time = timer.isBreak ? BREAK_TIME : WORK_TIME;
    setTimer(prev => ({
      ...prev,
      minutes: Math.floor(time / 60),
      seconds: time % 60,
      isRunning: false
    }));
  };

  const switchMode = async () => {
    await initializeAudio();
    playSound('modeSwitch');
    const newIsBreak = !timer.isBreak;
    const time = newIsBreak ? BREAK_TIME : WORK_TIME;
    setTimer({
      minutes: Math.floor(time / 60),
      seconds: time % 60,
      isRunning: false,
      isBreak: newIsBreak,
      cycles: timer.cycles,
      soundEnabled: timer.soundEnabled
    });
  };

  const toggleSound = () => {
    setTimer(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="pixel-window w-full max-w-2xl p-8">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-border">
          <h1 className="pixel-text text-2xl text-accent">Forest Timer</h1>
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleSound}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              {timer.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-accent" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-destructive rounded-full border border-border"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full border border-border"></div>
              <div className="w-4 h-4 bg-green-400 rounded-full border border-border"></div>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className="pixel-text text-xl text-muted-foreground">
              {timer.isBreak ? "Break Time" : "Focus Time"}
            </span>
          </div>
          <div className="timer-display mb-4">
            {formatTime(timer.minutes, timer.seconds)}
          </div>
          <div className="pixel-text text-lg text-accent">
            Cycles completed: {timer.cycles}
          </div>
        </div>

        {/* Forest Creatures */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          <img 
            src={sproutCharacter} 
            alt="Sprout character" 
            className="w-16 h-16 creature-float"
            style={{ imageRendering: 'pixelated', animationDelay: '0s' }}
          />
          <img 
            src={bunnyCharacter} 
            alt="Bunny character" 
            className="w-20 h-20 creature-float"
            style={{ imageRendering: 'pixelated', animationDelay: '1s' }}
          />
          <img 
            src={totoroCharacter} 
            alt="Totoro character" 
            className="w-24 h-24 creature-float"
            style={{ imageRendering: 'pixelated', animationDelay: '2s' }}
          />
        </div>

        {/* Encouraging Message */}
        <div className="message-bubble mb-8">
          <p className="pixel-text text-center text-lg text-foreground">
            {currentMessage}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={toggleTimer}
            className="pixel-button"
            size="lg"
          >
            {timer.isRunning ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button
            onClick={resetTimer}
            className="pixel-button"
            variant="secondary"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Mode Switch */}
        <div className="text-center">
          <Button
            onClick={switchMode}
            className="pixel-button"
            variant="outline"
          >
            Switch to {timer.isBreak ? "Focus" : "Break"} Mode
          </Button>
        </div>
      </div>
    </div>
  );
};