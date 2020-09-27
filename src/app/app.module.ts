import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { DetallePersonaComponent } from './detalle-persona/detalle-persona.component';
import { HttpClientModule } from '@angular/common/http';
import { RegionComunaService } from 'src/services/region-comuna.service';
import { InformacionPersonasService } from 'src/services/informacion-personas.service';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { Ng9RutModule, RutPipe, RutValidator } from 'ng9-rut';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent,
    DetallePersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng9RutModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  providers: [
    InformacionPersonasService,
    RegionComunaService,
    RutValidator,
    RutPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
