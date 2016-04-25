#!/usr/bin/env node
var fs = require('fs');
var ncp = require('ncp').ncp;
var path = require('path');
var mkdirp = require('mkdirp');
var compGenerator = require('./generated/componentGenerator');
var reducerGenerator = require('./generated/reducerGenerator');
var reducerSpecGenerator = require('./generated/reducerSpecGenerator');

console.log('REL PATH: ', process.argv[3])
var directoryLocation = path.resolve(process.cwd(), process.argv[3])
console.log('RESOLVED PATH: ', directoryLocation )

// TODO: prompt if file does exist continue (y/n)
fs.exists(directoryLocation, function (exists) {
  if(exists) {
    //check if file exists
    FileCreator()
    console.log('does exist')
  } else {
    console.log('does not exist')
    CreateDirectory()
  }
})

function CreateDirectory(err) {
  mkdirp(directoryLocation, function(err){
    if(err) {
      console.log(err)
    }
    else {
      console.log('created directory')
      FileCreator()
    }
  })
}

function FileCreator() {
  console.log('building pointers');
  var file = directoryLocation + '/' + process.argv[4];
  console.log('location', file);

  switch (process.argv[2]) {
  	case 'component':
  		file += '.jsx';
      fs.writeFile(file, compGenerator(process.argv[4], process.argv.slice(5)), function(err) {
        if(err) console.log(err)
        else console.log('component created');
      })
      return;
  	case 'reducer':
      file += 'Reducer.js';
      fs.writeFile(file, reducerGenerator(process.argv[4], process.argv.slice(5)), function(err) {
        if(err) console.log(err)
        else console.log('reducer created');
      })
      return;
  	case 'reducerSpec':
      file += 'Reducer.spec.js';
      fs.writeFile(file, reducerSpecGenerator(process.argv[4], process.argv.slice(5)), function(err) {
        if(err) console.log(err)
        else console.log('reducerSpec created');
      })
      return;
  }

}