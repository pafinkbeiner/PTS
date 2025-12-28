import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Training {
  name: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PTS - Personal Training System');
  protected readonly menuOpen = signal(false);
  protected readonly trainings: Training[] = [
    { 
      name: 'EMOM', 
      route: '/training/emom',
      description: 'Every Minute On the Minute Training'
    },
    // Weitere Trainings können hier hinzugefügt werden
  ];

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen.update(value => !value);
  }

  selectTraining(training: Training): void {
    this.router.navigate([training.route]);
    this.menuOpen.set(false);
  }

  get isTrainingActive(): boolean {
    return this.router.url !== '/' && this.router.url !== '';
  }
}
