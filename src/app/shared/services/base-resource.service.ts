//Base para os services
import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable } from "rxjs";
import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel>{
      
    protected httpClient: HttpClient;

    constructor(
        protected API_BASE: string,
        protected injector: Injector //Para ter instaciar qualquer classe que precisar
    ){
        this.httpClient = injector.get(HttpClient);
    }
    
    getAll(): Observable<T[]> {
        return this.httpClient.get<T[]>(this.API_BASE);
    }

    getById(id: number): Observable<T> {
        return this.httpClient.get<T>(`${this.API_BASE}/${id}`);
    }

    create(resource: T): Observable<T> {
        return this.httpClient.post<T>(this.API_BASE, resource);
    }

    update(id: number, resource: T): Observable<T> {
        return this.httpClient.put<T>(`${this.API_BASE}/${id}`, resource);
    }

    delete(id: number): Observable<T> {
        return this.httpClient.delete<T>(`${this.API_BASE}/${id}`);
    }
}