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
var StatComponent = (function () {
    function StatComponent(quizService, _router) {
        this.quizService = quizService;
        this._router = _router;
        this.memoireEffacee = new core_1.EventEmitter();
        this.router = _router;
    }
    StatComponent.prototype.ngOnInit = function () {
        this.calculMoyenne();
        this.MiseAJourStatistiqueRapide();
    };
    StatComponent.prototype.ngOnChanges = function () {
        this.MiseAJourStatistiqueRapide();
    };
    StatComponent.prototype.EffacerStat = function (event) {
        event.preventDefault();
        this.quizService.deleteExamens();
        this.quizService.deleteRapides();
        this.calculMoyenne();
        this.MiseAJourStatistiqueRapide();
        this.memoireEffacee.emit(true);
    };
    StatComponent.prototype.mise_A_Jour_Stat = function () {
        if (this.moyenne == null) {
            this.moyenne_exam = "-";
        }
        else {
            this.moyenne_exam = this.moyenne + "%";
        }
        if (this.moyenneHTML == null) {
            this.moyenne_HTML = "-";
        }
        else {
            this.moyenne_HTML = this.moyenneHTML + "%";
        }
        if (this.moyenneCSS == null) {
            this.moyenne_CSS = "-";
        }
        else {
            this.moyenne_CSS = this.moyenneCSS + "%";
        }
        if (this.moyenneJS == null) {
            this.moyenne_JS = "-";
        }
        else {
            this.moyenne_JS = this.moyenneJS + "%";
        }
    };
    StatComponent.prototype.calculMoyenne = function () {
        var _this = this;
        this.moyenne = 0;
        var isExam = false;
        this.moyenneHTML = 0;
        var nbHTML = 0;
        var isExamHTML = false;
        this.moyenneCSS = 0;
        var nbCSS = 0;
        var isExamCSS = false;
        this.moyenneJS = 0;
        var nbJS = 0;
        var isExamJS = false;
        this.quizService.getExamensFinis().then(function (exams) {
            exams.forEach(function (exam) {
                isExam = true;
                _this.moyenne = Number(_this.moyenne) + (Number(exam.bonne_reponse) / Number(exam.totale_reponse) * 100);
                if (exam.domaine == "html") {
                    isExamHTML = true;
                    _this.moyenneHTML = Number(_this.moyenneHTML) + (Number(exam.bonne_reponse) / Number(exam.totale_reponse) * 100);
                    nbHTML++;
                }
                if (exam.domaine == "css") {
                    isExamCSS = true;
                    _this.moyenneCSS = Number(_this.moyenneCSS) + (Number(exam.bonne_reponse) / Number(exam.totale_reponse) * 100);
                    nbCSS++;
                }
                if (exam.domaine == "javascript") {
                    isExamJS = true;
                    _this.moyenneJS = Number(_this.moyenneJS) + (Number(exam.bonne_reponse) / Number(exam.totale_reponse) * 100);
                    nbJS++;
                }
            });
            _this.moyenne = Math.floor(_this.moyenne / (nbHTML + nbCSS + nbJS));
            _this.moyenneHTML = Math.floor(_this.moyenneHTML / nbHTML);
            _this.moyenneCSS = Math.floor(_this.moyenneCSS / nbCSS);
            _this.moyenneJS = Math.floor(_this.moyenneJS / nbJS);
            if (!isExam) {
                _this.moyenne = null;
            }
            if (!isExamHTML) {
                _this.moyenneHTML = null;
            }
            if (!isExamCSS) {
                _this.moyenneCSS = null;
            }
            if (!isExamJS) {
                _this.moyenneJS = null;
            }
            _this.mise_A_Jour_Stat();
        });
    };
    StatComponent.prototype.MiseAJourStatistiqueRapide = function () {
        var _this = this;
        this.quizService.getStatistiqueRapide()
            .then(function (stat) {
            if (stat[0] == null) {
                _this.moyenne_test_rapide = "-";
            }
            else {
                if (stat[0].nb_reussie == null) {
                    _this.moyenne_test_rapide = "0 / " + stat[0].nb_totale;
                }
                else {
                    _this.moyenne_test_rapide = stat[0].nb_reussie + " / " + stat[0].nb_totale;
                }
            }
        });
    };
    StatComponent.prototype.displayDelete = function () {
        if (this.router.url == "/tableau_de_bord") {
            return "inline";
        }
        else {
            return "none";
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StatComponent.prototype, "memoireEffacee", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StatComponent.prototype, "questionRep", void 0);
    StatComponent = __decorate([
        core_1.Component({
            selector: 'stat',
            templateUrl: '/templates/extensionStat',
            providers: [quiz_service_1.QuizService]
        }), 
        __metadata('design:paramtypes', [quiz_service_1.QuizService, router_1.Router])
    ], StatComponent);
    return StatComponent;
}());
exports.StatComponent = StatComponent;
//# sourceMappingURL=stat.component.js.map