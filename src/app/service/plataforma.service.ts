import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PlataformaService {

  private httpClient = inject(HttpClient);

  private url_api = environment.api_url.concat("/plataforma");

  public create(plataformaFormData: FormData): Observable<any> {
    return this.httpClient.post(this.url_api, plataformaFormData);
  }
  
}
