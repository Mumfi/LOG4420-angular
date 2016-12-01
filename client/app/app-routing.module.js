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
var router_1 = require('@angular/router');
var index_component_1 = require('./index.component');
var tableau_de_bord_component_1 = require('./tableau-de-bord.component');
var instruction_component_1 = require('./instruction.component');
var ajout_question_component_1 = require('./ajout-question.component');
var test_rapide_component_1 = require('./test-rapide.component');
var examen_component_1 = require('./examen.component');
var resultat_component_1 = require('./resultat.component');
var routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: index_component_1.IndexComponent },
    { path: 'tableau_de_bord', component: tableau_de_bord_component_1.TableauComponent },
    { path: 'instructions', component: instruction_component_1.InstructionComponent },
    { path: 'ajouter_question', component: ajout_question_component_1.AjoutQuestionComponent },
    { path: 'test_rapide', component: test_rapide_component_1.TestRapideComponent },
    { path: 'examen', component: examen_component_1.ExamenComponent },
    { path: 'resultat', component: resultat_component_1.ResultatComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map