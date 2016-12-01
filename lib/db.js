var mongoose = require( 'mongoose' );
var random = require('mongoose-simple-random');



var Schema = mongoose.Schema;
var Question = new Schema({
    domaine : String,
    _id : Number,
    question : String,
    reponses : [String],
    bonne_reponse : Number
});

var Examen = new Schema({
    _id : String ,
    domaine : String ,
    bonne_reponse : Number,
    totale_reponse : Number
});

var Rapide = new Schema({
    _id : Number ,
    nb_reussie : Number,
    nb_totale : Number
});

var Progres = new Schema({
    _id : Number ,
    domaine : String,
    nb_reussie : Number,
    nb_repondue : Number, 
    nb_totale : Number
});

Question.plugin(random);
mongoose.model('Question', Question);
mongoose.model('Examen', Examen);
mongoose.model('Rapide', Rapide);
mongoose.model('Progres', Progres);
mongoose.connect( 'mongodb://user:user@ds061506.mlab.com:61506/log4420' );