import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { Lancamento } from '../models/lancamento.model';
import { CategoriaService } from './categoria.service';
import { flatMap } from 'rxjs/operators';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends BaseResourceService<Lancamento>{

  constructor(
    private categoriaService: CategoriaService,
    protected injector: Injector
    ) {
      super("http://localhost:3000/lancamentos", injector);
    }

  create(lancamento: Lancamento): Observable<Lancamento>{

    //Vou add a categoria ao lancamento, usando o flatmap pra retornar tudo em um Observable so
    return this.categoriaService.getById(lancamento.categoriaId).pipe(
      //O flatmap vai pegar o retorno do getById
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return super.create(lancamento);
      })

    )
  }

  update(lancamento: Lancamento): Observable<Lancamento>{
     //Vou add a categoria ao lancamento, usando o flatmap pra retornar tudo em um Observable so
    return this.categoriaService.getById(lancamento.categoriaId).pipe(
      //O flatmap vai pegar o retorno do getById
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return super.update(lancamento);   
      })
    )
  }

}
