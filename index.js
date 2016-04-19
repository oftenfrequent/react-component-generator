#!/usr/bin/env node
var fs = require('fs');
var ncp = require('ncp').ncp;
var path = require('path');
var compGenerator = require('./generated/componentGenerator');
var reducerGenerator = require('./generated/reducerGenerator');

// file paths
var currentCompLocation = process.cwd() + '/' + process.argv[2] + '.jsx';
var currentReducerLocation = process.cwd() + '/' + process.argv[3] + 'Reducer.js';

// create new files
// ncp.limit = 16;
// ncp(componentFilePath, currentLocation, function (err) {
// 	if (err) {
// 		return console.error(err);
// 	}
// 	console.log('done!');
// });
if(process.argv[2] === 'reducer') {
	fs.writeFile(currentReducerLocation, reducerGenerator(process.argv.slice(4)), function(err){
		if(err) return console.log(err);
		else console.log('reducer created');
	});
} else {
	fs.writeFile(currentCompLocation, compGenerator(process.argv[2], displayOptions(process.argv.slice(3))), function(err) {
		if(err) return console.log(err);
		else console.log('component created');
	});

}



// generated prop types
function displayOptions(list) {
	var spacing = '    ';
	var propTypeString = '';

	list.map(function(each) {
		var keyValue = each.split(':');
		if (keyValue[1] === 'date' || keyValue[1] === 'moment' ||
				keyValue[1] === 'date!' || keyValue[1] === 'moment!') {
			propTypeString += spacing + keyValue[0] + ': React.PropTypes.instanceOf(';
			propTypeString += isRequired(keyValue[1]) ? keyValue[1].substr(0,keyValue[1].length - 1) + ').isRequired,\n' : keyValue[1] + '),\n';
		} else {
			propTypeString += spacing + keyValue[0] + ': React.PropTypes.';
			propTypeString += isRequired(keyValue[1]) ? keyValue[1].substr(0,keyValue[1].length - 1) + '.isRequired,\n' : keyValue[1] + ',\n';
		}
	})
	return propTypeString;
	// console.log('\n\n\n\npropTypeString', propTypeString)


	function isRequired(string) {
		return string.substr(-1) === '!';
	}
}