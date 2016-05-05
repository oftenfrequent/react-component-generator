module.exports = function (name, propsArray){
  return "import React from 'react';"+'\n'+
"import { createStore } from 'redux';"+'\n'+
"import {fromJS} from 'immutable';"+'\n'+
"import { expect } from 'chai';"+'\n'+
"import ReactDOM from 'react-dom';"+'\n'+
"import {"+'\n'+
"  renderIntoDocument,"+'\n'+
"  findRenderedComponentWithType,"+'\n'+
"  scryRenderedDOMComponentsWithClass,"+'\n'+
"  Simulate,"+'\n'+
"} from 'react-addons-test-utils';"+'\n'+
""+'\n'+
"import "+name+"  from '../"+name+"';"+'\n'+
""+'\n'+
"describe('Trip Search', () => {"+'\n'+
""+'\n'+
"  xit('does something you expect', () => {"+'\n'+
"    const component = renderIntoDocument("+'\n'+
"      <"+name+'\n'+
createPropStrings(propsArray)+
"      />"+'\n'+
"    );"+'\n'+
"    const thing = component.refs.example.value();"+'\n'+
"    expect(thing).to.equal(true);"+'\n'+
"  });"+'\n'+
""+'\n'+
"});";
};


// TODO: function should display as a function
// and the reducer should the callback

// generated prop types
function createPropStrings(propsArray) {
  var spacing = '        ';
  var propTypeString = '';

  if(!propsArray.length) return spacing + "example='null'"+'\n';

  return propsArray.map(function(prop) {
    if(prop.indexOf(':')>-1) {
      var keyValue = prop.split(':');
      if(isRequired(keyValue[1])) {
        return spacing + keyValue[0] + "='"+keyValue[1].substr(0,keyValue[1].length - 1)+"'"+'\n';
      }
      return spacing + keyValue[0] + "='"+keyValue[1]+"'"+'\n';
    } else {
      return spacing + prop + "='null'"+'\n';
    }
  }).join('');

  function isRequired(string) {
    return string.substr(-1) === '!';
  }
}