// generate prop types for component
function createPropStrings(propsArray) {
  var spacing = '    ';
  var propTypeString = '';

  if(!propsArray.length) return spacing + "// example: PropTypes.?????,"+'\n';

  propsArray.map(function(prop) {
    if(prop.indexOf(':')>-1) {
      var keyValue = prop.split(':');

      var required = isRequired(keyValue[1])
      var name = keyValue[0];
      var type = required ? keyValue[1].substr(0,keyValue[1].length - 1) : keyValue[1];
      var ending = required ? '.isRequired,\n' : ',\n';

      if (type.indexOf('date') > -1 || type.indexOf('moment') > -1 || type.indexOf('Immutable') > -1) {
        propTypeString += spacing + name + ': PropTypes.instanceOf(' + type + ')' + ending;
      } else {
        propTypeString += spacing + name + ': PropTypes.' + type + ending;
      }
    } else {
      propTypeString += spacing + '// ' + prop + ': PropTypes.?????' + ',\n';
    }
  })
  return propTypeString;

  function isRequired(string) {
    return string.substr(-1) === '!';
  }
}

module.exports = {
  createPropStrings: createPropStrings,
};
