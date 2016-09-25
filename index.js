#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var compGenerator = require('./generated/componentGenerator');
var compSpecGenerator = require('./generated/componentSpecGenerator');
var reducerGenerator = require('./generated/reducerGenerator');
var reducerSpecGenerator = require('./generated/reducerSpecGenerator');

var directoryLocation = path.resolve(process.cwd(), process.argv[3])
var itemToBeCreatedName = process.argv[3].split('/').pop();
var pointerArray = BuildArrayForGeneratedFiles();


function MainScript(){
  pointerArray.map(function(fileToBuild){
    CheckIfSomethingExists(directoryLocation,
      function() { CreateDirectory(fileToBuild.fileLocation, fileToBuild.template) },
      function() { DirectoryExistsThen(fileToBuild.fileLocation, fileToBuild.template) }
    )
  });
}

MainScript();

  // TODO: minify files
  // TODO: flag to create a connected component vs dumb component
  // TODO: prompt to create a spec if component or reducer generated
function CheckIfSomethingExists(directoryOrFile, ifNotThenCreate, ifSoCallback) {
  fs.exists(directoryOrFile, function (exists) {
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
  // console.log('directory exists');
  CheckIfSomethingExists(fileLocation, function() { FileCreator(fileLocation, templateGenerator) }, function(){
    console.log('this file already exists');
    console.log('it will not overwrite without a file without the -f?');
    console.log('-------------------------or-------------------------');
    console.log('it will prompt you asking to overwrite this file (y/n)');
  });
}

function FileCreator(fileLocation, templateGenerator) {
  fs.writeFile(fileLocation, templateGenerator(itemToBeCreatedName, process.argv.slice(4)), function(err) {
    if(err) console.log(err)
    else console.log(process.argv[2] + ' created');
  })
}


function BuildArrayForGeneratedFiles() {
  var fileLocation = directoryLocation + '/' + itemToBeCreatedName;
  var template;

  switch (process.argv[2]) {
    case 'component':
      fileLocation += '.jsx';
      template = compGenerator;
      return [{fileLocation, template}];
    case 'componentSpec':
      fileLocation += '.spec.jsx';
      template = compSpecGenerator;
      return [{fileLocation, template}];
    case 'reducer':
      fileLocation += 'Reducer.js';
      template = reducerGenerator;
      return [{fileLocation, template}];
    case 'reducerSpec':
      fileLocation += 'Reducer.spec.js';
      template = reducerSpecGenerator;
      return [{fileLocation, template}];
    case 'all':
      return [
        {
          fileLocation: fileLocation + '.jsx',
          template: compGenerator
        },
        {
          fileLocation: fileLocation + '.spec.jsx',
          template: compSpecGenerator
        },
        {
          fileLocation: fileLocation + 'Reducer.js',
          template: reducerGenerator
        },
        {
          fileLocation: fileLocation + 'Reducer.spec.js',
          template: reducerSpecGenerator
        }
      ];
  }
}