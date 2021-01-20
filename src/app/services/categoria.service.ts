import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpClient: HttpClient) {}

  private API_URL = "http://localhost:3000";

  getAll():Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(this.API_URL);
  }

  getById(id: number): Observable<Categoria>{
    return this.httpClient.get<Categoria>(`${this.API_URL}/${id}`);
  }

  addCategoria(categoria: Categoria): Observable<Categoria>{
    return this.httpClient.post<Categoria>(this.API_URL, categoria);
  }

  update(id: number, categoria: Categoria): Observable<Categoria>{
    return this.httpClient.put<Categoria>(`${this.API_URL}/${id}`, categoria);
  }

  delete(id: number): Observable<Categoria>{
    return this.httpClient.delete<Categoria>(`${this.API_URL}/${id}`);
  }
}
