"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var QuizService = (function () {
    function QuizService(http) {
        this.http = http;
    }
    QuizService.prototype.envoiQuestion = function (donnees) {
        return this.http.post("/ajax/questions", donnees)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch();
    };
    QuizService.prototype.EffacerQuestions = function () {
        return this.http.delete("/ajax/questions")
            .toPromise()
            .then(function (response) {
            return "La base de données à bien été vidée !";
        })
            .catch(function (response) {
            return "Il y a eu une erreur lors de la suppression des questions de la base de données.";
        });
    };
    QuizService.prototype.nouvelleQuestion = function () {
        return this.http.get("/ajax/nouvelle_question_test")
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch();
    };
    QuizService.prototype.nouvelleQuestionHTML = function () {
        return this.http.get("/ajax/nouvelle_question_exam_HTML")
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch();
    };
    QuizService.prototype.nouvelleQuestionCSS = function () {
        return this.http.get("/ajax/nouvelle_question_exam_CSS")
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch();
    };
    QuizService.prototype.nouvelleQuestionJS = function () {
        return this.http.get("/ajax/nouvelle_question_exam_JS")
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch();
    };
    QuizService.prototype.getNoteActuelle = function () {
        return sessionStorage.getItem("note_actuelle");
    };
    QuizService.prototype.getTheme = function () {
        return sessionStorage.getItem("theme");
    };
    QuizService.prototype.getNbQuestion = function () {
        return sessionStorage.getItem("nb_question");
    };
    QuizService.prototype.getNumQuestion = function () {
        return parseInt(sessionStorage.getItem("num_question"));
    };
    QuizService.prototype.getNbQuestionRepondue = function () {
        return parseInt(sessionStorage.getItem("nb_repondue"));
    };
    QuizService.prototype.setTheme = function (theme) {
        sessionStorage.setItem("theme", theme);
    };
    QuizService.prototype.setNbQuestion = function (nb) {
        sessionStorage.setItem("nb_question", nb);
    };
    QuizService.prototype.setNoteActuelle = function (num) {
        sessionStorage.setItem("note_actuelle", num);
    };
    QuizService.prototype.setNumQuestion = function (num) {
        sessionStorage.setItem("num_question", num);
    };
    QuizService.prototype.setNbQuestionRepondue = function (num) {
        sessionStorage.setItem("nb_repondue", num);
    };
    QuizService.prototype.incrementerNoteActuelle = function () {
        var note_actuelle = parseInt(sessionStorage.getItem("note_actuelle")) + 1;
        sessionStorage.setItem("note_actuelle", note_actuelle.toString());
        return note_actuelle;
    };
    QuizService.prototype.abandonExamen = function () {
        sessionStorage.setItem("note_actuelle", "0");
    };
    QuizService.prototype.ajouteExamenFini = function (donnees) {
        this.http.post("/ajax/statistique/examen", donnees)
            .toPromise()
            .then(function (response) {
        })
            .catch();
    };
    QuizService.prototype.getExamensFinis = function () {
        return this.http.get("/ajax/statistique/examen")
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch();
    };
    QuizService.prototype.deleteExamens = function () {
        this.http.delete('/ajax/statistique/examen').toPromise().then(function successCallback(data) {
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    QuizService.prototype.getStatistiqueRapide = function () {
        return this.http.get("/ajax/statistique/rapide")
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch();
    };
    QuizService.prototype.deleteRapides = function () {
        this.http.delete('/ajax/statistique/rapide').toPromise().then(function successCallback(data) {
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    QuizService.prototype.miseAJourQuestionsRapides = function (type) {
        this.http.post("/ajax/statistique/rapide", { 'type': type })
            .toPromise()
            .then(function (response) {
        })
            .catch();
    };
    QuizService.prototype.SauvegardeProgres = function () {
        var nb_reussie = sessionStorage.getItem("note_actuelle");
        var nb_repondue = sessionStorage.getItem("nb_repondue");
        var nb_totale = sessionStorage.getItem("nb_question");
        var domaine = sessionStorage.getItem("theme");
        this.http.post("/ajax/progres", { 'nb_reussie': nb_reussie,
            'nb_repondue': nb_repondue,
            'nb_totale': nb_totale,
            'domaine': domaine })
            .toPromise()
            .then(function (response) {
        })
            .catch();
    };
    QuizService.prototype.continuerProgres = function () {
        this.http.get('/ajax/progres').toPromise().then(function (data) {
            sessionStorage.setItem("note_actuelle", data.json()[0].nb_reussie);
            sessionStorage.setItem("nb_repondue", data.json()[0].nb_repondue);
            sessionStorage.setItem("num_question", data.json()[0].nb_repondue + 1);
            sessionStorage.setItem("nb_question", data.json()[0].nb_totale);
            sessionStorage.setItem("theme", data.json()[0].domaine);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    QuizService.prototype.deleteProgres = function () {
        sessionStorage.setItem("theme", null);
        sessionStorage.setItem("nb_question", "0");
        sessionStorage.setItem("note_actuelle", "0");
        sessionStorage.setItem("nb_repondue", "0");
        this.http.delete('/ajax/progres').toPromise().then(function successCallback(data) {
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    QuizService.prototype.get_Nb_Reponse_Possible = function (theme) {
        return this.http.post("/ajax/demande_nb_question", { "theme": theme })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch();
    };
    QuizService.prototype.examenEnregistre = function () {
        return this.http.get("/ajax/progres")
            .toPromise()
            .then(function (response) {
            return response.json().length != 0;
        })
            .catch();
    };
    QuizService.prototype.testerReponse = function (id_question, id_reponse) {
        return this.http.get("/ajax/questions/" + id_question)
            .toPromise()
            .then(function (response) {
            return response.json() == id_reponse;
        })
            .catch();
    };
    QuizService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuizService);
    return QuizService;
}());
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map