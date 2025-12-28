import { Routes } from '@angular/router';
import { Emom } from './training/emom/emom';

export const routes: Routes = [
  { path: 'training/emom', component: Emom },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
