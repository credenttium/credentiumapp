import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CredencialService {

  private httpClient = inject(HttpClient);

  private URL_API = environment.api_url.concat("/credencial");

  public cadastrarCredencial(credencialModel: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API, credencialModel);
  }

  public findAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL_API);
  }
  
}
