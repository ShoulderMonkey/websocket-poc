import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'game', loadChildren: () => import('./game/game.module').then(m => m.GameModule)}
];
