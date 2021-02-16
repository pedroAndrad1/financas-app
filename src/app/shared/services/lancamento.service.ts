import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { Lancamento } from '../models/lancamento.model';
import { CategoriaService } from './categoria.service';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(
    private httpClient: HttpClient, 
    private categoriaService: CategoriaService
    ) {}

  private API_BASE = "http://localhost:3000/lancamentos";

  getAll():Observable<Lancamento[]>{
    return this.httpClient.get<Lancamento[]>(this.API_BASE);
  }

  getById(id: number): Observable<Lancamento>{
    return this.httpClient.get<Lancamento>(`${this.API_BASE}/${id}`);
  }

  addLancamento(lancamento: Lancamento): Observable<Lancamento>{

    //Vou add a categoria ao lancamento, usando o flatmap pra retornar tudo em um Observable so
    return this.categoriaService.getById(lancamento.categoriaId).pipe(
      //O flatmap vai pegar o retorno do getById
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return this.httpClient.post<Lancamento>(this.API_BASE, lancamento);
      })

    )
  }

  update(lancamento: Lancamento): Observable<Lancamento>{
     //Vou add a categoria ao lancamento, usando o flatmap pra retornar tudo em um Observable so
    return this.categoriaService.getById(lancamento.categoriaId).pipe(
      //O flatmap vai pegar o retorno do getById
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return this.httpClient.put<Lancamento>(`${this.API_BASE}/${lancamento.id}`, lancamento);   
      })
    )
  }

  delete(id: number): Observable<Lancamento>{
    return this.httpClient.delete<Lancamento>(`${this.API_BASE}/${id}`);
  }
}
