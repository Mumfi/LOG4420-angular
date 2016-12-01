import { Component, OnInit, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import { QuizService } from './quiz.service';
import {Examen} from './examen';
import {Rapide} from './rapide';
import { Router } from '@angular/router';


@Component({
  selector: 'stat',
  templateUrl: '/templates/extensionStat',
  providers: [QuizService]
})
export class StatComponent implements OnInit, OnChanges{
    
    router;
    
    @Output() memoireEffacee = new EventEmitter<boolean>();
    @Input() questionRep;

    constructor(private quizService: QuizService, private _router: Router) { this.router = _router; }
    
    moyenne_test_rapide : any;
    moyenne_exam : any;
    moyenne_HTML : any;
    moyenne_CSS : any;
    moyenne_JS : any;
    
    moyenne;
    moyenneHTML;
    moyenneCSS;
    moyenneJS;

    
    ngOnInit(): void {
        this.calculMoyenne();
        this.MiseAJourStatistiqueRapide();
    }
    
    ngOnChanges(){
        this.MiseAJourStatistiqueRapide();
    }
    
    EffacerStat(event) : void{
        event.preventDefault();
        this.quizService.deleteExamens();
        this.quizService.deleteRapides();
        this.calculMoyenne();
        this.MiseAJourStatistiqueRapide();
        this.memoireEffacee.emit(true);
        
    }

    
    mise_A_Jour_Stat() : void{
        if (this.moyenne == null){
            this.moyenne_exam = "-";
        }else{
            this.moyenne_exam = this.moyenne+"%";
        }
        if(this.moyenneHTML == null){
            this.moyenne_HTML = "-";
        }else{
            this.moyenne_HTML = this.moyenneHTML+"%";
        }
        if(this.moyenneCSS == null){
            this.moyenne_CSS = "-";
        }else{
            this.moyenne_CSS = this.moyenneCSS+"%";
        }
        if(this.moyenneJS == null){
            this.moyenne_JS = "-";
        }else{
            this.moyenne_JS = this.moyenneJS+"%";
        }
    }
    
    calculMoyenne() : void {
        this.moyenne = 0;
        var isExam = false;
        this.moyenneHTML = 0;
        var nbHTML = 0;
        var isExamHTML = false;
        this.moyenneCSS = 0;
        var nbCSS = 0;
        var isExamCSS = false;
        this.moyenneJS = 0;
        var nbJS=0;
        var isExamJS = false;
        
        
        this.quizService.getExamensFinis().then(exams => {
                                
                                exams.forEach(exam => {
                                    isExam = true;
                                    this.moyenne = Number (this.moyenne) + (Number(exam.bonne_reponse) / Number(exam.totale_reponse) * 100);
                                    if (exam.domaine == "html"){
                                        isExamHTML = true;
                                        this.moyenneHTML = Number (this.moyenneHTML) + (Number(exam.bonne_reponse) / Number(exam.totale_reponse) * 100);
                                        nbHTML++;
                                    }
                                    if (exam.domaine == "css"){
                                        isExamCSS = true;
                                        this.moyenneCSS = Number(this.moyenneCSS) + (Number(exam.bonne_reponse) / Number(exam.totale_reponse) * 100);
                                        nbCSS++;
                                    }
                                    if (exam.domaine == "javascript"){
                                        isExamJS = true;
                                        this.moyenneJS = Number(this.moyenneJS) + (Number(exam.bonne_reponse) / Number(exam.totale_reponse) * 100);
                                        nbJS++;
                                    }
                                });
                                
                                this.moyenne = Math.floor(this.moyenne / (nbHTML + nbCSS + nbJS));
                                this.moyenneHTML = Math.floor(this.moyenneHTML / nbHTML);
                                this.moyenneCSS = Math.floor(this.moyenneCSS / nbCSS);
                                this.moyenneJS = Math.floor(this.moyenneJS / nbJS);
            
                                if(!isExam){
                                    this.moyenne = null;
                                }
                                if(!isExamHTML){
                                    this.moyenneHTML = null;
                                }
                                if(!isExamCSS){
                                    this.moyenneCSS = null;
                                }
                                if(!isExamJS){
                                    this.moyenneJS = null;
                                }
                                this.mise_A_Jour_Stat();
        });
    }
    
    MiseAJourStatistiqueRapide() : void{
        this.quizService.getStatistiqueRapide()
            .then(stat => {
                            if (stat[0] == null){
                                this.moyenne_test_rapide = "-";
                            }else{
                                if (stat[0].nb_reussie == null){
                                    this.moyenne_test_rapide = "0 / " + stat[0].nb_totale;
                                }else{
                                    this.moyenne_test_rapide = stat[0].nb_reussie + " / " + stat[0].nb_totale;
                                }
                            }            
        });
        
    }
    
    displayDelete(){
        if (this.router.url=="/tableau_de_bord"){
            return "inline";
        }else{
            return "none";
        }
    }
    
}