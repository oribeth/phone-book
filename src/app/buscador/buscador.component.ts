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

  region: RegionComunaResponse[] | boolean;
  personas: InformacionPersonaResponse[] | boolean;
  listado: any;
  view: string;

  constructor(
    private regionService: RegionComunaService,
    private personaService: InformacionPersonasService) { }

  async ngOnInit() {
    this.region = await this.regionService.cosultarRegionComuna().toPromise();
    if (this.region) {
      console.log(this.region);
    } else {
      this.view = 'error';
    }
    this.personas = await this.personaService.cosultarPersonas().toPromise();
    if (this.personas) {
      console.log(this.personas);
    } else {
      this.view = 'error';
    }


    this.buscar();
  }

  buscar() {
    // string vacios debe buscar con -1
    let nombre = 'omar';
    let apellido = 'Arevalo';
    let aux_region = 1;
    let aux_comuna = 0;

    if (nombre !== '' || apellido !== '' || (aux_region !== 0 && aux_comuna === 0)) {
      this.listado = (this.personas as InformacionPersonaResponse[]).filter(p => {
        if (aux_region !== 0) {
          for (let i = 0; i < (this.region as RegionComunaResponse[]).length; i++) {
            if (aux_region === this.region[i].id) {
              // tslint:disable-next-line: max-line-length
              return this.compararCadenas(p.nombre, nombre) || this.compararCadenas(p.apellido, apellido) || this.region[i].comunas.find(d => p.direccion.comuna.id === d.id);
            }
          }
        } else {
          return this.compararCadenas(p.nombre, nombre) || this.compararCadenas(p.apellido, apellido);
        }
      });
      console.log(this.listado);
    } else if (nombre !== '' || apellido !== '' || (aux_region !== 0 && aux_comuna !== 0)) {

    } else { }
  }

  compararCadenas(cad1, cad2) {
    return this.eliminarDiacriticos(cad1).toLowerCase().indexOf(this.eliminarDiacriticos(cad2).toLowerCase()) !== -1;
  }

  eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
