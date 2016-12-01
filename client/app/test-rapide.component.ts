import { Component, OnInit} from '@angular/core';
import { QuizService } from './quiz.service';
import { TestComponent } from './test.component';
import { StatComponent } from './stat.component';


@Component({
  selector: 'Test-Rapide',
  templateUrl: '/templates/test_rapide',
  providers: [QuizService]
})
export class TestRapideComponent implements OnInit {
    
    questionRep  = 0;
    
    constructor(private quizService: QuizService) { }
    
    ngOnInit(): void {
    }
    
    questionRepondue(){
        this.questionRep++;
    }
}

