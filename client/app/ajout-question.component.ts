import { Component, OnInit} from '@angular/core';
import { QuizService } from './quiz.service';
import { Question } from"./question";


@Component({
  selector: 'ajout de question',
  templateUrl: '/templates/ajouter_question',
  providers: [QuizService]
})

export class AjoutQuestionComponent implements OnInit {
    
    afficherReponse = false;
    messageRAZ;
    nb_reponse;
    reponses : String [] = [];
    retour : Question = new Question();
    
    constructor(private quizService: QuizService) { }
    
    ngOnInit(): void {
        
        this.nb_reponse = 2;
        this.reponses.length = 2;
        
    }
    
    
    update(nb){
        this.nb_reponse = nb;
        this.reponses.length = nb;
    }
    
    envoyerQuestion(event){
        event.preventDefault();
        for (var i=0; i<this.reponses.length; i++){
            this.reponses[i] = event.target.reponses[i].value;
        }
        var donnees = { domaine : event.target.domaine.value,
                        question : event.target.question.value,
                        reponses : this.reponses,
                        bonne_reponse : event.target.bonne_reponse.value
                      }
        this.quizService.envoiQuestion(donnees).then(rep => this.retour = rep);
        this.afficherReponse = true;
    }
    
    RAZ(event){
        event.preventDefault();
        this.quizService.EffacerQuestions().then(mess => this.messageRAZ = mess);
    }
    
    displayReponse(){
        if (this.afficherReponse){
            return "block";
        }else{
            return "none";
        }
    }
    
    displayForm(){
        if (this.afficherReponse){
            return "none";
        }else{
            return "block";
        }
    }
    
}

