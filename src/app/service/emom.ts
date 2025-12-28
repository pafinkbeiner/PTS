import { Injectable, signal } from '@angular/core';

export interface EmomRound {
  roundNumber: number;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Emom {
  private intervalId: any = null;
  
  readonly totalRounds = signal(10);
  readonly currentRound = signal(0);
  readonly timeRemaining = signal(60);
  readonly isRunning = signal(false);
  readonly isPaused = signal(false);
  readonly rounds = signal<EmomRound[]>([]);

  constructor() {
    this.initializeRounds();
  }

  private initializeRounds(): void {
    const rounds: EmomRound[] = [];
    for (let i = 1; i <= this.totalRounds(); i++) {
      rounds.push({ roundNumber: i, completed: false });
    }
    this.rounds.set(rounds);
  }

  start(): void {
    if (this.isRunning()) return;
    
    this.isRunning.set(true);
    this.isPaused.set(false);
    
    if (this.currentRound() === 0) {
      this.currentRound.set(1);
    }
    
    this.intervalId = setInterval(() => {
      const remaining = this.timeRemaining();
      
      if (remaining > 0) {
        this.timeRemaining.update(t => t - 1);
      } else {
        this.completeRound();
      }
    }, 1000);
  }

  pause(): void {
    if (!this.isRunning()) return;
    
    this.isPaused.set(true);
    this.isRunning.set(false);
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.currentRound.set(0);
    this.timeRemaining.set(60);
    this.isRunning.set(false);
    this.isPaused.set(false);
    this.initializeRounds();
  }

  private completeRound(): void {
    const current = this.currentRound();
    
    // Aktuelle Runde als abgeschlossen markieren
    this.rounds.update(rounds => {
      const updated = [...rounds];
      if (updated[current - 1]) {
        updated[current - 1].completed = true;
      }
      return updated;
    });
    
    if (current >= this.totalRounds()) {
      // Training beendet
      this.pause();
      return;
    }
    
    // Nächste Runde starten
    this.currentRound.update(r => r + 1);
    this.timeRemaining.set(60);
  }

  setTotalRounds(rounds: number): void {
    if (rounds < 1) return;
    this.totalRounds.set(rounds);
    this.reset();
  }
}
