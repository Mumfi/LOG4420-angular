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
var router_1 = require('@angular/router');
var question_1 = require("./question");
var TestComponent = (function () {
    function TestComponent(quizService, _router) {
        this.quizService = quizService;
        this._router = _router;
        this.questionRepondue = new core_1.EventEmitter();
        this.aide = true;
        this.couleur = "lightgray";
        this.style = "dotted";
        this.question = new question_1.Question();
        this.progresSauvegarde = false;
        this.router = _router;
    }
    TestComponent.prototype.ngOnInit = function () {
        this.draggable = true;
        this.note_actuelle = this.quizService.getNoteActuelle();
        this.link = this.router.url;
        if (this.router.url == "/examen") {
            this.theme = this.quizService.getTheme();
            this.num_question = this.quizService.getNumQuestion();
            this.nb_repondue = this.quizService.getNbQuestionRepondue();
            this.nb_question = this.quizService.getNbQuestion();
            if (this.num_question == this.nb_question) {
                this.link = "/resultat";
            }
        }
        this.getNouvelleQuestion();
    };
    TestComponent.prototype.getNouvelleQuestion = function () {
        var _this = this;
        this.question = new question_1.Question();
        if (this.router.url == "/test_rapide") {
            this.quizService.nouvelleQuestion().then(function (question) { return _this.question = question; });
        }
        else {
            if (this.theme == "html") {
                this.quizService.nouvelleQuestionHTML().then(function (question) { return _this.question = question; });
            }
            else {
                if (this.theme == "css") {
                    this.quizService.nouvelleQuestionCSS().then(function (question) { return _this.question = question; });
                }
                else {
                    this.quizService.nouvelleQuestionJS().then(function (question) { return _this.question = question; });
                }
            }
        }
    };
    TestComponent.prototype.replacerReponse = function () {
        this.couleur = "lightgray";
        this.style = "dotted";
        this.draggable = true;
        this.aide = true;
    };
    TestComponent.prototype.questionSuivante = function () {
        if (this.router.url == "/examen") {
            if (this.nb_repondue == this.num_question - 1) {
                this.quizService.SauvegardeProgres();
                this.nb_repondue++;
                this.quizService.setNbQuestionRepondue(this.nb_repondue);
            }
            this.num_question++;
            this.quizService.setNumQuestion(this.num_question);
            if (this.num_question == this.nb_question) {
                this.link = "/resultat";
            }
        }
        this.getNouvelleQuestion();
        this.replacerReponse();
    };
    TestComponent.prototype.displayAide = function () {
        if (this.aide) {
            return "block";
        }
        else {
            return "none";
        }
    };
    TestComponent.prototype.onDragStart = function (event) {
        if (this.draggable) {
            this.dragged = event.target;
            event.target.style.opacity = .5;
        }
    };
    TestComponent.prototype.onDragEnd = function (event) {
        event.target.style.opacity = "";
    };
    TestComponent.prototype.onDragOver = function (event) {
        if (this.draggable) {
            event.preventDefault();
        }
    };
    TestComponent.prototype.onDragEnter = function (event) {
        if (this.draggable) {
            if (event.target.className == "dropzone") {
                event.target.style.background = "#e8e8e8";
                this.aide = false;
            }
        }
    };
    TestComponent.prototype.onDragLeave = function (event) {
        if (this.draggable) {
            if (event.target.className == "dropzone") {
                event.target.style.background = "";
            }
        }
    };
    TestComponent.prototype.couleur_reponse = function () {
        return this.couleur;
    };
    TestComponent.prototype.borderStyle = function () {
        return this.style;
    };
    TestComponent.prototype.isDraggable = function () {
        return this.draggable;
    };
    TestComponent.prototype.onDrop = function (event) {
        var _this = this;
        if (this.draggable) {
            event.preventDefault();
            if (event.target.className == "dropzone") {
                event.target.style.background = "";
                this.dragged.parentNode.removeChild(this.dragged);
                event.target.appendChild(this.dragged);
                this.style = "solid";
                this.draggable = false;
                this.quizService.testerReponse(this.question.id, this.dragged.className)
                    .then(function (bonne_reponse) {
                    if (bonne_reponse) {
                        _this.couleur = "#95e66d";
                        _this.note_actuelle++;
                        _this.quizService.setNoteActuelle(_this.note_actuelle);
                        if (_this.router.url == "/test_rapide") {
                            _this.quizService.miseAJourQuestionsRapides("nb_reussie");
                        }
                    }
                    else {
                        _this.couleur = "#f55f2b";
                        if (_this.router.url == "/test_rapide") {
                            _this.quizService.miseAJourQuestionsRapides("nb_totale");
                        }
                    }
                    if (_this.router.url == "/test_rapide") {
                        _this.questionRepondue.emit(true);
                    }
                    else {
                        _this.nb_repondue++;
                        _this.quizService.setNbQuestionRepondue(_this.nb_repondue);
                        _this.quizService.SauvegardeProgres();
                    }
                });
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TestComponent.prototype, "questionRepondue", void 0);
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test',
            templateUrl: '/templates/extensionTests',
            providers: [quiz_service_1.QuizService]
        }), 
        __metadata('design:paramtypes', [quiz_service_1.QuizService, router_1.Router])
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
//# sourceMappingURL=test.component.js.map