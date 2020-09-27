import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegionResponse } from 'src/model/region-comuna-response';

@Injectable({
  providedIn: 'root'
})
export class RegionComunaService {

  constructor(public http: HttpClient) { }

  cosultarRegionComuna(): Observable<boolean | RegionResponse[]> {
    return new Observable(observer => {
      const url = environment.REGION_COMUNA;
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
    for (const region of responseDecode) {
      try {
        region.nombre = decodeURIComponent(escape(region.nombre));
      } catch (e) {
        // catches a malformed URI
      }
      for (const comuna of region.comunas) {
        try {
          comuna.nombre = decodeURIComponent(escape(comuna.nombre));
        } catch (e) {
          // catches a malformed URI
        }
        if (comuna.nombre === 'Ã‘uÃ±oa') {
          comuna.nombre = 'Ñuñoa';
        }
      }
    }
    return responseDecode;
  }
}
