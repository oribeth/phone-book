import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InformacionPersonaResponse } from 'src/model/informacion-personas-response';

@Injectable({
  providedIn: 'root'
})
export class InformacionPersonasService {

  constructor(public http: HttpClient) { }

  cosultarPersonas(): Observable<boolean | InformacionPersonaResponse[]> {
    return new Observable(observer => {
      const url = environment.INFORMACION_PERSONAS;
      this.http.get(url).subscribe((response: any) => {
        observer.next(this.decode_utf8(response));
        observer.complete();
      }, err => {
        observer.next(false);
        observer.complete();
      });
    });
  }

  decode_utf8(response) {
    let responseDecode = response;
    for (const persona of responseDecode) {
      try {
        persona.nombre = decodeURIComponent(escape(persona.nombre));
      } catch (e) {
        // catches a malformed URI
      }
      try {
        persona.apellido = decodeURIComponent(escape(persona.apellido));
      } catch (e) {
        // catches a malformed URI
      }
      try {
        persona.direccion.calle = decodeURIComponent(escape(persona.direccion.calle));
      } catch (e) {
        // catches a malformed URI
      }
      try {
        persona.direccion.comuna.nombre = decodeURIComponent(escape(persona.direccion.comuna.nombre));
      } catch (e) {
        // catches a malformed URI
      }
    }
    return responseDecode;
  }
}
