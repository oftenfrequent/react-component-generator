#!/usr/bin/env node
import path from 'path';
import fs from 'fs';

import { checkIfSomethingExists, createDirectory } from './helpers/fileSystem';
import ask from './helpers/userPrompt';
import {
  createPropStrings,
  createDefaultProps,
  createStatePropStrings,
  createSpecPropString,
} from './helpers/component';

require('babel-core/register');
require('babel-polyfill');

// const component = path.resolve(__dirname, './generated/componentDefault.js')
// const componentSpec = path.resolve(__dirname, './generated/componentSpecDefault.js')

// TODO: add reducer and it's spec
// var reducerGenerator = require('./generated/reducerGenerator');
// var reducerSpecGenerator = require('./generated/reducerSpecGenerator');


(async function () {
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

    // check if a spec
    let testRequested = false;
    // have requested a spec?
    if (fileTypeForGeneration.indexOf('Spec') > -1) {
      // is a spec file
    } else {
      // check if spec requested
      const testPosition = relevantArguments.indexOf('--t' || '--test');
      // console.log('testPosition', testPosition);
      if (testPosition > -1) {
        testRequested = true;
        relevantArguments.splice(testPosition, 1);
      } else {
        const testResponse = await ask('Would you like to create a test? (y/n)');
        testRequested = (testResponse === 'y');
      }
    }

    const arrayOfFilesToBuild = BuildArrayForGeneratedFiles(fileTypeForGeneration, directoryLocation, fileNameToBeCreatedName, testRequested);

    // create arrays for propTypes and state
    let properties = relevantArguments;
    let stateProps = [];

    // check for state properties
    const statePosition = relevantArguments.indexOf('--s' || '--state');
    if (statePosition > -1) {
      properties = relevantArguments.splice(0, statePosition);
      stateProps = relevantArguments.splice(1, relevantArguments.length - 1);
    }

    let produceIndex = 0;

    while (produceIndex < arrayOfFilesToBuild.length) {
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
      produceIndex += 1;
    }

    process.exit();
  } catch (e) {
    console.error('Something went wrong: ', e);
    process.exit();
  }

})();


const FileCreator = async (fileLocation, templateGenerator, fileNameToBeCreatedName, properties, stateProps) => {
  return new Promise(async (res, rej) => {
    await fs.readFile(templateGenerator, 'utf8', (err, data) => {
      if (err) return rej(err);

      // create strings for placing in component
      const props = createPropStrings(properties);
      const defaultProps = createDefaultProps(properties);
      const propsSpec = createSpecPropString(properties);
      const state = createStatePropStrings(stateProps);

      // replace in file
      let result = data.replace(/PROP_TYPES/g, props);
      result = result.replace(/DEFAULT_PROPS/g, defaultProps);
      result = result.replace(/STATE_VARIABLES/g, state);
      result = result.replace(/COMPONENT_NAME/g, fileNameToBeCreatedName);

      // spec only
      result = result.replace(/PROP_SPEC_TYPES/g, propsSpec);

      // check for Immutable PropType and add if so
      if (result.includes('Immutable')) {
        result = result.replace(/IMMUTABLE\n/g, "import Immutable from 'immutable';\n");
      } else {
        result = result.replace(/IMMUTABLE\n/g, '');
      }

      fs.writeFile(fileLocation, result, 'utf8', (error) => {
        if (error) return rej(error);
        else {
          console.log(`${fileLocation} created`);
          res(true);
        }
      });
    });
  });
};

const BuildArrayForGeneratedFiles = (fileType, directoryLocation, fileNameToBeCreatedName, testRequested) => {
  const newfile = `${directoryLocation}/${fileNameToBeCreatedName}`;

  switch (fileType) {
    case 'component':
      const fileArr = [
        {
          fileLocation: `${newfile}.js`,
          template: path.resolve(__dirname, '../generated/componentDefault.js'),
        },
      ];
      if (testRequested) {
        fileArr.push({
          fileLocation: `${newfile}.spec.js`,
          template: path.resolve(__dirname, '../generated/componentSpecDefault.js'),
        });
      }
      return fileArr;
    case 'componentSpec':
      return [
        {
          fileLocation: `${newfile}.spec.js`,
          template: path.resolve(__dirname, '../generated/componentSpecDefault.js'),
        },
      ];
    default :
      return [];
    // case 'reducer':
    //   fileLocation += 'Reducer.js';
    //   template = reducerGenerator;
    //   return [{fileLocation, template}];
    // case 'reducerSpec':
    //   fileLocation += 'Reducer.spec.js';
    //   template = reducerSpecGenerator;
    //   return [{fileLocation, template}];
  }
};
