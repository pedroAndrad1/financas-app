import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LancamentoListComponent, LancamentoFormComponent],
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    SharedModule,
    CalendarModule,
    IMaskModule
  ]
})
export class LancamentosModule { }
