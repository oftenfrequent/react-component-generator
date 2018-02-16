#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var reducerGenerator = require('./generated/reducerGenerator');
var reducerSpecGenerator = require('./generated/reducerSpecGenerator');

var {
  createPropStrings,
  createStatePropStrings,
  createSpecPropString,
} = require('./helpers');


// arguments in call
var relevantArguments = process.argv.splice(2, process.argv.length);
var fileType = relevantArguments.splice(0, 1).join('');
var fullFileLocation = relevantArguments.splice(0, 1).join('');

// create arrays for propTypes and state
var properties = relevantArguments;
var stateProps = [];

// check for state properties
var statePosition = relevantArguments.indexOf('--s' || '--state');
if (statePosition > -1) {
  properties = relevantArguments.splice(0, statePosition);
  stateProps = relevantArguments.splice(1, relevantArguments.length - 1);
}

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

    var props = createPropStrings(properties);
    var propsSpec = createSpecPropString(properties);
    var state = createStatePropStrings(stateProps);

    var result = data.replace(/PROP_TYPES/g, props);
    result = result.replace(/PROP_SPEC_TYPES/g, propsSpec);
    result = result.replace(/STATE_VARIABLES/g, state);
    result = result.replace(/COMPONENT_NAME/g, fileToBeCreatedName);

    // check for Immutable PropType and add if so
    if (result.includes("Immutable")) {
      result = result.replace(/IMMUTABLE\n/g, "import Immutable from 'immutable';\n");
    } else {
      result = result.replace(/IMMUTABLE\n/g, '');
    }

    fs.writeFile(fileLocation, result, 'utf8', function (err) {
      if (err) return console.log(err);
      else console.log(fileType + ' created');
    });
  });
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
      template = path.resolve(__dirname, './generated/componentSpecDefault.js')
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

