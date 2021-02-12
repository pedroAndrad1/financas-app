import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Lancamento } from 'src/app/models/lancamento.model';
import { LancamentoService } from 'src/app/services/lancamento.service';
import toastr from "toastr";

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent implements OnInit, AfterContentChecked {

  acao: string; //novo ou edicao
  lancamentoForm: FormGroup;
  errors: string[] = [];
  submittingForm = false;
  lancamento = new Lancamento;
  titulo: string;
  errorsMessages: string[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lancamentoService: LancamentoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setAcao();
    this.buildForm();
    if (this.acao == 'edicao') {
      this.getLancamento();
    }
  }

  ngAfterContentChecked(): void {
    this.setTituloDaPagina();
  }

  //Seta se a acao e um cadastro de uma lancamento uma edicao
  private setAcao() {
    this.route.snapshot.url[0].path == 'nova' ? this.acao = 'nova' : this.acao = 'edicao';
  }

  //Constroi o formGroup para controle do form
  private buildForm() {
    this.lancamentoForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      descricao: [null],
      tipo: [null, [Validators.required] ],
      valor: [null, [Validators.required] ],
      data: [null, [Validators.required] ],
      pago: [null, [Validators.required]],
      categoriaId: [null, [Validators.required]],
      
    })
    console.log(this.lancamentoForm);
  }

  //Pega uma lancamento para ser editada do banco
  private getLancamento() {
    this.route.paramMap.pipe(
      //O + converte para number
      switchMap(params => this.lancamentoService.getById(+params.get('id')))
    )
      .subscribe(
        lancamento => {
          this.lancamento = lancamento;
          //Adicionado os valores da lancamento no form
          this.lancamentoForm.patchValue(this.lancamento)
        },
        error => alert('Deu erro')
      )
  }

  private setTituloDaPagina() {
    if (this.acao == 'nova') {
      this.titulo = "Cadastro de novo lancamento";
    }
    else {
      // Para caso não tenha carregado ainda a lancamento, evitando o nome ser "null" 
      const lancamentoNome = this.lancamento.nome || "";

      this.titulo = "Editando o lançamento " + lancamentoNome;
    }
  }

  private addLancamento(){
    //Montando a lancamento que sera enviada para o servidor
    const lancamento = Object.assign(new Lancamento(), this.lancamentoForm.value);

    this.lancamentoService.addLancamento(lancamento)
      .subscribe(
        res => {
          toastr.success("Ação realizada com sucesso!");
          this.router.navigateByUrl("/lancamentos");
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

  private updateLancamento(){
    
     //Montando a lancamento que sera enviada para o servidor
     const lancamento = Object.assign(new Lancamento(), this.lancamentoForm.value);

    this.lancamentoService.update(lancamento.id, lancamento)
      .subscribe(
        res => {
          toastr.success("Ação realizada com sucesso!");
          this.router.navigateByUrl("/lancamentos");
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
    this.acao == 'nova'? this.addLancamento() : this.updateLancamento()
  }
}