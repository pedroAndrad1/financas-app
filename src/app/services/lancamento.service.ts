import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { Lancamento } from '../models/lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private httpClient: HttpClient) {}

  private API_BASE = "http://localhost:3000/lancamentos";

  getAll():Observable<Lancamento[]>{
    return this.httpClient.get<Lancamento[]>(this.API_BASE);
  }

  getById(id: number): Observable<Lancamento>{
    return this.httpClient.get<Lancamento>(`${this.API_BASE}/${id}`);
  }

  addLancamento(lancamento: Lancamento): Observable<Lancamento>{
    return this.httpClient.post<Lancamento>(this.API_BASE, lancamento);
  }

  update(id: number, lancamento: Lancamento): Observable<Lancamento>{
    return this.httpClient.put<Lancamento>(`${this.API_BASE}/${id}`, lancamento);
  }

  delete(id: number): Observable<Lancamento>{
    return this.httpClient.delete<Lancamento>(`${this.API_BASE}/${id}`);
  }
}
