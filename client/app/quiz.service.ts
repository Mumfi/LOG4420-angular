import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Rapide} from './rapide';
import {Examen} from './examen';
import {Question} from './question';

@Injectable()
export class QuizService {
    
    
    constructor(private http: Http) { }
    
    envoiQuestion(donnees) : Promise<Question> {
    
        return this.http.post("/ajax/questions", donnees)
            .toPromise()
            .then(function(response){
                    return (response.json() as Question);
                })
            .catch();
    }
    
    EffacerQuestions() : Promise<String> {
        
        return this.http.delete("/ajax/questions")
            .toPromise()
            .then(function(response){
                    return "La base de données à bien été vidée !";
            })
            .catch(function (response){
                return "Il y a eu une erreur lors de la suppression des questions de la base de données.";
        });
    }
    

    nouvelleQuestion() : Promise<Question> {
        return this.http.get("/ajax/nouvelle_question_test")
               .toPromise()
                .then(function(response){
                    return (response.json() as Question);
                })
               .catch();
    }
    

    nouvelleQuestionHTML() : Promise<Question> {
    
        return this.http.get("/ajax/nouvelle_question_exam_HTML")
               .toPromise()
                .then(function(response){
                    return (response.json() as Question);
                })
               .catch();
    }
    
    nouvelleQuestionCSS() : Promise<Question> {
        return this.http.get("/ajax/nouvelle_question_exam_CSS")
                   .toPromise()
                    .then(function(response){
                        return (response.json() as Question);
                    })
                   .catch();
        
    }
    
    nouvelleQuestionJS() : Promise<Question> {
        return this.http.get("/ajax/nouvelle_question_exam_JS")
                   .toPromise()
                    .then(function(response){
                        return (response.json() as Question);
                    })
                   .catch();
        
    }
    

    
    getNoteActuelle() : string {
        return sessionStorage.getItem("note_actuelle");
    }
    
    getTheme() : string {
         return sessionStorage.getItem("theme");
    }
    
    getNbQuestion() : string {
        return sessionStorage.getItem("nb_question");
    }
    
    getNumQuestion() : number {
        return parseInt(sessionStorage.getItem("num_question"));
    }
    
    getNbQuestionRepondue(){
        return parseInt(sessionStorage.getItem("nb_repondue"));
    }
    
    
    setTheme(theme) : void{
        sessionStorage.setItem("theme", theme);
    } 
    
    setNbQuestion(nb) : void{
        sessionStorage.setItem("nb_question", nb);
    }
    
    setNoteActuelle(num) : void{
        sessionStorage.setItem("note_actuelle", num);
    }
    
    setNumQuestion(num) : void{
        sessionStorage.setItem("num_question", num);
    }
    
    setNbQuestionRepondue(num) : void{
        sessionStorage.setItem("nb_repondue", num);
    }
    
    incrementerNoteActuelle() : number{
        var note_actuelle = parseInt(sessionStorage.getItem("note_actuelle")) + 1;
        sessionStorage.setItem("note_actuelle", note_actuelle.toString());
        return note_actuelle;
    } 
    
    
    
    abandonExamen() : void {
        sessionStorage.setItem("note_actuelle", "0");
    }
    
    
    
    ajouteExamenFini(donnees) : void {
        
         this.http.post("/ajax/statistique/examen", donnees)
               .toPromise()
                .then(function(response){
        })
               .catch();

    }
    
    
    
    getExamensFinis() : Promise<Examen[]> {
        
         return this.http.get("/ajax/statistique/examen")
               .toPromise()
                .then(function(response){
                    return (response.json() as Examen[]);
                })
               .catch();
    }
    
    
    deleteExamens() : void {
        
        this.http.delete('/ajax/statistique/examen').toPromise().then(function successCallback(data) {
            
          }, function errorCallback(response) {
            console.log(response);
          });
    }
    
    
    
    getStatistiqueRapide() : Promise<Rapide[]>{

         return this.http.get("/ajax/statistique/rapide")
               .toPromise()
                .then(function(response){
                    return (response.json() as Rapide[]);
                })
               .catch();
    }
    
    
    deleteRapides() : void{
        
        this.http.delete('/ajax/statistique/rapide').toPromise().then(function successCallback(data) {
            
          }, function errorCallback(response) {
            console.log(response);
          });

    }
    
    
    
    
    miseAJourQuestionsRapides(type) : void{
        
        this.http.post("/ajax/statistique/rapide", {'type': type})
               .toPromise()
                .then(function(response){
        })
               .catch();
    }
    
    
    
    SauvegardeProgres() : void {
        var nb_reussie = sessionStorage.getItem("note_actuelle");
        var nb_repondue = sessionStorage.getItem("nb_repondue");
        var nb_totale = sessionStorage.getItem("nb_question");
        var domaine = sessionStorage.getItem("theme");
        
        this.http.post("/ajax/progres", {'nb_reussie': nb_reussie,
                                                'nb_repondue': nb_repondue,
                                                'nb_totale': nb_totale,
                                                'domaine' : domaine})
               .toPromise()
                .then(function(response){
        })
               .catch();
        
    }
    
    continuerProgres() : void{

        this.http.get('/ajax/progres').toPromise().then(data => {
            sessionStorage.setItem("note_actuelle", data.json()[0].nb_reussie);
            sessionStorage.setItem("nb_repondue", data.json()[0].nb_repondue);
            sessionStorage.setItem("num_question", data.json()[0].nb_repondue+1);
            sessionStorage.setItem("nb_question", data.json()[0].nb_totale);
            sessionStorage.setItem("theme", data.json()[0].domaine);
            
          }, function errorCallback(response) {
            console.log(response);
          });
    }
    
    
    deleteProgres() : void{
        sessionStorage.setItem("theme", null);
        sessionStorage.setItem("nb_question", "0");
        sessionStorage.setItem("note_actuelle", "0");
        sessionStorage.setItem("nb_repondue", "0");
        
        this.http.delete('/ajax/progres').toPromise().then(function successCallback(data) {
            
          }, function errorCallback(response) {
            console.log(response);
          });
    }
  
    
    get_Nb_Reponse_Possible(theme) : Promise<number>{
        return this.http.post("/ajax/demande_nb_question", {"theme" : theme})
               .toPromise()
                .then(function(response){
                return response.json();
        })
               .catch();
    }
    
    examenEnregistre() : Promise<boolean>{
        return this.http.get("/ajax/progres")
               .toPromise()
                .then(function(response){
                    return response.json().length != 0;
                })
               .catch();
    }
    
    testerReponse(id_question, id_reponse) : Promise<boolean>{
        return this.http.get("/ajax/questions/"+id_question)
               .toPromise()
                .then(function(response){
                    return response.json() == id_reponse;
                })
               .catch();
    }
    
}