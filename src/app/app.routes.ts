import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import{Eth} from '../../src/app/pages/eth/eth'







export const routes: Routes = [
  { path: '', component: Home },
  { path: 'eth', component: Eth },
  
  
  
  { path: '**', redirectTo: '' },
];

