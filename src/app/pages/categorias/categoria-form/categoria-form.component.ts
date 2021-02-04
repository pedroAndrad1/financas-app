import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import toastr from "toastr";
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
  errorsMessages: string[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setAcao();
    this.buildForm();
    if (this.acao == 'edicao') {
      this.getCategoria();
    }
  }

  ngAfterContentChecked(): void {
    this.setTituloDaPagina();
  }

  //Seta se a acao e um cadastro de uma categoria uma edicao
  private setAcao() {
    this.route.snapshot.url[0].path == 'nova' ? this.acao = 'nova' : this.acao = 'edicao';
  }

  //Constroi o formGroup para controle do form
  private buildForm() {
    this.categoriaForm = this.formBuilder.group({
      id: [null],
      descricao: [null],
      nome: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
    })
  }

  //Pega uma categoria para ser editada do banco
  private getCategoria() {
    this.route.paramMap.pipe(
      //O + converte para number
      switchMap(params => this.categoriaService.getById(+params.get('id')))
    )
      .subscribe(
        categoria => {
          this.categoria = categoria;
          //Adicionado os valores da categoria no form
          this.categoriaForm.patchValue(this.categoria)
        },
        error => alert('Deu erro')
      )
  }

  private setTituloDaPagina() {
    if (this.acao == 'nova') {
      this.titulo = "Cadastro de nova categoria";
    }
    else {
      // Para caso não tenha carregado ainda a categoria, evitando o nome ser "null" 
      const categoriaNome = this.categoria.nome || "";

      this.titulo = "Editando a categoria " + categoriaNome;
    }
  }

  private addCategoria(){
    //Montando a categoria que sera enviada para o servidor
    const categoria = Object.assign(new Categoria(), this.categoriaForm.value);

    this.categoriaService.addCategoria(categoria)
      .subscribe(
        res => {
          toastr.success("Ação realizada com sucesso!");
          this.router.navigateByUrl("/categorias");
          this.submittingForm = false;
          this.errorsMessages = null;
        },
        error =>{
          toastr.error("Erro ao realizar a ação, tente novamente mais tarde");
          this.submittingForm = false;
          this.buildErrorMessages(error);
        } 
      )
  }

  private updateCategoria(){
    
     //Montando a categoria que sera enviada para o servidor
     const categoria = Object.assign(new Categoria(), this.categoriaForm.value);

    this.categoriaService.update(categoria.id, categoria)
      .subscribe(
        res => {
          toastr.success("Ação realizada com sucesso!");
          this.router.navigateByUrl("/categorias");
          this.submittingForm = false;
          this.errorsMessages = null;
        },
        error =>{
          toastr.error("Erro ao realizar a ação, tente novamente mais tarde");
          this.submittingForm = false;
          this.buildErrorMessages(error);
        } 
      )
  }

  private buildErrorMessages(error){
    error.status == 422?
      this.errorsMessages = JSON.parse(error.__body).errors
    :
    this.errorsMessages = ['Erro de comunicação com o servidor, tente novamente mais tarde.']
  }

  onSubmit(){  
    this.submittingForm = true;
    this.acao == 'nova'? this.addCategoria() : this.updateCategoria()
  }
}
