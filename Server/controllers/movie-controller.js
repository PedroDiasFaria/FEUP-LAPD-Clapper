/**
 * Created by Pedro Faria on 27-04-2015.
 */

var fs = require('fs'),
    xml2js = require('xml2js'),
    eyes = require('eyes'),
    http = require('http'),
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
    request = require('request');

var dbUrl = 'http://localhost:8080/exist/rest/db/existdb/';
var countReq = 0;
var existUsername = 'admin';
var existPassword = '';

var movieIdQuery = 'getMovieById.xq?id=';
//mudar parametro name para title no frontend!
var movieTitleQuery = 'getMovieByTitle.xq?title=';
var movieGenreQuery = 'getMovieByGenre.xq?genre=';


//TODO resposta das query de varios filmes, que responda cada <movie></movie> separado, e nao num array

//https://gist.github.com/klovadis/2549131
//samwize.com/2013/09/01/how-you-can-pass-a-variable-into-callback-function-in-node-dot-js/
/*
function xmlSearch(dbUrl, callback) {

    var parser = new xml2js.Parser();

    //var xhr = new XMLHttpRequest();

        parser.on('end', function (result) {
            //eyes.inspect(result);

            console.log('Done');
            callback(JSON.stringify(result));
        });

    console.log('Sending request to:  ' + dbUrl);

    //por handler de erro
    //retorna null porque? xmlhttprequest?

    http.get(dbUrl,  function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log('Response was: ' + str);
            parser.parseString(str);
        });
    }).auth(existUsername, existPassword, true);
 };
    /*
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState==4 && xhr.status==200)
        {
            document.getElementById("myDiv").innerHTML=xhr.responseText;
            parser.parseString(xhr.responseText);
        }
    }

    xhr.open("GET",dbUrl, true);
    xhr.send();*/

    //em vez de read file, fazer request ao existdb
        /*fs.readFile(dbUrl, function (err, data) {
            parser.parseString(data);
        });*/


/*
module.exports.list = function (req, res) {
    //req.query.varName // separar os dif requests.
    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');

    console.log('id=' + req.query.id);
    console.log('name=' + req.query.name);

    var queryUrl = url;
    if(req.query.id){
        queryUrl += 'getMovieById.xq?id=' + req.query.id;
    }else
        if(req.query.name){
            queryUrl += 'getMovieByTitle.xq?title=' + req.query.name;
        }


    xmlSearch(queryUrl, function(xml){
        console.log('AFTER XMLSEARCH - returning');
        console.log(xml);
        res.writeHead(200,{"Content-Type": "text/plain"});
        res.end(xml);
        //res.json(xml);
    });


};*/

//List all movies with parameter
module.exports.list = function(req, res) {

    //parametros a aceitar: genero, nome, atores

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');

    console.log('title=' + req.query.title);
    console.log('genre='+ req.query.genre);
    console.log('actor='+ req.query.actor);

    var queryUrl = '';

    if(req.query.genre){
        queryUrl = dbUrl + movieGenreQuery + req.query.genre;
    }else
    if(req.query.title){
        queryUrl = dbUrl + movieTitleQuery + req.query.title;
    }else{
        res.send({error: "error on /api/movie/list: Wrong parameter. Search by title/genre/actor/director only!"});
    }

    console.log('Request to:' + queryUrl);
    //caso nao encontre, request online, fazer post na bd e retornar esse filme
    request.get({url:queryUrl},  function (error, response, body) {
        if(response.statusCode == 200 && body != ""){
            xml2js.parseString(body, {explicitArray: false}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if(!result.status) {
                        console.log(result);
                        res.send(result);
                    }else{

                        console.log(result);
                        res.send(result);

                        /*
                        caso nao encontre na bd. fazer funçao para procurar na myapifilms
                        //isto só para procura com titulo!
                        var url = 'http://www.myapifilms.com/imdb?' + 'title' + '=' + req.query.name + '&format=XML';

                        console.log('Request to: ' + url);*/
                    }
                }
            });
        } else {

            console.log('error: '+ response.statusCode);
            console.log(body);
            res.send({error: "This movie doesn't exist!"});

        }
    }).auth(existUsername, existPassword, true);
};

//Get movie by id
module.exports.get = function(req, res) {

    console.log('ReqNr: ' + (++countReq));
    console.log('Request: ' + req.path + ' with params: ');
    console.log('id=' + req.params.id);

    var queryUrl = '';
    if(req.params.id){
        queryUrl = dbUrl + movieIdQuery + req.params.id;
    }else{
        res.send({error: "error on /api/movie/:id: Wrong parameter. Search by ID only!"});
    }

    console.log('Request to:' + queryUrl);
    request.get({url:queryUrl},  function (error, response, body) {
        if(response.statusCode == 200 && body != ""){
            xml2js.parseString(body, {explicitArray: false}, function (err, result) {
                console.log(result);

                if (err) {
                    console.log(err);
                } else {
                    if(!result.status) {
                        console.log(result);
                        res.send(result);
                    }else{
                        console.log(result);
                        res.send(result);
                    }
                }
            });
        } else {
            console.log('error: '+ response.statusCode);
            console.log(body);
            res.send({error: "error on /api/movie/:id: This movie doesn't exist!"});

        }
    }).auth(existUsername, existPassword, true);
};