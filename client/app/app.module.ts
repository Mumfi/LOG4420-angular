import { NgModule  }      from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule  }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { IndexComponent }   from './index.component';
import { TableauComponent } from './tableau-de-bord.component';
import { InstructionComponent } from './instruction.component';
import { AjoutQuestionComponent } from './ajout-question.component';
import { TestRapideComponent } from './test-rapide.component';
import { ExamenComponent } from './examen.component';


@NgModule({
  imports: [ BrowserModule,
            FormsModule,
            HttpModule,
            AppRoutingModule
           ],
  declarations: [ AppComponent,
                  IndexComponent,
                  TableauComponent,
                  InstructionComponent,
                  AjoutQuestionComponent,
                  TestRapideComponent,
                  ExamenComponent
                ],
  //provider[ HeroService]
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
