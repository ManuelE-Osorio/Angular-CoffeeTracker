import { Routes } from '@angular/router';
import { CoffeeCupsListComponent } from './coffee-cups-list/coffee-cups-list.component';
import { CoffeeCupsDetailsComponent } from './coffee-cups-details/coffee-cups-details.component';

export const routes: Routes = [
    { path: 'coffeecups', component: CoffeeCupsListComponent},
    { path: 'details/:id', component: CoffeeCupsDetailsComponent },
    { path: '', redirectTo: '/coffeecups', pathMatch: 'full' }
];
