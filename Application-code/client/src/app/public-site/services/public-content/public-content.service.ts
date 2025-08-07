import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicContentService {
  private apiUrl = environment.siteUrl + '/api'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Requête pour récupérer le contenu public
  getContent(contentType: string): Observable<any> {  
    return this.http.get(`${this.apiUrl}/public/${contentType}`);
  }

  // Requête pour envoyer les formulaires
  postContent(contentType: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${contentType}`, data);
  }
}
