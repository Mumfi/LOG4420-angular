import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { QuizService } from './quiz.service';
import { StatComponent } from './stat.component';
import {Examen} from './examen';
 

@Component({
  selector: 'tableau_de_bord',
  templateUrl: '/templates/tableau_de_bord',
  providers: [QuizService]
})
export class TableauComponent implements OnInit{
    
    @Output() continuerProgres = new EventEmitter<boolean>();
    
    nb_question : any;
    theme : any;
    nb_question_max : any;
    
    ExamenEnregistre ;
    indication;
    examens : Examen [] = [];
    
    texte;
    
    constructor(private quizService: QuizService) { }

     ngOnInit(): void {
        this.nb_question=1;
        this.theme="html";
        this.ExamenEnregistre = false;
        this.indication = "Pour commencer un examen, veuillez remplir le formulaire ci-dessous :";
        this.TestExamenEnregistre();
        this.get_Nb_Reponse_Possible(this.theme);
        this. mise_A_Jour_Boite_Modale();
    }
    
    demarrerRapide(){
        this.quizService.setNoteActuelle(0);
    }
    
    demarrerExamen(): void {
        this.quizService.setNoteActuelle(0);
        this.quizService.setNumQuestion(1);
        this.quizService.setNbQuestionRepondue(0);
        this.quizService.setNbQuestion(this.nb_question);
        this.quizService.setTheme(this.theme);
    }
    
    update(value): void{
        this.theme = value;
        this.get_Nb_Reponse_Possible(this.theme);
    }
    
    supprimerExamEnCours(event) : void{
        event.preventDefault();
        this.quizService.deleteProgres();
        this.ExamenEnregistre = false;
        this.indication = "Pour commencer un examen, veuillez remplir le formulaire ci-dessous :";
    }
    
    
    memoireEffacee(){
        this. mise_A_Jour_Boite_Modale();
    }
    
    displayNewExam(){
        if(this.ExamenEnregistre){
            return "none";
        }else{
            return "inline";
        }
    }
    
    displayOldExam(){
        if(this.ExamenEnregistre){
            return "inline";
        }else{
            return "none";
        }
    }
    
    get_Nb_Reponse_Possible(theme): void{
        this.nb_question_max = this.quizService.get_Nb_Reponse_Possible(theme);
    }
    
    
    TestExamenEnregistre() : void{
        this.quizService.examenEnregistre().then(bool => {
            if (bool){
                this.ExamenEnregistre = true;
                this.quizService.continuerProgres();
                this.indication = "Un examen a été sauvegardé, veuillez choisir une des options suivantes :";
            }else{
                this.indication = "Pour commencer un examen, veuillez remplir le formulaire ci-dessous :";
            }
        });                           
    }
    
    mise_A_Jour_Boite_Modale(){
        
         this.quizService.getExamensFinis().then(exams =>{
             this.examens = exams;
             if (this.examens.length == 0){
                 this.texte = "Rien à montrer. Bonne chance!";
             }else{
                 this.texte = "";   
             }
         });   
    }
    

}
    


