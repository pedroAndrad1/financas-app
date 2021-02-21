import { BaseResourceModel } from "./base-resource.model";
import { Categoria } from "./categoria.model";

export class Lancamento implements BaseResourceModel{
    id?: number;
    nome?: string;
    descricao?: string;
    tipo?: string;
    valor?: string;
    data?: Date;
    pago?: boolean;
    categoriaId?: number;
    categoria: Categoria;

    static tipos ={
        despesa: 'Despesa',
        receita: 'Receita'
    }

    static fromJson(jsonData: any): Lancamento{
        return Object.assign(new Lancamento(), jsonData);
    }

    get pagoText(): string{
        return this.pago? 'Pago' : 'Pendente'; 
    }
}

