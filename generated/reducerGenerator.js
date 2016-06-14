module.exports = function(reducerName, funcArray) {
  return "import { Map, fromJS } from 'immutable';"+'\n'+
"import {"+'\n'+
functionDeclarations(funcArray) +
" } from '../../constants/ActionTypes';"+'\n'+
""+'\n\n'+
"export default function(state = Map(), action) {"+'\n'+
"  switch (action.type){"+'\n'+
caseDeclarations(funcArray) +
"  }"+'\n'+
"  return state;"+'\n'+
"}"+'\n';
};



function functionDeclarations(funcArray) {
	if(!funcArray.length) return '  EXAMPLE,\n';
  return funcArray.map(function(func){return '  ' + func.split(':')[0].toUpperCase() + ',\n'}).join('');
}

function caseDeclarations(funcArray) {
	if(!funcArray.length) return '    case EXAMPLE :\n      return state;\n';
  return funcArray.map(function(func) {
    return '    case ' + func.split(':')[0].toUpperCase() + ' :\n      return state;\n';
  }).join('');
}