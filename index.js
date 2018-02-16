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

// TODO: move inside of main script
// create arrays for propTypes and state
var properties = relevantArguments;
var stateProps = [];

// check for state properties
var statePosition = relevantArguments.indexOf('--s' || '--state');
if (statePosition > -1) {
  properties = relevantArguments.splice(0, statePosition);
  stateProps = relevantArguments.splice(1, relevantArguments.length - 1);
}


(function (){
  // args for functions
  var directoryNameLocation = fullFileLocation.substr(0, fullFileLocation.lastIndexOf('/'));
  var fileToBeCreatedName = fullFileLocation.substr(fullFileLocation.lastIndexOf('/') + 1, fullFileLocation.length);
  var directoryLocation = path.resolve(process.cwd(), directoryNameLocation);


  var filesToBeCreatedArray = BuildArrayForGeneratedFiles(directoryLocation, fileToBeCreatedName);


  // TODO: split into component and reducer generator

  filesToBeCreatedArray.map(function(fileToBuild){
    CheckIfSomethingExists(directoryLocation,
      function() { CreateDirectory(directoryLocation, fileToBuild.fileLocation, fileToBuild.template, fileToBeCreatedName) },
      function() { DirectoryExistsThen(fileToBuild.fileLocation, fileToBuild.template, fileToBeCreatedName) }
    )
  });
}
)()



function CheckIfSomethingExists(directoryOrFile, ifNotThenCreate, ifSoCallback) {
  fs.exists(directoryOrFile, function (exists) {
    if(exists) ifSoCallback()
    else ifNotThenCreate()
  })
}

function CreateDirectory(directoryLocation, fileLocation, templateGenerator, fileToBeCreatedName) {
  mkdirp(directoryLocation, function(err){
    if(err) console.log(err)
    else FileCreator(fileLocation, templateGenerator, fileToBeCreatedName)
  })
}

function DirectoryExistsThen(fileLocation, templateGenerator, fileToBeCreatedName) {
  CheckIfSomethingExists(fileLocation, function() { FileCreator(fileLocation, templateGenerator, fileToBeCreatedName) }, function(){
    console.log('This file already exists.');
    ask('Would you like to overwrite the file? (y/n)', /.+/, function(response){
      if (response === 'y') FileCreator(fileLocation, templateGenerator, fileToBeCreatedName)
      else process.exit();
    })
  });
}

function ask(question, format, callback) {
  var stdin = process.stdin;
  var stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ": ");

  stdin.once('data', function(data) {
    data = data.toString().trim();

    if (format.test(data)) {
      callback(data);
    } else {
      stdout.write("It should match: "+ format +"\n");
      ask(question, format, callback);
    }
  });
}

function FileCreator(fileLocation, templateGenerator, fileToBeCreatedName) {
  fs.readFile(templateGenerator, 'utf8', function (err,data) {
    if (err) return console.log(err);

    var props = createPropStrings(properties);
    var propsSpec = createSpecPropString(properties);
    var state = createStatePropStrings(stateProps);

    var result = data.replace(/PROP_TYPES/g, props);
    result = result.replace(/STATE_VARIABLES/g, state);
    result = result.replace(/COMPONENT_NAME/g, fileToBeCreatedName);

    // spec only
    result = result.replace(/PROP_SPEC_TYPES/g, propsSpec);

    // check for Immutable PropType and add if so
    if (result.includes("Immutable")) {
      result = result.replace(/IMMUTABLE\n/g, "import Immutable from 'immutable';\n");
    } else {
      result = result.replace(/IMMUTABLE\n/g, '');
    }

    fs.writeFile(fileLocation, result, 'utf8', function (err) {
      if (err) return console.log(err);
      else console.log(fileType + ' created');
      process.exit();
    });
  });
}


function BuildArrayForGeneratedFiles(directoryLocation, fileToBeCreatedName) {
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
  }
}

