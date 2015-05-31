/**
 * Created by Pedro Faria on 27-04-2015.
 */

var fs = require('fs'),
    xml2js = require('xml2js'),
    js2xmlparser = require('js2xmlparser'),
    eyes = require('eyes'),
    http = require('http'),
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
    request = require('request');

var dbUrl = 'http://localhost:8080/exist/rest/db/existdb/';
var movieIdQuery = 'getMovieById.xq?id=';
var countReq = 0;
var existUsername = 'admin';
var existPassword = '';

var getUserQuery = 'getUserById.xq?id=';
var addUnseenQuery = 'addMovieToSeeList.xq?id=';
var removeUnseenQuery = 'removeMovieToSeeList.xq?id=';
var addSeenQuery = 'moveToSeenList.xq?id=';
var updateSeenQuery = 'updateSeen.xq?id=';
var getUnseenQuery = 'getUnseen.xq?id=';
var getSeenQuery = 'getSeen.xq?id=';

//todo: em todas as rotas mandar o id do user?
//https://github.com/Acaldas/LAPD/blob/master/server/controllers/movies.js

module.exports.login = function(req, res){

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');

};

module.exports.register = function(req, res){

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');

};

//receives id and movieId - ok - falta update do total
module.exports.addUnseen = function(req, res){

    console.log('ReqNr: ' + (++countReq));
    var queryUrl = '';

    //falta definir query
    if(req.params.id && req.query.movieId ){

        //fazer callback com post para o servidor e responder ok
        queryUrl =  dbUrl + addUnseenQuery + req.params.id + '&movieId=' + req.query.movieId;
    }else{
        res.send({error: "error on /api/user/addUnseen: Wrong parameter. Send (user) id and movieId!"});
    }

    console.log('Request to:' + queryUrl);

    request.post({url:queryUrl},  function (error, response, body) {
        if(response.statusCode == 200 && body != ""){;
            xml2js.parseString(body, {explicitArray: false}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if(result.status) {
                        console.log(result)
                        res.send(result);
                    }
                }
            });
        } else {

            console.log('error: '+ response.statusCode);
            console.log(body);
            res.send({error: "This user doesn't exist!"});

        }
    }).auth(existUsername, existPassword, true);

};

//receives movie id - ok - falta update ao total
module.exports.removeUnseen = function(req, res){

    console.log('ReqNr: ' + (++countReq));
    var queryUrl = '';

    //falta definir query
    if(req.params.id && req.query.movieId ){
        //fazer callback com post para o servidor e responder ok
        queryUrl =  dbUrl + removeUnseenQuery + req.params.id + '&movieId=' + req.query.movieId;
    }else{
        res.send({error: "error on /api/user/removeUnseen: Wrong parameter. Send (user) id and movieId!"});
    }

    console.log('Request to:' + queryUrl);

    request.post({url:queryUrl},  function (error, response, body) {
        if(response.statusCode == 200 && body != ""){;
            xml2js.parseString(body, {explicitArray: false}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if(result.status) {
                        console.log(result)
                        res.send(result);
                    }
                }
            });
        } else {

            console.log('error: '+ response.statusCode);
            console.log(body);
            res.send({error: "This user doesn't exist!"});

        }
    }).auth(existUsername, existPassword, true);

};

//receives id (optional: rating and comment) - falta update ao rating da app do filme
module.exports.addSeen = function(req, res){

    console.log('ReqNr: ' + (++countReq));

    var queryUrl = '';

    //falta definir query
    if(req.params.id && req.query.movieId ){

        //fazer callback com post para o servidor e responder ok
        queryUrl =  dbUrl + addSeenQuery + req.params.id + '&movieId=' + req.query.movieId;

        if(req.query.classification){
            queryUrl += '&classification=' + req.query.classification;
        }
        if(req.query.comment){
            queryUrl += '&comment=' + req.query.comment;
        }

    }else{
        res.send({error: "error on /api/user/addSeen: Wrong parameter. Send (user) id and movieId (optional: classification & comment)!"});
    }

    console.log('Request to:' + queryUrl);


    request.post({url:queryUrl},  function (error, response, body) {
        if(response.statusCode == 200 && body != ""){;
            xml2js.parseString(body, {explicitArray: false}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if(result.status) {
                        console.log(result)
                        res.send(result);
                    }
                }
            });
        } else {

            console.log('error: '+ response.statusCode);
            console.log(body);
            res.send({error: "This user doesn't exist!"});

        }
    }).auth(existUsername, existPassword, true);

}


//receives id (optional: rating and comment) - falta retorno de status informativo
module.exports.updateSeen = function (req, res) {

    console.log('ReqNr: ' + (++countReq));

    var queryUrl = '';

    //falta definir query
    if(req.params.id && req.query.movieId ){

        //fazer callback com post para o servidor e responder ok
        queryUrl =  dbUrl + updateSeenQuery + req.params.id + '&movieId=' + req.query.movieId;

        if(req.query.classification){
            queryUrl += '&classification=' + req.query.classification;
        }
        if(req.query.comment){
            queryUrl += '&comment=' + req.query.comment;
        }

    }else{
        res.send({error: "error on /api/user/addSeen: Wrong parameter. Send (user) id and movieId (optional: classification & comment)!"});
    }

    console.log('Request to:' + queryUrl);


    request.post({url:queryUrl},  function (error, response, body) {
        if(response.statusCode == 200 && body != ""){;
            xml2js.parseString(body, {explicitArray: false}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if(result.status) {
                        console.log(result)
                        res.send(result);
                    }
                }
            });
        } else {

            console.log('error: '+ response.statusCode);
            console.log(body);
            res.send({error: "This user doesn't exist!"});

        }
    }).auth(existUsername, existPassword, true);

};

//receives userId
module.exports.getUnseen = function(req, res){

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ' + req.params.id);

    var queryUrl = '';

    //falta definir query
    if(req.params.id){
        queryUrl =  dbUrl + getUnseenQuery + req.params.id;
    }else{
        res.send({error: "error on /api/user/getUnseen: Wrong parameter. Search by (user) id only!"});
    }

    console.log('Request to:' + queryUrl);

    request.get({url:queryUrl},  function (error, response, body) {
        if(response.statusCode == 200 && body != ""){;
            xml2js.parseString(body, {explicitArray: false}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if(!result.status) {
                        console.log(result)
                        res.send(result);

                    }else{

                        console.log(result.status);
                        res.send(result);
                    }
                }
            });
        } else {

            console.log('error: '+ response.statusCode);
            console.log(body);
            res.send({error: "This user doesn't exist!"});

        }
    }).auth(existUsername, existPassword, true);

};

module.exports.getSeen = function (req, res) {

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');

    var queryUrl = '';

    //falta definir query
    if(req.params.id){
        queryUrl =  dbUrl + getSeenQuery + req.params.id;
    }else{
        res.send({error: "error on /api/user/getSeen: Wrong parameter. Search by (user) id only!"});
    }

    console.log('Request to:' + queryUrl);

    request.get({url:queryUrl},  function (error, response, body) {
        if(response.statusCode == 200 && body != ""){;
            xml2js.parseString(body, {explicitArray: false}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if(!result.status) {
                        console.log(result)
                        res.send(result);

                    }else{

                        console.log(result.status);
                        res.send(result);
                    }
                }
            });
        } else {

            console.log('error: '+ response.statusCode);
            console.log(body);
            res.send({error: "This user doesn't exist!"});
        }
    }).auth(existUsername, existPassword, true);


};