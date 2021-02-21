import { BaseResourceModel } from "./base-resource.model";

export class Categoria implements BaseResourceModel{
    id?:number;
    nome?:string;
    descricao?:string;

    static fromJson(jsonData: any): Categoria{
        return Object.assign(new Categoria(), jsonData);
    }
}