import * as Tone from 'tone';

class AudioManager {
  private isInitialized = false;
  private synths: { [key: string]: Tone.Synth } = {};

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await Tone.start();
      
      // Create different synths for different button types
      this.synths.gentle = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.5 }
      }).toDestination();

      this.synths.cheerful = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.3 }
      }).toDestination();

      this.synths.soft = new Tone.Synth({
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.05, decay: 0.3, sustain: 0.1, release: 0.8 }
      }).toDestination();

      this.isInitialized = true;
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  // Gentle forest chime for start/pause
  playStartPause() {
    if (!this.isInitialized) return;
    
    // Play a gentle ascending chime
    const notes = ['C5', 'E5', 'G5'];
    notes.forEach((note, index) => {
      this.synths.gentle?.triggerAttackRelease(note, '8n', `+${index * 0.1}`);
    });
  }

  // Soft reset sound
  playReset() {
    if (!this.isInitialized) return;
    
    // Play a soft descending melody
    const notes = ['G5', 'E5', 'C5'];
    notes.forEach((note, index) => {
      this.synths.soft?.triggerAttackRelease(note, '8n', `+${index * 0.1}`);
    });
  }

  // Cheerful mode switch
  playModeSwitch() {
    if (!this.isInitialized) return;
    
    // Play a cheerful bounce
    this.synths.cheerful?.triggerAttackRelease('C5', '16n');
    this.synths.cheerful?.triggerAttackRelease('E5', '16n', '+0.1');
  }

  // Timer completion celebration
  playTimerComplete() {
    if (!this.isInitialized) return;
    
    // Play a celebration melody
    const melody = ['C5', 'E5', 'G5', 'C6'];
    melody.forEach((note, index) => {
      this.synths.cheerful?.triggerAttackRelease(note, '8n', `+${index * 0.15}`);
    });
  }

  // Gentle tick for timer countdown (optional)
  playTick() {
    if (!this.isInitialized) return;
    
    this.synths.gentle?.triggerAttackRelease('C4', '32n');
  }

  dispose() {
    Object.values(this.synths).forEach(synth => synth.dispose());
    this.synths = {};
    this.isInitialized = false;
  }
}

export const audioManager = new AudioManager();