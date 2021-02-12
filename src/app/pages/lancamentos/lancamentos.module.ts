import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';

@NgModule({
  declarations: [LancamentoListComponent],
  imports: [
    CommonModule,
    LancamentosRoutingModule,
  ]
})
export class LancamentosModule { }
