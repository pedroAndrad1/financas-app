import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/shared/models/categoria.model';
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      res => this.categorias = res,
      error => alert('Error ao carregar as categorias')
    )
  }

  deletar(categoria: Categoria){

    const confirma = confirm("Tem certeza que deseja deletar esta categoria?");

    if(confirma){
      this.categoriaService.delete(categoria.id).subscribe(
        //Filtrando as categorias diferentes da categoria removida da lista
        res => this.categorias = this.categorias.filter(element => element != categoria),
        error => alert("Erro ao deletar a categoria")
      )
    }

  }
}
