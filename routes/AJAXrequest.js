var express = require('express');
var router = express.Router();

require('../lib/db');

var mongoose = require( 'mongoose' );
var Question = mongoose.model( 'Question' );
var Progres = mongoose.model( 'Progres' );
var Examen = mongoose.model( 'Examen' );
var Rapide = mongoose.model( 'Rapide' );

router.post('/demande_nb_question',function(req,res,next){
    var theme = req.body.theme;
    var nb_question;
    Question.count({domaine : theme}, function(err , count){
      res.send(String(count));
    });
});


router.get('/nouvelle_question_test', function(req, res, next) {
    Question.findOneRandom(function(err, element){
        question = element.question;
        reponses = element.reponses;
        id = element._id;
        res.json({id, question,reponses});
    });
});

router.get('/nouvelle_question_exam_HTML',function(req, res, next) {
    var filtre = { domaine: { $eq: ['html'] } };
    Question.findRandom(filtre, {}, {count: 1},function(err, element){
       question = element[0].question;
        reponses = element[0].reponses;
        id = element[0]._id;
        res.json({id, question,reponses});
    });
});

router.get('/nouvelle_question_exam_CSS',function(req, res, next) {
    var filtre = { domaine: { $eq: ['css'] } };
    Question.findRandom(filtre, {}, {count: 1},function(err, element){
        question = element[0].question;
        reponses = element[0].reponses;
        id = element[0]._id;
        res.json({id, question,reponses});
    });
});

router.get('/nouvelle_question_exam_JS',function(req, res, nextwe32) {
    var filtre = { domaine: { $eq: ['javascript'] } };
    Question.findRandom(filtre, {}, {count: 1},function(err, element){
        question = element[0].question;
        reponses = element[0].reponses;
        id = element[0]._id;
        res.json({id, question,reponses});
    });
});



router.post('/questions',function(req,res,next){
    if (req.body.bonne_reponse <= 0 || req.body.bonne_reponse > req.body.reponses.length || req.body.reponses.length < 2 || req.body.question==""){
        res.status(400).send("Saisie de la nouvelle question invalide");
    }else{
        var question = new Question({
            domaine : req.body.domaine,
            question : req.body.question,
            reponses : req.body.reponses,
            bonne_reponse : req.body.bonne_reponse
        });
        Question.count({}, function(err , count){
            question._id = count+1;
            question.save( function( err, question, count ){
                 res.send(question); 
            });
        });
    }
});

router.get('/questions/:id',function(req,res,next){
    id = req.params.id;
    Question.find({ _id: { $eq: id } }, function (err, question) {
        bonne_reponse = question[0].bonne_reponse;
        res.json(bonne_reponse);
    });
});

router.delete('/questions',function(req,res,next){
    Question.remove({},function(err) {
            if (err) {
                console.log(err);
            } else {
                res.send('success');
            }
    });
});

router.post('/statistique/examen',function(req,res,next){
        var examen = new Examen({
            domaine : req.body.theme,
            bonne_reponse : req.body.nb_bonne_rep,
            totale_reponse : req.body.nb_reponse
        });
    Examen.count({}, function(err , count){
            examen._id = count+1;
            examen.save( function(err){
                if (err)
                return next(err);
            });
        });
});

router.get('/statistique/examen',function(req,res,next){
         Examen.find(function(err, examens) {
            if (err) {
                res.send(err);
            }
            res.json(examens);
        });
});

router.delete('/statistique/examen',function(req,res,next){
         Examen.remove({},function(err) {
            if (err) {
                console.log(err);
            } else {
                res.send('success');
            }
        });
});

router.post('/statistique/rapide',function(req,res,next){
        var rapide = new Rapide({
            _id : 1,
            nb_reussie : 0,
            nb_totale : 0
        });

    if (req.body.type == "nb_reussie") {
        Rapide.findOneAndUpdate({_id:1}, { $inc: { nb_reussie: 1, nb_totale: 1}}, {new : true, upsert:true}, function(err, res) {
        if (err) { 
            throw err; 
        } 
        });
    } 
    else if (req.body.type == "nb_totale")
        Rapide.findOneAndUpdate({_id:1}, { $inc: { nb_totale: 1 }}, {new:true, upsert:true}, function(err) {
        if (err) { 
            return next(err); 
        } 
        });
});

router.get('/statistique/rapide',function(req,res,next){
         Rapide.find(function(err, rapides) {
            if (err) {
                res.send(err);
            } else {
                res.json(rapides);
            }             
        });
});

router.delete('/statistique/rapide',function(req,res,next){
         Rapide.remove({},function(err) {
            if (err) {
                console.log(err);
            } else {
                res.send('success');
            }
        });
});

router.post('/progres',function(req,res,next){
        var progres = new Progres({
            _id : 1,
            nb_reussie : req.body.nb_reussie,
            nb_repondue : req.body.nb_repondue,
            nb_totale : req.body.nb_totale,
            domaine : req.body.domaine
        });
            Progres.findOneAndUpdate({_id:1}, {nb_reussie:req.body.nb_reussie, nb_repondue:req.body.nb_repondue, nb_totale:req.body.nb_totale, domaine:req.body.domaine}, {new:true, upsert:true}, function(err){
                if (err) {
                    return next(err);
                } else {
                res.send('success');
                }
            });
});

router.delete('/progres',function(req,res,next){
         Progres.remove({},function(err) {
            if (err) {
                console.log(err);
            } else {
                res.send('success');
            }
        });
});

router.get('/progres',function(req,res,next){
         Progres.find(function(err, progres) {
            if (err) {
                res.send(err);
            } else {
                res.json(progres);
            }             
        });
});




module.exports = router;