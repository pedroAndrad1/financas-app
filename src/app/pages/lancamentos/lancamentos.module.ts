import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";

@NgModule({
  declarations: [LancamentoListComponent, LancamentoFormComponent],
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class LancamentosModule { }
