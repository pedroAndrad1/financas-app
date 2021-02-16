import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Categoria } from 'src/app/models/categoria.model';
import { Lancamento } from 'src/app/models/lancamento.model';
import { CategoriaService } from 'src/app/services/categoria.service';
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
  categorias: Categoria[];

  //Mascara para os valores
  imaskValores = {
    //seta que o tipo tem que ser number
    mask: Number,
    //duas casas decimais
    scale: 2,
    //Sem separador de milhares
    thousandSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    //separador para decimal
    radix: ','
  };

  //Traducao para os calendar
  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lancamentoService: LancamentoService,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.setAcao();
    this.buildForm();
    if (this.acao == 'edicao') {
      this.getLancamento();
    }
    this.getCategorias();
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
      tipo: ['despesa', [Validators.required]],
      valor: [null, [Validators.required]],
      data: [null, [Validators.required]],
      pago: [true, [Validators.required]],
      categoriaId: [null, [Validators.required]],

    })
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

  private addLancamento() {
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
        error => {
          toastr.error("Erro ao realizar a ação, tente novamente mais tarde");
          this.submittingForm = false;
          this.buildErrorMessages(error);
        }
      )
  }

  private updateLancamento() {

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
        error => {
          toastr.error("Erro ao realizar a ação, tente novamente mais tarde");
          this.submittingForm = false;
          this.buildErrorMessages(error);
        }
      )
  }

  private buildErrorMessages(error) {
    error.status == 422 ?
      this.errorsMessages = JSON.parse(error.__body).errors
      :
      this.errorsMessages = ['Erro de comunicação com o servidor, tente novamente mais tarde.']
  }

  onSubmit() {
    this.submittingForm = true;
    this.acao == 'nova' ? this.addLancamento() : this.updateLancamento()
  }

  private setPagoStatus(status: boolean){
    this.lancamentoForm.get('pago').setValue(status);
  }

  //Retorna um array de objetos com as opcoes de tipo de lancamento
  get tipos(): Array<any>{

    return Object.entries(Lancamento.tipos).map(
      ([valor, texto]) =>{
        return {
          texto,
          valor
        }
      }
    )

  }

  private getCategorias(){
    this.categoriaService.getAll().subscribe(
      res => this.categorias = res
    )
  }
}