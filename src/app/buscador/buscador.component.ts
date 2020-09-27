import { Component, OnInit } from '@angular/core';
import { RegionComunaService } from 'src/services/region-comuna.service';
import { InformacionPersonasService } from 'src/services/informacion-personas.service';
import { Comuna, RegionResponse } from 'src/model/region-comuna-response';
import { InformacionPersonaResponse } from 'src/model/informacion-personas-response';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  region: RegionResponse[] | boolean;
  comunas: Comuna[];
  personas: InformacionPersonaResponse[] | boolean;
  seleccionPer: InformacionPersonaResponse;
  listado: any = [];
  resultado: boolean;
  mostrar = false;
  formulario: FormGroup;
  view = 'data';
  mensaje = '';
  menBusqueda = '';

  constructor(
    private regionService: RegionComunaService,
    private personaService: InformacionPersonasService) {
    this.formulario = new FormGroup({
      nombreForm: new FormControl(''),
      apellidoForm: new FormControl(''),
      regionForm: new FormControl('0'),
      comunaForm: new FormControl('0')
    });
  }

  async ngOnInit() {
    await this.consultarServicios();
  }

  buscar() {
    this.listado = [];
    this.mostrar = false;
    const auxNombre = this.formulario.value.nombreForm === '' ? '-1' : this.formulario.value.nombreForm;
    const auxApellido = this.formulario.value.apellidoForm === '' ? '-1' : this.formulario.value.apellidoForm;
    const auxRegion = parseInt(this.formulario.value.regionForm, 10);
    const auxComuna = parseInt(this.formulario.value.comunaForm, 10);

    if (auxNombre === '-1' && auxApellido === '-1' && auxRegion !== 0) {
      this.filtroRegionComuna(this.personas as InformacionPersonaResponse[], auxRegion, auxComuna);
      this.mensaje = '';
    } else if (auxNombre !== '-1' || auxApellido !== '-1') {
      this.listado = (this.personas as InformacionPersonaResponse[]).filter(p => {
        return (this.compararCadenas(p.nombre, auxNombre) || this.compararCadenas(p.apellido, auxApellido)) && p.activo === 1;
      });
      if (auxRegion !== 0) {
        this.filtroRegionComuna(this.listado, auxRegion, auxComuna);
      }
      this.mensaje = '';
    } else {
      this.mensaje = 'Debe ingresar o seleccionar al menos un valor de busqueda. Inténtelo de nuevo';
    }
    if (this.listado.length === 0 && this.mensaje === '') {
      this.resultado = false;
      this.menBusqueda = 'No se encontró ningún resultado.';
    } else {
      this.resultado = true;
    }
  }

  filtroRegionComuna(listadoPersonas: InformacionPersonaResponse[], auxRegion, auxComuna) {
    this.listado = listadoPersonas.filter(lp => {
      for (let i = 0; i < (this.region as RegionResponse[]).length; i++) {
        if (auxRegion === this.region[i].id) {
          return this.region[i].comunas.find(d => {
            if (auxComuna !== 0) {
              return lp.direccion.comuna.id === d.id && auxComuna === lp.direccion.comuna.id && lp.activo === 1;
            } else {
              return lp.direccion.comuna.id === d.id && lp.activo === 1;
            }
          });
        }
      }
    });
  }

  compararCadenas(cad1: string, cad2: string) {
    return this.eliminarDiacriticos(cad1).toLowerCase().indexOf(this.eliminarDiacriticos(cad2).toLowerCase()) !== -1;
  }

  eliminarDiacriticos(texto: string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async consultarServicios() {
    this.region = await this.regionService.cosultarRegionComuna().toPromise();
    this.personas = await this.personaService.cosultarPersonas().toPromise();
    if (this.region && this.personas) {
      this.view = 'data';
    } else {
      this.view = 'error';
    }
  }

  obtenerComunas(event: any) {
    this.comunas = (this.region as RegionResponse[]).find(reg => reg.id === parseInt(event.detail.value, 10)).comunas;
  }

  detalle(detalle: InformacionPersonaResponse) {
    this.seleccionPer = detalle;
    this.mostrar = true;

    if (this.mostrar && detalle.direccion.comuna.nombre.indexOf('Ã‘uÃ±oa') !== -1) {
      this.seleccionPer.direccion.comuna.nombre = 'Ñuñoa';
    }
  }

  clear() {
    this.formulario.reset();
    this.listado = [];
    this.mostrar = false;
  }

  async reintentar() {
    await this.consultarServicios();
    this.view = 'data';
  }
}
