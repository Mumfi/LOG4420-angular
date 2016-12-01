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
var TableauComponent = (function () {
    function TableauComponent(quizService) {
        this.quizService = quizService;
        this.continuerProgres = new core_1.EventEmitter();
        this.examens = [];
    }
    TableauComponent.prototype.ngOnInit = function () {
        this.nb_question = 1;
        this.theme = "html";
        this.ExamenEnregistre = false;
        this.indication = "Pour commencer un examen, veuillez remplir le formulaire ci-dessous :";
        this.TestExamenEnregistre();
        this.get_Nb_Reponse_Possible(this.theme);
        this.mise_A_Jour_Boite_Modale();
    };
    TableauComponent.prototype.demarrerRapide = function () {
        this.quizService.setNoteActuelle(0);
    };
    TableauComponent.prototype.demarrerExamen = function () {
        this.quizService.setNoteActuelle(0);
        this.quizService.setNumQuestion(1);
        this.quizService.setNbQuestionRepondue(0);
        this.quizService.setNbQuestion(this.nb_question);
        this.quizService.setTheme(this.theme);
    };
    TableauComponent.prototype.update = function (value) {
        this.theme = value;
        this.get_Nb_Reponse_Possible(this.theme);
    };
    TableauComponent.prototype.supprimerExamEnCours = function (event) {
        event.preventDefault();
        this.quizService.deleteProgres();
        this.ExamenEnregistre = false;
        this.indication = "Pour commencer un examen, veuillez remplir le formulaire ci-dessous :";
    };
    TableauComponent.prototype.memoireEffacee = function () {
        this.mise_A_Jour_Boite_Modale();
    };
    TableauComponent.prototype.displayNewExam = function () {
        if (this.ExamenEnregistre) {
            return "none";
        }
        else {
            return "inline";
        }
    };
    TableauComponent.prototype.displayOldExam = function () {
        if (this.ExamenEnregistre) {
            return "inline";
        }
        else {
            return "none";
        }
    };
    TableauComponent.prototype.get_Nb_Reponse_Possible = function (theme) {
        this.nb_question_max = this.quizService.get_Nb_Reponse_Possible(theme);
    };
    TableauComponent.prototype.TestExamenEnregistre = function () {
        var _this = this;
        this.quizService.examenEnregistre().then(function (bool) {
            if (bool) {
                _this.ExamenEnregistre = true;
                _this.quizService.continuerProgres();
                _this.indication = "Un examen a été sauvegardé, veuillez choisir une des options suivantes :";
            }
            else {
                _this.indication = "Pour commencer un examen, veuillez remplir le formulaire ci-dessous :";
            }
        });
    };
    TableauComponent.prototype.mise_A_Jour_Boite_Modale = function () {
        var _this = this;
        this.quizService.getExamensFinis().then(function (exams) {
            _this.examens = exams;
            if (_this.examens.length == 0) {
                _this.texte = "Rien à montrer. Bonne chance!";
            }
            else {
                _this.texte = "";
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TableauComponent.prototype, "continuerProgres", void 0);
    TableauComponent = __decorate([
        core_1.Component({
            selector: 'tableau_de_bord',
            templateUrl: '/templates/tableau_de_bord',
            providers: [quiz_service_1.QuizService]
        }), 
        __metadata('design:paramtypes', [quiz_service_1.QuizService])
    ], TableauComponent);
    return TableauComponent;
}());
exports.TableauComponent = TableauComponent;
//# sourceMappingURL=tableau-de-bord.component.js.map