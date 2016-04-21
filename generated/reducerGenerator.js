module.exports = function(funcArray) {
  return "import { Map, fromJS } from 'immutable';"+'\n'+
"import {"+'\n'+
functionDeclarations(funcArray) +
" } from '../../constants/ActionTypes';"+'\n'+
""+'\n'+
"export default function(state = Map(), action) {"+'\n'+
"  switch (action.type){"+'\n'+
"    case 'EXAMPLE' :"+'\n'+
"      return state;"+'\n'+
caseDeclarations(funcArray) +
"  }"+'\n'+
"  return state;"+'\n'+
"}"+'\n';
};



function functionDeclarations(funcArray) {
  return funcArray.map(function(func){return '  ' + func.toUpperCase() + ',\n'}).join('');
}

function caseDeclarations(funcArray) {
  return funcArray.map(function(func) {
    return '    case ' + func.toUpperCase() + ' :\n      return state;\n';
  }).join('');
}