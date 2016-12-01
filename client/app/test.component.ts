import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QuizService } from './quiz.service';
import { Router } from '@angular/router';
import { Question } from"./question";

@Component({
  selector: 'test',
  templateUrl: '/templates/extensionTests',
  providers: [QuizService]
})
export class TestComponent implements OnInit{
    
    @Output() questionRepondue = new EventEmitter<boolean>();
    
    dragged;
    aide : boolean = true;
    draggable;
    
    note_actuelle;
    router;
    theme;
    num_question;
    nb_repondue;
    nb_question;
    link;
    couleur = "lightgray";
    style = "dotted";
    question : Question = new Question();
    progresSauvegarde : boolean = false;
    
    constructor(private quizService: QuizService, private _router: Router) { this.router = _router; }
    
    ngOnInit(): void {
        this.draggable = true;
        this.note_actuelle = this.quizService.getNoteActuelle();
        this.link = this.router.url;
        if (this.router.url == "/examen"){
            this.theme = this.quizService.getTheme();
            this.num_question = this.quizService.getNumQuestion();
            this.nb_repondue = this.quizService.getNbQuestionRepondue();
            this.nb_question = this.quizService.getNbQuestion();
            if (this.num_question == this.nb_question){
                this.link = "/resultat";
            }
        }
        this.getNouvelleQuestion();
    }
    
    

    
    getNouvelleQuestion(){
        
        this.question = new Question();
        
        if (this.router.url == "/test_rapide"){
            this.quizService.nouvelleQuestion().then(question => this.question = question);
        }else{

            if (this.theme=="html"){
                this.quizService.nouvelleQuestionHTML().then(question => this.question = question);
            }
            else{
                if (this.theme=="css"){
                    this.quizService.nouvelleQuestionCSS().then(question => this.question = question);
                }
                else{
                    this.quizService.nouvelleQuestionJS().then(question => this.question = question);
                }
            }
        }

    }
    
    replacerReponse(){
        this.couleur = "lightgray";
        this.style = "dotted";
        this.draggable = true;
        this.aide = true;
    }
    
    
    questionSuivante(){
        if (this.router.url == "/examen"){
            if(this.nb_repondue == this.num_question - 1){
                this.quizService.SauvegardeProgres();
                this.nb_repondue++;
                this.quizService.setNbQuestionRepondue(this.nb_repondue);
            }
            this.num_question ++;
            this.quizService.setNumQuestion(this.num_question);
            if (this.num_question == this.nb_question){
                this.link = "/resultat";
            }
        }
        this.getNouvelleQuestion();
        this.replacerReponse();
    }
    
    
    displayAide(){
        if(this.aide){
            return "block";
        }else{
            return "none";
        }
    }
    
    onDragStart(event){
        if (this.draggable){
            this.dragged = event.target;
            event.target.style.opacity = .5;
        }  
    }
    
    onDragEnd(event){
             event.target.style.opacity = "";
    }
    
    onDragOver(event){
        if (this.draggable){
            event.preventDefault();
        }
    }
    
    onDragEnter(event){
        if (this.draggable){
            if ( event.target.className == "dropzone" ) {
                  event.target.style.background = "#e8e8e8";
                  this.aide = false;
            }
        }
    }
    
    onDragLeave(event){
        if (this.draggable){
            if ( event.target.className == "dropzone" ) {
                  event.target.style.background = "";
            }
        }
    }

    couleur_reponse(){
        return this.couleur;
    }
    
    borderStyle(){
        return this.style;
    }
    
    isDraggable(){
        return this.draggable;
    }
    
    onDrop(event){
        if (this.draggable){
            event.preventDefault();
            if ( event.target.className == "dropzone" ) {
                event.target.style.background = "";
                this.dragged.parentNode.removeChild( this.dragged );
                event.target.appendChild( this.dragged );
                this.style = "solid";
                this.draggable = false;


                this.quizService.testerReponse(this.question.id, this.dragged.className)
                    .then(bonne_reponse => {
                                    if (bonne_reponse){
                                        this.couleur = "#95e66d";
                                        this.note_actuelle ++;
                                        this.quizService.setNoteActuelle(this.note_actuelle);
                                        if (this.router.url == "/test_rapide"){
                                            this.quizService.miseAJourQuestionsRapides("nb_reussie");
                                        }
                                    }else{
                                        this.couleur = "#f55f2b";
                                        if (this.router.url == "/test_rapide"){
                                            this.quizService.miseAJourQuestionsRapides("nb_totale");
                                        }
                                    }
                                if (this.router.url == "/test_rapide"){
                                    this.questionRepondue.emit(true);
                                }else{
                                    this.nb_repondue ++;
                                    this.quizService.setNbQuestionRepondue(this.nb_repondue);
                                    this.quizService.SauvegardeProgres();
                                }
                });
 
            }
        }
    }


}
 

 
 
