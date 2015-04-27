/**
 * Created by Pedro Faria on 27-04-2015.
 */

var Student = require('../models/user');
var fs = require('fs'),
    xml2js = require('xml2js'),
    eyes = require('eyes');

// POST student //
module.exports.create = function(req, res) {
    console.log(req.body);
    var student = new Student();
    student.username = req.body.username;
    student.password = req.body.password;
    student.email 	 = req.body.email;
    student.save(function(err, result){
        if(err)
            res.send(err);
        res.json("Student Created");
    });
}

//nao retorna?? mas encontra
// GET student //
module.exports.list = function(req, res) {
    /*Student.find(function(err, result){
        if(err)
            res.send(err);
        res.json(result);
    });*/

    console.log('enter get');
    var parser = new xml2js.Parser();

    parser.on('end', function(result) {
        eyes.inspect(result);
        res.write(JSON.stringify(result));
        console.log('Done');
    });

    fs.readFile('./xml/users.xml', function(err, data) {
        parser.parseString(data);
    });
}

// DELETE student:id //
module.exports.delete = function(req, res) {
    Student.remove({_id: req.params.id}, function(err, result){
        if(err)
            res.send(err);
        res.json("Student Removed");
    });
}

// PUT student:id //
module.exports.update = function(req, res) {
    Student.update({_id: req.params.id}, {$set: {name: req.body.name}}, function(err, result){
        if(err)
            res.send(err);
        res.json("Student Updated");
    });
}

// GET student:id //
module.exports.get = function(req, res){
     /*Student.findById(req.params.id, function(err, result){
        if(err)
            res.send(err);
         res.json(result);
     });*/
    console.log('enter get');
    var parser = new xml2js.Parser();

    parser.on('end', function(result) {
        eyes.inspect(result);
        res.write(JSON.stringify(result));
        console.log('Done');
    });

    fs.readFile('./xml/users.xml', function(err, data) {
        parser.parseString(data);
    });
}

// GET /seach/student/username/:username //
module.exports.getUserByUsername = function(req, res){
    Student.find({username: req.params.username}, function(err, result){
        if(err)
            res.send(err);
        res.json(result);
    });
}

// GET /seach/student/name/:name //
module.exports.getUserByName = function(req, res){
    Student.find({name: req.params.name}, function(err, result){
        if(err)
            res.send(err);
        res.json(result);
    });
}

// GET /seach/student/skill/:skill //
module.exports.getUserBySkill = function(req, res){
    Student.find({skills: { $in: [req.params.skill]}}, function(err, result){
        if(err)
            res.send(err);
        res.json(result);
    });
}