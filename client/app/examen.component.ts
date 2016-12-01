import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';


@Component({
  selector: 'Examen',
  templateUrl: '/templates/examen',
  providers: [QuizService]
})
export class ExamenComponent implements OnInit {
    
    constructor(private quizService: QuizService) { }
    
    theme;
    num_question;
    nb_question;
    
    ngOnInit(): void {
        this.theme = this.quizService.getTheme(); 
    }
    
    abandon(){
        this.quizService.abandonExamen();
    }
}

