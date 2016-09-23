#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var compGenerator = require('./generated/componentGenerator');
var compSpecGenerator = require('./generated/componentSpecGenerator');
var reducerGenerator = require('./generated/reducerGenerator');
var reducerSpecGenerator = require('./generated/reducerSpecGenerator');

var directoryLocation = path.resolve(process.cwd(), process.argv[3])
var pointerArray = BuildPointers();


function MainScript(){
  pointerArray.map(function(fileToBuild){
    var fileLocation = fileToBuild.file;
    var templateGenerator = fileToBuild.template;
    CheckIfDirectoryExists(directoryLocation,
      function() { CreateDirectory(fileLocation, templateGenerator) },
      function() { DirectoryExistsThen(fileLocation, templateGenerator) }
    )
  });
}

MainScript();

  // TODO: flag to create a connected component vs dumb component
  // TODO: prompt to create a spec if component or reducer generated
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


function CreateDirectory(fileLocation, templateGenerator) {
  mkdirp(directoryLocation, function(err){
    if(err) console.log(err)
    else FileCreator(fileLocation, templateGenerator)
  })
}

function DirectoryExistsThen(fileLocation, templateGenerator) {
  console.log('directory exists');
  CheckIfFileExists(fileLocation, function() { FileCreator(fileLocation, templateGenerator) }, function(){
    console.log('this file already exists');
    console.log('it will not overwrite without a file without the -f?');
    console.log('-------------------------or-------------------------');
    console.log('it will prompt you asking to overwrite this file (y/n)');
  });
}

function FileCreator(fileLocation, templateGenerator) {
  fs.writeFile(fileLocation, templateGenerator(process.argv[4], process.argv.slice(5)), function(err) {
    if(err) console.log(err)
    else console.log(process.argv[2] + ' created');
  })
}


function BuildPointers() {
  var file = directoryLocation + '/' + process.argv[4];
  var template;

  switch (process.argv[2]) {
    case 'component':
      file += '.jsx';
      template = compGenerator;
      return [{file, template}];
    case 'componentSpec':
      file += '.spec.jsx';
      template = compSpecGenerator;
      return [{file, template}];
    case 'reducer':
      file += 'Reducer.js';
      template = reducerGenerator;
      return [{file, template}];
    case 'reducerSpec':
      file += 'Reducer.spec.js';
      template = reducerSpecGenerator;
      return [{file, template}];
    case 'all':
      return [
        {
          file: file + '.jsx',
          template: compGenerator
        },
        {
          file: file + '.spec.jsx',
          template: compSpecGenerator
        },
        {
          file: file + 'Reducer.js',
          template: reducerGenerator
        },
        {
          file: file + 'Reducer.spec.js',
          template: reducerSpecGenerator
        }
      ];
  }
}