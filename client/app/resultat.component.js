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
var ResultatComponent = (function () {
    function ResultatComponent(quizService) {
        this.quizService = quizService;
    }
    ResultatComponent.prototype.ngOnInit = function () {
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
        var info_exam = { theme: this.theme,
            nb_bonne_rep: this.nb_bonne_reponse,
            nb_reponse: this.nb_question
        };
        this.quizService.ajouteExamenFini(info_exam);
        this.quizService.deleteProgres();
    };
    ResultatComponent = __decorate([
        core_1.Component({
            selector: 'Resultat',
            templateUrl: '/templates/resultats',
            providers: [quiz_service_1.QuizService]
        }), 
        __metadata('design:paramtypes', [quiz_service_1.QuizService])
    ], ResultatComponent);
    return ResultatComponent;
}());
exports.ResultatComponent = ResultatComponent;
//# sourceMappingURL=resultat.component.js.map