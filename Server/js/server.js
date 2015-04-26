/**
 * Created by Pedro Faria on 26-04-2015.
 */

var http = require('http');
var fs = require('fs');
var xml2js = require('xml2js');
//https://github.com/Leonidas-from-XIV/node-xml2js

//tratar o formato json só para enviar o necessário para a app
/*
    app -> request servidor -> ve se há na movieDB.xml: y-> return json
                                                        n-> request myapifilms -> processar para json -> return json

*/
http.createServer(function(request, response) {
    response.writeHead(200);

    var parser = new xml2js.Parser();
    parser.addListener('end', function(result) {
        console.dir(result);
        JSON.stringify(result);
        console.log('Done.');
        response.write(JSON.stringify(result));
    });
    fs.readFile('../xml/imdb.xml', function(err, data) {
        parser.parseString(data);
    });


}).listen(8080);
console.log('Server running at localhost:8080/');


