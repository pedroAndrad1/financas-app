import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { Lancamento } from '../models/lancamento.model';
import { CategoriaService } from './categoria.service';
import { catchError, flatMap } from 'rxjs/operators';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends BaseResourceService<Lancamento>{

  constructor(
    private categoriaService: CategoriaService,
    protected injector: Injector
    ) {
      super("http://localhost:3000/lancamentos", injector, Lancamento.fromJson);
    }

  //O bind diz que o contexto da function e o LancamentoService
  //Caso nao faca esse bind, o contexto acabara sendo o flatMap e dara erros nos this da function

  create(lancamento: Lancamento): Observable<Lancamento>{
   return this.setCategoriaAndSentToServer(lancamento, super.create.bind(this));
  }

  update(lancamento: Lancamento): Observable<Lancamento>{
    return this.setCategoriaAndSentToServer(lancamento, super.update.bind(this));
  }

  //Seta a categoria e envia para o servidor baseado na function recebida por parametro
  setCategoriaAndSentToServer(lancamento: Lancamento, sendFn: any): Observable<Lancamento>{
     //Vou add a categoria ao lancamento, usando o flatmap pra retornar tudo em um Observable so
     return this.categoriaService.getById(lancamento.categoriaId).pipe(
      //O flatmap vai pegar o retorno do getById
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return sendFn(lancamento);   
      }),
      catchError(this.handleError)
    )
  }

}
