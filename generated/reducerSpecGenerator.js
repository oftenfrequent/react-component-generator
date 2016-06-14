module.exports = function (ReducerToTest, ActionsToTestArray){
  return "import React from 'react';"+'\n'+
"import { fromJS } from 'immutable';"+'\n'+
"import { expect } from 'chai';"+'\n'+
'\n'+
"import reducer from '../"+ ReducerToTest +"Reducer';"+'\n'+
"import {"+'\n'+
functionDeclarations(ActionsToTestArray) +
"} from '../../../constants/ActionTypes';"+'\n'+
'\n'+
'\n'+
"const initialState = fromJS({"+'\n'+
"  blah: {"+'\n'+
"    example: false"+'\n'+
"  }"+'\n'+
"})"+'\n'+
'\n'+
'\n'+
"describe('"+ ReducerToTest +"', () => {"+'\n'+
""+'\n'+
itBlockCreator(ActionsToTestArray)+'\n'+
"});"+'\n';
};

function functionDeclarations(funcArray) {
	if(!funcArray.length) return '  EXAMPLE,\n';
  return funcArray.map(function(func){return '  ' + func.split(':')[0].toUpperCase() + ',\n'}).join('');
}

function itBlockCreator(ActionsToTestArray) {
	if(!ActionsToTestArray.length) return "  xit('handles an example')"+'\n';
  return ActionsToTestArray.map(function(action){
    action = action.split(':')[0].toUpperCase();
    return "  xit('handles " + action + "', () => {"+'\n'+
"    const action = {"+'\n'+
"      type: " + action + ","+'\n'+
"      data: example"+'\n'+
"    };"+'\n'+
'\n'+
"    const nextState = reducer(initialState, action);"+'\n'+
"    expect(nextState.get('blah')).to.equal(fromJS({ example: true }));"+'\n'+
"  });"+'\n'+'\n';
  }).join('');
}