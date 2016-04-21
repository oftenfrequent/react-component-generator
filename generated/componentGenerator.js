module.exports = function(name, propsArray) {
	return "import React from 'react';"+'\n'+
"import PureRenderMixin from 'react-addons-pure-render-mixin';"+'\n'+
"import { connect } from 'react-redux';"+'\n'+
"import { fromJS } from 'immutable';"+'\n'+
""+'\n'+
""+'\n'+
"export class " + name + " extends React.Component {"+'\n'+
"  constructor(props) {"+'\n'+
"    //defaults here"+'\n'+
"    props = Object.assign({"+'\n'+
"      // prop: props.prop || 'something else',"+'\n'+
"    }, props);"+'\n'+
""+'\n'+
"    super(props);"+'\n'+
"    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);"+'\n'+
"  }"+'\n'+
""+'\n'+
"  //component lifecycle methods"+'\n'+
"  componentDidMount() {"+'\n'+
"    console.log('this.props at Mount:', this.props)"+'\n'+
"  }"+'\n'+
""+'\n'+
"  render() {"+'\n'+
"    return ("+'\n'+
"      <div>"+'\n'+
"        <h1>NEW COMPONENT</h1>"+'\n'+
"        <pre>{JSON.stringify(this.props)}</pre>"+'\n'+
"      </div>"+'\n'+
"    )"+'\n'+
"  }"+'\n'+
"}"+'\n'+
""+'\n'+
""+'\n'+
""+'\n'+
"function mapStateToProps(state){"+'\n'+
"  return {"+'\n'+
"    // prop: state.get(''),"+'\n'+
"  }"+'\n'+
"}"+'\n'+
""+'\n'+
""+'\n'+
"export default connect("+'\n'+
"  mapStateToProps,"+'\n'+
"  {"+'\n'+
"    //action creators"+'\n'+
"  }"+'\n'+
")(" + name + ")"+'\n'+
""+'\n'+
name + ".propTypes = {"+'\n'+
createPropStrings(propsArray) +
"};"+'\n';
};


// generated prop types
function createPropStrings(propsArray) {
  var spacing = '    ';
  var propTypeString = '';

  propsArray.map(function(prop) {
    if(prop.indexOf(':')>-1) {
      var keyValue = prop.split(':');
      if (keyValue[1].indexOf('date') > -1 || keyValue[1].indexOf('moment') > -1) {
        propTypeString += spacing + keyValue[0] + ': React.PropTypes.instanceOf(';
        propTypeString += isRequired(keyValue[1]) ? keyValue[1].substr(0,keyValue[1].length - 1) + ').isRequired,\n' : keyValue[1] + '),\n';
      } else {
        propTypeString += spacing + keyValue[0] + ': React.PropTypes.';
        propTypeString += isRequired(keyValue[1]) ? keyValue[1].substr(0,keyValue[1].length - 1) + '.isRequired,\n' : keyValue[1] + ',\n';
      }
    } else {
      propTypeString += spacing + '// ' + prop + ': React.PropTypes.?????' + ',\n';
    }
  })
  return propTypeString;

  function isRequired(string) {
    return string.substr(-1) === '!';
  }
}