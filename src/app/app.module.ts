import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { DetallePersonaComponent } from './detalle-persona/detalle-persona.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegionComunaService } from 'src/services/region-comuna.service';
import { InformacionPersonasService } from 'src/services/informacion-personas.service';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent,
    DetallePersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    InformacionPersonasService,
    RegionComunaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
