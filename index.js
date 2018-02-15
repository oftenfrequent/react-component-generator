#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
// var compGenerator = require('./generated/componentGenerator');
// var compGenerator = require('./generated/componentDefault');
var compSpecGenerator = require('./generated/componentSpecGenerator');
var reducerGenerator = require('./generated/reducerGenerator');
var reducerSpecGenerator = require('./generated/reducerSpecGenerator');

var { createPropStrings } = require('./helpers');


// arguments in call
var relevantArguments = process.argv.splice(2,process.argv.length)
var fileType = relevantArguments.splice(0,1).join('')
var fullFileLocation = relevantArguments.splice(0,1).join('')

// args for functions
var directoryNameLocation = fullFileLocation.substr(0, fullFileLocation.lastIndexOf('/'))
var fileToBeCreatedName = fullFileLocation.substr(fullFileLocation.lastIndexOf('/') + 1, fullFileLocation.length)
var directoryLocation = path.resolve(process.cwd(), directoryNameLocation)
var filesToBeCreatedArray = BuildArrayForGeneratedFiles();


MainScript();

function MainScript(){
  filesToBeCreatedArray.map(function(fileToBuild){
    CheckIfSomethingExists(directoryLocation,
      function() { CreateDirectory(fileToBuild.fileLocation, fileToBuild.template) },
      function() { DirectoryExistsThen(fileToBuild.fileLocation, fileToBuild.template) }
    )
  });
}

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
  CheckIfSomethingExists(fileLocation, function() { FileCreator(fileLocation, templateGenerator) }, function(){
    console.log('this file already exists');
    console.log('it will not overwrite without a file without the -f?');
    console.log('-------------------------or-------------------------');
    console.log('it will prompt you asking to overwrite this file (y/n)');
  });
}

function FileCreator(fileLocation, templateGenerator) {
  fs.readFile(templateGenerator, 'utf8', function (err,data) {
    if (err) return console.log(err);

    var props = createPropStrings(relevantArguments)

    var result = data.replace(/PROP_TYPES/g, props);
    result = result.replace(/COMPONENT_NAME/g, fileToBeCreatedName);

    fs.writeFile(fileLocation, result, 'utf8', function (err) {
      if (err) return console.log(err);
      else console.log(fileType + ' created');
    });
  });


  // fs.writeFile(fileLocation, templateGenerator(fileToBeCreatedName, relevantArguments), function(err) {
  //   if(err) console.log(err)
  //   else console.log(fileType + ' created');
  // })
}


function BuildArrayForGeneratedFiles() {
  var fileLocation = directoryLocation + '/' + fileToBeCreatedName;
  var template;

  switch (fileType) {
    case 'component':
      fileLocation += '.js';
      template = path.resolve(__dirname, './generated/componentDefault.js')
      return [{fileLocation, template}];
    case 'componentSpec':
      fileLocation += '.spec.js';
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
          fileLocation: fileLocation + '.js',
          template: compGenerator
        },
        {
          fileLocation: fileLocation + '.spec.js',
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

