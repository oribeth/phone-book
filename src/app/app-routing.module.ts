import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscadorComponent } from './buscador/buscador.component';
import { DetallePersonaComponent } from './detalle-persona/detalle-persona.component';


const routes: Routes = [
  {
    path: 'buscar-persona',
    component: BuscadorComponent
  },
  {
    path: 'detalle-persona',
    component: DetallePersonaComponent
  },
  { path: '**', redirectTo: 'buscar-persona', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
