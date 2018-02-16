// generate prop types for component
function createPropStrings(propsArray) {
  var spacing = '    ';
  var propTypeString = '';

  if(!propsArray.length) return spacing + "// example: PropTypes.?????,"+'\n';

  propsArray.map(function(prop, i) {
    if(prop.indexOf(':')>-1) {
      var keyValue = prop.split(':');

      var required = isRequired(keyValue[1])
      var name = keyValue[0];
      var type = required ? keyValue[1].substr(0,keyValue[1].length - 1) : keyValue[1];
      var ending = required ? '.isRequired,' : ',';

      if (type.indexOf('date') > -1 || type.indexOf('moment') > -1 || type.indexOf('Immutable') > -1) {
        propTypeString += spacing + name + ': PropTypes.instanceOf(' + type + ')' + ending;
      } else {
        propTypeString += spacing + name + ': PropTypes.' + type + ending;
      }
    } else {
      propTypeString += spacing + '// ' + prop + ': PropTypes.?????' + ',';
    }

    if (i !== propsArray.length - 1) propTypeString += '\n';
  });

  return propTypeString;

  function isRequired(string) {
    return string.substr(-1) === '!';
  }
}

function createStatePropStrings(propsArray) {
  var spacing = '      ';
  var propTypeString = '';

  if(!propsArray.length) return spacing + "// example: true,";

  propsArray.map(function(string, i) {
    var keyValue = string.split(':');
    propTypeString += spacing + keyValue[0] + ': ' + keyValue[1] + ',';
    if (i !== propsArray.length - 1) propTypeString += '\n';
  });

  return propTypeString;
}


function createSpecPropString(propsArray) {
  var spacing = '        ';
  var propTypeString = '';

  if(!propsArray.length) return spacing + "// example={value}";

  propsArray.map(function(string, i) {
    var keyValue = string.split(':');
    propTypeString += spacing + keyValue[0] + "={'" + keyValue[1] + "'}";
    if (i !== propsArray.length - 1) propTypeString += '\n';
  });

  return propTypeString;
}

module.exports = {
  createPropStrings: createPropStrings,
  createStatePropStrings: createStatePropStrings,
  createSpecPropString: createSpecPropString,
};
