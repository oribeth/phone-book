import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegionComunaResponse } from 'src/model/region-comuna-response';

@Injectable({
  providedIn: 'root'
})
export class RegionComunaService {

  constructor(public http: HttpClient) { }

  cosultarRegionComuna(): Observable<boolean | RegionComunaResponse> {
    return new Observable(observer => {
      const url = environment.REGION_COMUNA;
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
