import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';

@NgModule({
  declarations: [LancamentoListComponent, LancamentoFormComponent],
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    ReactiveFormsModule
  ]
})
export class LancamentosModule { }
