import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as appRoutes } from './routes/routes';


const routes: Routes = appRoutes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
