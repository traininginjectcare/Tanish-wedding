/**
 * Indian Wedding Music Synthesizer using Web Audio API
 * Generates an auspicious Tanpura drone with Shehnai & Sitar melodies (Raag Yaman)
 * plus instant ceremonial chime on envelope opening.
 */

class IndianWeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];

  // Raag Yaman notes (Sa, Re, Ga, Ma-tivra, Pa, Dha, Ni, Sa')
  private notes = [
    220.0,   // A3 (Sa)
    247.5,   // B3 (Re)
    277.18,  // C#4 (Ga)
    311.13,  // D#4 (Teevra Ma)
    329.63,  // E4 (Pa)
    370.0,   // F#4 (Dha)
    415.3,   // G#4 (Ni)
    440.0,   // A4 (Sa')
    495.0,   // B4 (Re')
    554.37,  // C#5 (Ga')
    659.25,  // E5 (Pa')
  ];

  private melodySequence = [
    0, 2, 3, 4, 3, 2, 0, 4, 5, 6, 7, 6, 5, 4, 2, 4, 3, 2, 0,
    7, 6, 5, 4, 5, 6, 7, 9, 7, 6, 5, 4, 2, 0,
  ];
  private seqIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (!this.masterGain) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
    }
    // Always restore gain
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play auspicious ceremonial chime / temple bell
  public playCeremonialChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const chimeFrequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chimeFrequencies.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.9);
    });
  }

  // Warm Tanpura Drone (Sa - Pa - Sa)
  private startDrone() {
    if (!this.ctx || !this.masterGain) return;
    this.stopDrone();

    const droneFreqs = [110, 164.81, 220, 329.63]; // A2, E3, A3, E4
    droneFreqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // Low pass filter for warm organic resonance
      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx!.currentTime);

      gain.gain.setValueAtTime(0.025 / (idx + 1), this.ctx!.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.droneOscs.push(osc);
    });
  }

  private stopDrone() {
    this.droneOscs.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.droneOscs = [];
  }

  // Shehnai / Bansuri melody note
  private playNote(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Harmonics for Indian reed instrument
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.003, now + duration * 0.5);

    // Warm formant filter for Shehnai sound
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.8, now);
    filter.Q.setValueAtTime(2.5, now);

    // Envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Gentle vibrato
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5.4, now);
    vibratoGain.gain.setValueAtTime(3.2, now);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  public start() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    }
    if (this.isPlaying) return;
    this.isPlaying = true;

    this.playCeremonialChime();
    this.startDrone();

    const loopMelody = () => {
      if (!this.isPlaying) return;
      const noteIdx = this.melodySequence[this.seqIndex % this.melodySequence.length];
      const freq = this.notes[noteIdx] || 220;
      const duration = 0.9 + Math.random() * 0.35;

      this.playNote(freq, duration);
      this.seqIndex++;

      this.timer = window.setTimeout(loopMelody, duration * 700);
    };

    // Begin melody after brief chime delay
    setTimeout(loopMelody, 300);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.stopDrone();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new IndianWeddingAudioPlayer();
