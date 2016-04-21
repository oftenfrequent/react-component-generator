#!/usr/bin/env node
var fs = require('fs');
var ncp = require('ncp').ncp;
var path = require('path');
var compGenerator = require('./generated/componentGenerator');
var reducerGenerator = require('./generated/reducerGenerator');
var reducerSpecGenerator = require('./generated/reducerSpecGenerator');

switch (process.argv[2]) {
	case 'component':
		var currentCompLocation = process.cwd() + '/' + process.argv[3] + '.jsx';
		fs.writeFile(currentCompLocation, compGenerator(process.argv[3], process.argv.slice(4)), function(err) {
			if(err) return console.log(err);
			else console.log('component created');
		});
		return;
	case 'reducer':
		var currentReducerLocation = process.cwd() + '/' + process.argv[3] + 'Reducer.js';
		fs.writeFile(currentReducerLocation, reducerGenerator(process.argv.slice(4)), function(err){
			if(err) return console.log(err);
			else console.log('reducer created');
		});
	case 'reducerSpec':
		var currentReducerSpecLocation = process.cwd() + '/' + process.argv[3] + 'Reducer.spec.js';
		fs.writeFile(currentReducerSpecLocation, reducerSpecGenerator(process.argv[3], process.argv.slice(4)), function (err) {
			if(err) return console.log(err);
			else console.log('reducer spec created - get testing!');
		})
}