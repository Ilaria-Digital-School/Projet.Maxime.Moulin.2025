import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = environment.siteUrl + '/api/content';

  constructor(private http: HttpClient) { }

  getContent(contentType: string): Observable<any> {  
    return this.http.get(`${this.apiUrl}/${contentType}`, this.authHeaders());
  }

  getContentById(contentType: string, id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${contentType}/${id}`, this.authHeaders());
  }

  addContent(contentType: string, data: FormData): Observable<any> {
    // Vérification si data est un FormData ou JSON
    const requestHeaders = data instanceof FormData 
      ? this.authHeadersFormData() 
      : this.authHeaders();

    return this.http.post(`${this.apiUrl}/${contentType}`, data, requestHeaders);
  }

  updateContent(contentType: string, id: number, data: any): Observable<any> {
    // Vérification si data est un FormData ou JSON
    const requestHeaders = data instanceof FormData 
      ? this.authHeadersFormData() 
      : this.authHeaders();

    return this.http.put(`${this.apiUrl}/${contentType}/${id}`, data, requestHeaders);
  }

  deleteContent(contentType: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${contentType}/${id}`, this.authHeaders());
  }

  private authHeaders() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return { headers };
  }

  private authHeadersFormData() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return { headers };
  }
}
