module.exports = function (ReducerToTest, ActionsToTestArray){
  return "import React from 'react';"+'\n'+
"import { fromJS } from 'immutable';"+'\n'+
"import { expect } from 'chai';"+'\n'+
'\n'+
"import reducer from '../"+ ReducerToTest +"';"+'\n'+
"import {"+'\n'+
"  EXAMPLE_REDUCER_ACTION,"+'\n'+
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


function itBlockCreator(ActionsToTestArray) {
	if(!ActionsToTestArray.length) return "  it('handles an example')"+'\n';
  return ActionsToTestArray.map(function(action){
    action = action.toUpperCase();
    return "  it('handles " + action + "', () => {"+'\n'+
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