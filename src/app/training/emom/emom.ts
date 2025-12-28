import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Emom as EmomService } from '../../service/emom';

@Component({
  selector: 'app-emom',
  imports: [CommonModule],
  templateUrl: './emom.html',
  styleUrl: './emom.css',
})
export class Emom {
  constructor(public emomService: EmomService) {}

  onStart(): void {
    this.emomService.start();
  }

  onPause(): void {
    this.emomService.pause();
  }

  onReset(): void {
    this.emomService.reset();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
