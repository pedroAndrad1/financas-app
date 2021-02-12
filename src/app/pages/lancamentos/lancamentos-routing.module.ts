import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';

const routes: Routes = [
  {path:'', component: LancamentoListComponent},
  {path:'nova', component: LancamentoFormComponent},
  {path:':id/edicao', component: LancamentoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
