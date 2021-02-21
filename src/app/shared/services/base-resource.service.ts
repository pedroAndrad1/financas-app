//Base para os services
import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable } from "rxjs";
import { BaseResourceModel } from '../models/base-resource.model';
import { map } from "rxjs/operators";

export abstract class BaseResourceService<T extends BaseResourceModel>{
      
    protected httpClient: HttpClient;

    constructor(
        protected API_BASE: string,
        //Para ter instaciar qualquer classe que precisar
        protected injector: Injector,
        //Para converter os jsons vindos do servidor em objetos da classe desejada
        protected jsonToResourceFn: (jsonData: any) => T
    ){
        this.httpClient = injector.get(HttpClient);
    }
    
    getAll(): Observable<T[]> {
        return this.httpClient.get<T[]>(this.API_BASE).pipe(
          //O bind e pra dizer que o contexto do 'this' na function jsonToResources e a classe
          //BaseResourceService  e nao o map. Assim a function vai converter os elementos json corretamente.
          map(this.jsonToResources.bind(this))
        );
    }

    getById(id: number): Observable<T> {
        return this.httpClient.get<T>(`${this.API_BASE}/${id}`).pipe(
          //O bind e pra dizer que o contexto do 'this' na function jsonToResources e a classe
          //BaseResourceService  e nao o map. Assim a function vai converter os elementos json corretamente.
          map(this.jsonToResource.bind(this))
        );
    }

    create(resource: T): Observable<T> {
        return this.httpClient.post<T>(this.API_BASE, resource);
    }

    update(resource: T): Observable<T> {
        return this.httpClient.put<T>(`${this.API_BASE}/${resource.id}`, resource);
    }

    delete(id: number): Observable<T> {
        return this.httpClient.delete<T>(`${this.API_BASE}/${id}`);
    }

    //Metodos de conversao

    //Converte um array de Json para um array de objetos usando a function de conversao recebida
    protected jsonToResources(jsonData:any[]): T[]{  
        const resources:T[] = [];

        jsonData.forEach( element => resources.push(this.jsonToResourceFn(element)) )

        return resources;
    }

    //Converte um Json para um objeto
    protected jsonToResource(jsonData: any): T{
        return this.jsonToResourceFn(jsonData);
    }
}