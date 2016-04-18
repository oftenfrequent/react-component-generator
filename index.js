#!/usr/bin/env node
var fs = require('fs');
var ncp = require('ncp').ncp;
var path = require('path');
var compGenerator = require('./generated/componentMainString');

// file paths
var currentLocation = process.cwd() + '/' + process.argv[2] + '.js';
var componentFilePath = path.join(__dirname + '/generated/componentMain.js');


// create new files
// ncp.limit = 16;
// ncp(componentFilePath, currentLocation, function (err) {
// 	if (err) {
// 		return console.error(err);
// 	}
// 	console.log('done!');
// });

fs.writeFile(currentLocation, compGenerator(process.argv[2], displayOptions(process.argv.slice(3))), function(err){
	console.log('error: ', err)
})

// console.log('string: \n', compGenerator(process.argv[2], displayOptions(process.argv.slice(3))))
// fs.createWriteStream()

// displayOptions(process.argv.slice(3));




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