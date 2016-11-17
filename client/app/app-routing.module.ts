
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { IndexComponent }   from './index.component';
import { TableauComponent } from './tableau-de-bord.component';
import { InstructionComponent } from './instruction.component';
import { AjoutQuestionComponent } from './ajout-question.component';
import { TestRapideComponent } from './test-rapide.component';
import { ExamenComponent } from './examen.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index',  component: IndexComponent },
  { path: 'tableau_de_bord', component: TableauComponent},
  { path: 'instructions', component: InstructionComponent},
  { path: 'ajouter_question', component: AjoutQuestionComponent},
  { path: 'test_rapide', component: TestRapideComponent},
  { path: 'examen', component: ExamenComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
