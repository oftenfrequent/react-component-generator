const isRequired = string => string.substr(-1) === '!';

// generate prop types for component
export const createPropStrings = propsArray => {
  const spacing = '    ';
  let propTypeString = '';

  if(!propsArray.length) return spacing + "// example: PropTypes.?????,"+'\n';

  propsArray.map((prop, i) => {
    if (prop.indexOf(':')>-1) {
      const keyValue = prop.split(':');

      const required = isRequired(keyValue[1])
      const name = keyValue[0];
      const type = required ? keyValue[1].substr(0,keyValue[1].length - 1) : keyValue[1];
      const ending = required ? '.isRequired,' : ',';

      if (type.indexOf('date') > -1 || type.indexOf('moment') > -1 || type.indexOf('Immutable') > -1) {
        propTypeString += `${spacing}${name}: PropTypes.instanceOf(${type})${ending}`;
      } else {
        propTypeString += `${spacing}${name}: PropTypes.${type}${ending}`;
      }
    } else {
      propTypeString += spacing + '// ' + prop + ': PropTypes.?????' + ',';
    }

    if (i !== propsArray.length - 1) propTypeString += '\n';
  });

  return propTypeString;

}

export const createDefaultProps = propsArray => {
  const spacing = '    ';
  let defaultPropString = '';


  propsArray.map((prop, i) => {
    if(prop.indexOf(':')>-1) {
      const keyValue = prop.split(':');

      const required = isRequired(keyValue[1])

      if (!required) {
        const name = keyValue[0];
        const type = keyValue[1];
        let defaultValue = null;

        if (type === 'number') defaultValue = '0';
        else if (type === 'string') defaultValue = "''";
        else if (type === 'object') defaultValue = {};
        else if (type === 'date') defaultValue = 'moment()';
        else if (!type) defaultValue = 'undefined';

        defaultPropString += `\n${spacing}${name}: ${defaultValue},`
      }
    } else {
        defaultPropString += `\n${spacing}${prop}: undefined,`
    }
  });

  return defaultPropString;
}

export const createStatePropStrings = propsArray => {
  const spacing = '      ';
  let propTypeString = '';

  if(!propsArray.length) return spacing + "// example: true,";

  propsArray.map(function(string, i) {
    const keyValue = string.split(':');
    propTypeString += `${spacing}${keyValue[0]} : ${keyValue[1]},`;
    if (i !== propsArray.length - 1) propTypeString += '\n';
  });

  return propTypeString;
}


export const createSpecPropString = propsArray => {
  const spacing = '        ';
  let propTypeString = '';

  if(!propsArray.length) return spacing + "// example={value}";

  propsArray.map(function(string, i) {
    const keyValue = string.split(':');
    propTypeString += spacing + keyValue[0] + "={'" + keyValue[1] + "'}";
    if (i !== propsArray.length - 1) propTypeString += '\n';
  });

  return propTypeString;
}
