import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mon-app',
  templateUrl: "templates/layout",
})

export class AppComponent{
    
    router;
    
    constructor(private _router: Router) { this.router = _router; }
    
    colorIndex(){
        if (this.router.url == "/index"){
            return "#79cbf1";
        }else{
            return "";
        }
    }
    
    colorTDB(){
        if (this.router.url == "/tableau_de_bord"){
            return "#79cbf1";
        }else{
            return "";
        }
        
    }
    
    colorInstruct(){
        if (this.router.url == "/instructions"){
            return "#79cbf1";
        }else{
            return "";
        }
        
    }
    
    colorQu(){
        if (this.router.url == "/ajouter_question"){
            return "#79cbf1";
        }else{
            return "";
        }
        
    }
    
    
}
