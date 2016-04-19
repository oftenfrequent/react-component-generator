module.exports = function(funcArray) {
  var fDeclarations = funcArray.map(function(func){return '  ' + func.toUpperCase() + ',\n'}).join('');
  var caseDeclarations = funcArray.map(function(func) {
    return '    case ' + func.toUpperCase() + ' :\n      return state;\n';
  }).join('');


  return "import { Map, fromJS } from 'immutable';"+'\n'+
"import {"+'\n'+
fDeclarations +
" } from '../../constants/ActionTypes';"+'\n'+
""+'\n'+
"export default function(state = Map(), action) {"+'\n'+
"  switch (action.type){"+'\n'+
"    case 'EXAMPLE' :"+'\n'+
"      return state;"+'\n'+
caseDeclarations +
"  }"+'\n'+
"  return state;"+'\n'+
"}"+'\n';
};