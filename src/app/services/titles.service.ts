import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titles } from '../models/titles';


const baseUrl = 'http://localhost:8082/api/titles';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  constructor(private http: HttpClient) {

  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  getAll(): Observable<Titles[]> {
    return this.http.get<Titles[]>(baseUrl);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  getById(id: any): Observable<Titles> {
    return this.http.get(`${baseUrl}/${id}`)
  }
  getByUserId(user_id: any): Observable<Titles> {
    return this.http.get(`${baseUrl}/user_id/${user_id}`)
  }
}
