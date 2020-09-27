import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RutValidator } from 'ng9-rut';
import { InformacionPersonaResponse } from 'src/model/informacion-personas-response';

@Component({
  selector: 'app-detalle-persona',
  templateUrl: './detalle-persona.component.html',
  styleUrls: ['./detalle-persona.component.scss']
})
export class DetallePersonaComponent implements OnInit {

  @Input() informacion: InformacionPersonaResponse;
  @Input() mostrar: boolean;

  datosValidos: FormGroup;
  rutValido = true;
  telefonoValido = true;

  constructor(
    public fb: FormBuilder,
    public rutValidator: RutValidator) { }

  ngOnInit() { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges() {
    if (this.informacion) {
      this.datosValidos = this.fb.group({
        rut: [this.informacion.rut, [this.rutValidator]],
        telefono: [this.informacion.telefono, [Validators.pattern(/^56[0-9]{9}$/)]]
      });
      this.rutValido = this.datosValidos.controls.rut.status === 'INVALID' ? false : true;
      this.telefonoValido = this.datosValidos.controls.telefono.status === 'INVALID' ? false : true;
    }
  }
}
