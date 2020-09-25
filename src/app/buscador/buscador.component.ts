import { Component, OnInit } from '@angular/core';
import { RegionComunaService } from 'src/services/region-comuna.service';
import { InformacionPersonasService } from 'src/services/informacion-personas.service';
import { RegionComunaResponse } from 'src/model/region-comuna-response';
import { InformacionPersonaResponse } from 'src/model/informacion-personas-response';
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  region: RegionComunaResponse | boolean;
  personas: InformacionPersonaResponse | boolean;

  constructor(
    private regionService: RegionComunaService,
    private personaService: InformacionPersonasService) { }

  async ngOnInit() {
    this.region = await this.regionService.cosultarRegionComuna().toPromise();
    this.personas = await this.personaService.cosultarPersonas().toPromise();
    console.log(this.region);
    console.log(this.personas);
  }

}
