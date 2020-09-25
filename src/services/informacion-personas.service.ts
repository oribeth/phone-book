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

  cosultarPersonas(): Observable<boolean | InformacionPersonaResponse> {
    return new Observable(observer => {
      const url = environment.INFORMACION_PERSONAS;
      this.http.get(url).subscribe((response: any) => {
        observer.next(response);
        observer.complete();
      }, err => {
        observer.next(false);
        observer.complete();
      });
    });
  }
}
