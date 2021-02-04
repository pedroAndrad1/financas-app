import { Categoria } from "./categoria.model";

export class Lancamento{
    id?: number;
    nome?: string;
    descricao?: string;
    tipo?: string;
    valor?: string;
    data?: Date;
    pago?: boolean;
    categoriaId?: number;
    categoria?: Categoria;

    static tipos ={
        despesa: 'Despesa',
        receita: 'Receita'
    }

    get pagoText(): string{
        return this.pago? 'Pago' : 'Pendente'; 
    }
}

