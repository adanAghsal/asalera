/**
 * Web Audio procedural music box player for sweet Birthday Melody
 * Plays a calm lofi chime / music box version of "Happy Birthday to You"
 */

class BirthdayMelodyPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private onBeatCallback: ((note: string, progress: number) => void) | null = null;
  private currentNoteIndex: number = 0;

  // Notes and durations for "Happy Birthday to You"
  // Notes in Hz (C4 to C5 range)
  private readonly melody: Array<{ note: string; freq: number; duration: number }> = [
    { note: 'G4', freq: 392.00, duration: 0.4 },
    { note: 'G4', freq: 392.00, duration: 0.4 },
    { note: 'A4', freq: 440.00, duration: 0.8 },
    { note: 'G4', freq: 392.00, duration: 0.8 },
    { note: 'C5', freq: 523.25, duration: 0.8 },
    { note: 'B4', freq: 493.88, duration: 1.4 },

    { note: 'G4', freq: 392.00, duration: 0.4 },
    { note: 'G4', freq: 392.00, duration: 0.4 },
    { note: 'A4', freq: 440.00, duration: 0.8 },
    { note: 'G4', freq: 392.00, duration: 0.8 },
    { note: 'D5', freq: 587.33, duration: 0.8 },
    { note: 'C5', freq: 523.25, duration: 1.4 },

    { note: 'G4', freq: 392.00, duration: 0.4 },
    { note: 'G4', freq: 392.00, duration: 0.4 },
    { note: 'G5', freq: 783.99, duration: 0.8 },
    { note: 'E5', freq: 659.25, duration: 0.8 },
    { note: 'C5', freq: 523.25, duration: 0.8 },
    { note: 'B4', freq: 493.88, duration: 0.8 },
    { note: 'A4', freq: 440.00, duration: 1.2 },

    { note: 'F5', freq: 698.46, duration: 0.4 },
    { note: 'F5', freq: 698.46, duration: 0.4 },
    { note: 'E5', freq: 659.25, duration: 0.8 },
    { note: 'C5', freq: 523.25, duration: 0.8 },
    { note: 'D5', freq: 587.33, duration: 0.8 },
    { note: 'C5', freq: 523.25, duration: 1.6 }
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm music box / marimba chime timbre (sine + subtle harmonic)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.3);

    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration * 1.4);
  }

  public setBeatCallback(cb: (note: string, progress: number) => void) {
    this.onBeatCallback = cb;
  }

  public play() {
    this.initContext();
    this.isPlaying = true;
    this.scheduleNextNote();
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    const item = this.melody[this.currentNoteIndex];
    this.playTone(item.freq, item.duration);

    const progress = (this.currentNoteIndex + 1) / this.melody.length;
    if (this.onBeatCallback) {
      this.onBeatCallback(item.note, progress);
    }

    const noteTimeMs = item.duration * 680;

    this.timerId = window.setTimeout(() => {
      if (!this.isPlaying) return;
      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
      this.scheduleNextNote();
    }, noteTimeMs);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(onPlayChange?: (playing: boolean) => void) {
    if (this.isPlaying) {
      this.pause();
      if (onPlayChange) onPlayChange(false);
    } else {
      this.play();
      if (onPlayChange) onPlayChange(true);
    }
  }

  public reset() {
    this.pause();
    this.currentNoteIndex = 0;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const birthdayAudioPlayer = new BirthdayMelodyPlayer();
