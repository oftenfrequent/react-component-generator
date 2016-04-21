#!/usr/bin/env node
var fs = require('fs');
var ncp = require('ncp').ncp;
var path = require('path');
var compGenerator = require('./generated/componentGenerator');
var reducerGenerator = require('./generated/reducerGenerator');

// file paths

// create new files
// ncp.limit = 16;
// ncp(componentFilePath, currentLocation, function (err) {
// 	if (err) {
// 		return console.error(err);
// 	}
// 	console.log('done!');
// });

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
}



// if(process.argv[2] === 'reducer') {
// 	fs.writeFile(currentReducerLocation, reducerGenerator(process.argv.slice(4)), function(err){
// 		if(err) return console.log(err);
// 		else console.log('reducer created');
// 	});
// } else {
// 	fs.writeFile(currentCompLocation, compGenerator(process.argv[2], process.argv.slice(3)), function(err) {
// 		if(err) return console.log(err);
// 		else console.log('component created');
// 	});

// }