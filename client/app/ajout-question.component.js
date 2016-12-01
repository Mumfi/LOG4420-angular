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
var quiz_service_1 = require('./quiz.service');
var question_1 = require("./question");
var AjoutQuestionComponent = (function () {
    function AjoutQuestionComponent(quizService) {
        this.quizService = quizService;
        this.afficherReponse = false;
        this.reponses = [];
        this.retour = new question_1.Question();
    }
    AjoutQuestionComponent.prototype.ngOnInit = function () {
        this.nb_reponse = 2;
        this.reponses.length = 2;
    };
    AjoutQuestionComponent.prototype.update = function (nb) {
        this.nb_reponse = nb;
        this.reponses.length = nb;
    };
    AjoutQuestionComponent.prototype.envoyerQuestion = function (event) {
        var _this = this;
        event.preventDefault();
        for (var i = 0; i < this.reponses.length; i++) {
            this.reponses[i] = event.target.reponses[i].value;
        }
        var donnees = { domaine: event.target.domaine.value,
            question: event.target.question.value,
            reponses: this.reponses,
            bonne_reponse: event.target.bonne_reponse.value
        };
        this.quizService.envoiQuestion(donnees).then(function (rep) { return _this.retour = rep; });
        this.afficherReponse = true;
    };
    AjoutQuestionComponent.prototype.RAZ = function (event) {
        var _this = this;
        event.preventDefault();
        this.quizService.EffacerQuestions().then(function (mess) { return _this.messageRAZ = mess; });
    };
    AjoutQuestionComponent.prototype.displayReponse = function () {
        if (this.afficherReponse) {
            return "block";
        }
        else {
            return "none";
        }
    };
    AjoutQuestionComponent.prototype.displayForm = function () {
        if (this.afficherReponse) {
            return "none";
        }
        else {
            return "block";
        }
    };
    AjoutQuestionComponent = __decorate([
        core_1.Component({
            selector: 'ajout de question',
            templateUrl: '/templates/ajouter_question',
            providers: [quiz_service_1.QuizService]
        }), 
        __metadata('design:paramtypes', [quiz_service_1.QuizService])
    ], AjoutQuestionComponent);
    return AjoutQuestionComponent;
}());
exports.AjoutQuestionComponent = AjoutQuestionComponent;
//# sourceMappingURL=ajout-question.component.js.map