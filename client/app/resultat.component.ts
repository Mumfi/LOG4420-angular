import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';


@Component({
  selector: 'Resultat',
  templateUrl: '/templates/resultats',
  providers: [QuizService]
})
export class ResultatComponent implements OnInit{
    
    theme;
    nb_bonne_reponse;
    nb_question;
    pourcentage;
    note_finale;
    commentaire;
    
    constructor(private quizService: QuizService) { }
    
    ngOnInit(): void {
        this.theme = this.quizService.getTheme();
        this.nb_bonne_reponse = this.quizService.getNoteActuelle();
        this.nb_question = this.quizService.getNbQuestion();
        this.pourcentage = parseInt(this.nb_bonne_reponse) / parseInt(this.nb_question) * 100;
        this.note_finale = Math.floor(this.pourcentage);
        if (this.pourcentage <= 25) {
            this.commentaire = "Faible";
        }
        else if (this.pourcentage > 25 && this.pourcentage <= 50) {
            this.commentaire = "Moyenne";
        }
        else if (this.pourcentage > 50 && this.pourcentage <= 75) {
            this.commentaire = "Bon";
        }
        else if (this.pourcentage > 75) {
            this.commentaire = "Très bien";
        }
        
        var info_exam = {theme : this.theme,
                     nb_bonne_rep : this.nb_bonne_reponse,
                     nb_reponse : this.nb_question
        };
        this.quizService.ajouteExamenFini(info_exam);
        this.quizService.deleteProgres();

    }
}

