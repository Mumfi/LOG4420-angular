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
var AppComponent = (function () {
    function AppComponent(_router) {
        this._router = _router;
        this.router = _router;
    }
    AppComponent.prototype.colorIndex = function () {
        if (this.router.url == "/index") {
            return "#79cbf1";
        }
        else {
            return "";
        }
    };
    AppComponent.prototype.colorTDB = function () {
        if (this.router.url == "/tableau_de_bord") {
            return "#79cbf1";
        }
        else {
            return "";
        }
    };
    AppComponent.prototype.colorInstruct = function () {
        if (this.router.url == "/instructions") {
            return "#79cbf1";
        }
        else {
            return "";
        }
    };
    AppComponent.prototype.colorQu = function () {
        if (this.router.url == "/ajouter_question") {
            return "#79cbf1";
        }
        else {
            return "";
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'mon-app',
            templateUrl: "templates/layout",
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map