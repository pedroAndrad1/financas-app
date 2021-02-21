import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { Categoria } from '../models/categoria.model';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseResourceService<Categoria> {
  
  constructor(protected injector: Injector) {
    super("http://localhost:3000/categorias", injector, Categoria.fromJson)
  }


}
