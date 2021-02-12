import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Lancamento } from '../../../models/lancamento.model';
import { LancamentoService } from '../../../services/lancamento.service';

@Component({
  selector: 'app-lancamento-list',
  templateUrl: './lancamento-list.component.html',
  styleUrls: ['./lancamento-list.component.css']
})
export class LancamentoListComponent implements OnInit {

  lancamentos: Lancamento[] = [];
  categorias: Categoria[] = [];

  constructor(
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.lancamentoService.getAll().subscribe(
      res => {
        //Convertendo os elementos vindo do servidor para lancamentos. Assim eles terao as
        //funcoes da classe lancamento. Estou interessado na pagoText
        res.forEach(element => {
          const lancamento = Object.assign(new Lancamento(), element)
          this.lancamentos.push(lancamento);
        })
      },
      error => alert('Error ao carregar as lancamentos')
    )

    this.categoriaService.getAll().subscribe(
      res => {
        this.categorias = res;
      },
      error => alert('Error ao carregar as categorias')
    )
  }

  deletar(lancamento: Lancamento) {

    const confirma = confirm("Tem certeza que deseja deletar esta lancamento?");

    if (confirma) {
      this.lancamentoService.delete(lancamento.id).subscribe(
        //Filtrando os lancamentos diferentes da lancamento removida da lista
        res => this.lancamentos = this.lancamentos.filter(element => element != lancamento),
        error => alert("Erro ao deletar a lancamento")
      )
    }

  }

  lancamentoCategoria(lancamento: Lancamento) {
   //Evita erro de context, pois nao vai fazer o filter se nao tiver carregado do servidor
   //as categorias
    if(this.categorias.length > 0){
      const categoria = this.categorias.filter(categoria => categoria.id == lancamento.categoriaId);
      return categoria[0].nome;
    }
    else{
      return ""; 
    }


  }
}
