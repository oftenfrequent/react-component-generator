#!/usr/bin/env node
var fs = require('fs');
var ncp = require('ncp').ncp;
var path = require('path');
var mkdirp = require('mkdirp');
var compGenerator = require('./generated/componentGenerator');
var compSpecGenerator = require('./generated/componentSpecGenerator');
var reducerGenerator = require('./generated/reducerGenerator');
var reducerSpecGenerator = require('./generated/reducerSpecGenerator');

var directoryLocation = path.resolve(process.cwd(), process.argv[3])
var pointerArray = BuildPointers();
console.log('PIINTER ARR', pointerArray)
var fileLocation = pointerArray[0];
var templateGenerator = pointerArray[1];

function MainScript(){
  CheckIfDirectoryExists(directoryLocation, CreateDirectory, function(){
    console.log('directory exists');
    CheckIfFileExists(fileLocation, FileCreator, function(){
      console.log('this file already exists');
      console.log('it will not overwrite without a file without the -f?');
      console.log('-------------------------or-------------------------');
      console.log('it will prompt you asking to overwrite this file (y/n');
    })
  })
}

MainScript();

  // TODO: should create both a file type and its spec
function CheckIfDirectoryExists(thing, ifNotThenCreate, ifSoCallback) {
  fs.exists(thing, function (exists) {
    if(exists) ifSoCallback()
    else ifNotThenCreate()
  })
}

function CheckIfFileExists(thing, ifNotThenCreate, ifSoCallback) {
  fs.exists(thing, function (exists) {
    if(exists) ifSoCallback()
    else ifNotThenCreate()
  })
}


function CreateDirectory() {
  mkdirp(directoryLocation, function(err){
    if(err) console.log(err)
    else FileCreator()
  })
}

function FileCreator() {
  fs.writeFile(fileLocation, templateGenerator(process.argv[4], process.argv.slice(5)), function(err) {
    if(err) console.log(err)
    else console.log(process.argv[2] + ' created');
  })
}


function BuildPointers() {
  console.log('BUILDING')
  var file = directoryLocation + '/' + process.argv[4];
  var template;

  switch (process.argv[2]) {
    case 'component':
      file += '.jsx';
      template = compGenerator;
      return [file, template];
    case 'componentSpec':
      file += '.spec.jsx';
      template = compSpecGenerator;
      return [file, template];
  	case 'reducer':
      file += 'Reducer.js';
      template = reducerGenerator;
      return [file, template];
  	case 'reducerSpec':
      file += 'Reducer.spec.js';
      template = reducerSpecGenerator;
      return [file, template];
  }
}