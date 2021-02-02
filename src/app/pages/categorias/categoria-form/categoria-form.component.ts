import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit, AfterContentChecked {

  acao: string; //novo ou edicao
  categoriaForm: FormGroup;
  errors: string[] = [];
  submittingForm = false;
  categoria = new Categoria;
  titulo: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit() {
    this.setAcao();
    this.buildForm();
    if(this.acao == 'edicao'){
      this.getCategoria();
    }
  }
  
  ngAfterContentChecked(): void {
   console.log("")
  }

  //Seta se a acao e um cadastro de uma categoria uma edicao
  private setAcao(){
    this.route.snapshot.url[0].path == 'novo'? this.acao = 'novo' : this.acao = 'edicao';
  }

  //Constroi o formGroup para controle do form
  private buildForm(){
   this.categoriaForm = this.formBuilder.group({
      id:[null],
      nome:[null, Validators.required, Validators.minLength(2)],
      descricao: [null]
    })
  }

  //Pega uma categoria para ser editada do banco
  private getCategoria(){
    this.route.paramMap.pipe(
      //O + converte para number
      switchMap(params => this.categoriaService.getById(+params.get('id')))
    )
    .subscribe(
      categoria =>{
        this.categoria = categoria;
        //Adicionado os valores da categoria no form
        this.categoriaForm.patchValue(this.categoria)
      },
      error => alert('Deu erro')
    )
  }

}
