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
var loginQuery = '';
var registerQuery = '';
var addUnseenQuery = '';
var removeUnseenQuery = '';
var addSeenQuery = '';
var updateSeenQuery = '';
var getUnseenQuery = '';
var getSeenQuery = '';

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

//receives movie id
module.exports.addUnseen = function(req, res){

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');

    var queryUrl = '';

    //falta definir query
    if(req.params.id && req.query.movieId ){

        //fazer callback com post para o servidor e responder ok
        queryUrl =  dbUrl + addUnseenQuery + 'id=' + req.params.id + '&movieId=' + req.query.movieId;
    }else{
        res.send({error: "error on /api/user/addUnseen: Wrong parameter. Send (user) id and movieId!"});
    }

    console.log('Request to:' + queryUrl);

    res.send('addUnseen Successful\n' + queryUrl );
};

//receives movie id
module.exports.removeUnseen = function(req, res){

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');

    var queryUrl = '';

    //falta definir query
    if(req.params.id && req.query.movieId ){

        //fazer callback com post para o servidor e responder ok
        queryUrl =  dbUrl + removeUnseenQuery + 'id=' + req.params.id + '&movieId=' + req.query.movieId;
    }else{
        res.send({error: "error on /api/user/removeUnseen: Wrong parameter. Send (user) id and movieId!"});
    }

    console.log('Request to:' + queryUrl);

    res.send('removeUnseen Successful\n' + queryUrl );

};

//receives id (optional: rating and comment)
module.exports.addSeen = function(req, res){

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');

    var queryUrl = '';

    //falta definir query
    if(req.params.id && req.query.movieId ){

        //fazer callback com post para o servidor e responder ok
        queryUrl =  dbUrl + addSeenQuery + 'id=' + req.params.id + '&movieId=' + req.query.movieId;

        if(req.query.classification){
            queryUrl += '&personalClassification=' + req.query.classification;
        }
        if(req.query.comment){
            queryUrl += '&comment=' + req.query.comment;
        }

    }else{
        res.send({error: "error on /api/user/addSeen: Wrong parameter. Send (user) id and movieId (optional: classification & comment)!"});
    }

    console.log('Request to:' + queryUrl);

    res.send('addSeen Successful\n' + queryUrl );

}

module.exports.updateSeen = function (req, res) {

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');

};

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