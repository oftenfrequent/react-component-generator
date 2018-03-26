#!/usr/bin/env node
require('babel-core/register');
require('babel-polyfill');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var helpers = require('./helpers/component');
const createPropStrings = helpers.createPropStrings;
const createStatePropStrings = helpers.createStatePropStrings;
const createSpecPropString = helpers.createSpecPropString;
// import {
//   createPropStrings,
//   createStatePropStrings,
//   createSpecPropString,
// } from './helpers/component';

// const component = path.resolve(__dirname, './generated/componentDefault.js')
// const componentSpec = path.resolve(__dirname, './generated/componentSpecDefault.js')

// TODO: add reducer and it's spec
// var reducerGenerator = require('./generated/reducerGenerator');
// var reducerSpecGenerator = require('./generated/reducerSpecGenerator');


(async function (){
  try {

    const relevantArguments = process.argv.splice(2, process.argv.length);
    const fileTypeForGeneration = relevantArguments.splice(0, 1).join('');
    const fullFileLocation = relevantArguments.splice(0, 1).join('');

    // args for functions
    const directoryNameLocation = fullFileLocation.substr(0, fullFileLocation.lastIndexOf('/'));
    const fileNameToBeCreatedName = fullFileLocation.substr(fullFileLocation.lastIndexOf('/') + 1, fullFileLocation.length);
    const directoryLocation = path.resolve(process.cwd(), directoryNameLocation);

    // create location
    const directoryExists = await checkIfSomethingExists(directoryLocation);
    if (!directoryExists) await createDirectory(directoryLocation);


    let arrayOfFilesToBuild;
    let testRequested = false;
    // have requested a spec?
    if(fileTypeForGeneration.indexOf('Spec') > -1) {
      // is a spec file
    } else {
      // check if spec requested
      const testPosition = relevantArguments.indexOf('--t' || '--test');
      if (testPosition > -1) {
        testRequested = true;
        relevantArguments.splice(testPosition,1);
      } else {
        const testResponse = await ask('Would you like to create a test? (y/n)')
        testRequested = testResponse === 'y' ? true : false;
      }
    }

    arrayOfFilesToBuild = BuildArrayForGeneratedFiles(fileTypeForGeneration, directoryLocation, fileNameToBeCreatedName, testRequested);

    // create arrays for propTypes and state
    var properties = relevantArguments;
    var stateProps = [];

    // check for state properties
    var statePosition = relevantArguments.indexOf('--s' || '--state');
    if (statePosition > -1) {
      properties = relevantArguments.splice(0, statePosition);
      stateProps = relevantArguments.splice(1, relevantArguments.length - 1);
    }

    console.log('properties', properties)
    console.log('stateProps', stateProps)
    let produceIndex = 0;

    while(produceIndex < arrayOfFilesToBuild.length) {
      const toBeBuilt = arrayOfFilesToBuild[produceIndex];

      const fileExists = await checkIfSomethingExists(toBeBuilt.fileLocation);
      let fileResponse = false;
      if (fileExists) {
        console.log(`${toBeBuilt.fileLocation} already exists.`);
        fileResponse = await ask('Would you like to overwrite the file? (y/n)');
      }

      if (!fileExists || (fileResponse && fileResponse === 'y')) {
        await FileCreator(toBeBuilt.fileLocation, toBeBuilt.template, fileNameToBeCreatedName, properties, stateProps)
      }
      produceIndex++;
    }

    // process.exit();
  } catch (e) {
    console.error('Something went wrong: ', e)
    process.exit();
  }

})();



function checkIfSomethingExists (directoryOrFile) {
  return new Promise((res, rej) => {
    fs.exists(directoryOrFile, function (exists) {
      if(exists) res(true);
      res(false);
    });
  });
}

// const checkIfSomethingExists = directoryOrFile => new Promise((res, rej) => {
//   fs.exists(directoryOrFile, function (exists) {
//     if(exists) res(true);
//     res(false);
//   })
// })

const createDirectory = directoryLocation => new Promise((res, rej) => {
  mkdirp(directoryLocation, function(err){
    if(err) {
      console.log(err)
      rej(err)
    } else res(true)
  })
})

const ask = question => {
  const format = /^(?:y|n)/
  const stdin = process.stdin;
  const stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ": ");

  return new Promise((res, rej) => {
    stdin.once('data', (data) => {
      data = data.toString().trim();

      if (format.test(data)) {
        res(data);
      } else {
        stdout.write("It should match: "+ format +"\n");
        // TODO: not sure about here
        res(ask(question, format));
      }
    });
  });
}

const FileCreator = async (fileLocation, templateGenerator, fileNameToBeCreatedName, properties, stateProps) => {
  await fs.readFile(templateGenerator, 'utf8', function (err,data) {
    if (err) return console.log(err);

    var props = createPropStrings(properties);
    var propsSpec = createSpecPropString(properties);
    var state = createStatePropStrings(stateProps);

    var result = data.replace(/PROP_TYPES/g, props);
    result = result.replace(/STATE_VARIABLES/g, state);
    result = result.replace(/COMPONENT_NAME/g, fileNameToBeCreatedName);

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
      else console.log(fileLocation + ' created');
    });
  });
}


const BuildArrayForGeneratedFiles = (fileType, directoryLocation, fileNameToBeCreatedName, testRequested) => {
  var newfile = directoryLocation + '/' + fileNameToBeCreatedName;

  switch (fileType) {
    case 'component':
      const fileArr = [
        {
          fileLocation: `${newfile}.js`,
          template: path.resolve(__dirname, '../generated/componentDefault.js'),
        }
      ]
      if (testRequested) {
        fileArr.push({
          fileLocation: `${newfile}.spec.js`,
          template: path.resolve(__dirname, '../generated/componentSpecDefault.js'),
        })
      }
      return fileArr;
    case 'componentSpec':
      return [
        {
          fileLocation: `${newfile}.spec.js`,
          template: path.resolve(__dirname, '../generated/componentSpecDefault.js'),
        }
      ]
    // case 'reducer':
    //   fileLocation += 'Reducer.js';
    //   template = reducerGenerator;
    //   return [{fileLocation, template}];
    // case 'reducerSpec':
    //   fileLocation += 'Reducer.spec.js';
    //   template = reducerSpecGenerator;
    //   return [{fileLocation, template}];
  }
}

