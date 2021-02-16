import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpClient: HttpClient) {}

  private API_BASE = "http://localhost:3000/categorias";

  getAll():Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(this.API_BASE);
  }

  getById(id: number): Observable<Categoria>{
    return this.httpClient.get<Categoria>(`${this.API_BASE}/${id}`);
  }

  addCategoria(categoria: Categoria): Observable<Categoria>{
    return this.httpClient.post<Categoria>(this.API_BASE, categoria);
  }

  update(id: number, categoria: Categoria): Observable<Categoria>{
    return this.httpClient.put<Categoria>(`${this.API_BASE}/${id}`, categoria);
  }

  delete(id: number): Observable<Categoria>{
    return this.httpClient.delete<Categoria>(`${this.API_BASE}/${id}`);
  }
}
