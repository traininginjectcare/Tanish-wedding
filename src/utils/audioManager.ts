/**
 * Background Music Controller using the user-provided audio file
 * Configured with extra-soft whisper volume so crescendo passages remain gentle.
 */

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private audioSrc = '/assets/aistudio/india_happy-indian-classical-indian-music-494847__1__0ce51b2d.mp3';

  private initAudio() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio(this.audioSrc);
      this.audio.loop = true;
      // Whisper-soft volume (0.06) so it never becomes loud even during climactic crescendos
      this.audio.volume = 0.06;
    }
  }

  public play() {
    this.initAudio();
    if (!this.audio) return;
    this.audio.volume = 0.06;
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch((err) => {
        console.warn('Autoplay prevented or audio play failed:', err);
      });
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioManager();
