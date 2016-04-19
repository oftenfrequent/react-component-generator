module.exports = function(name, propString) {
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
propString +
"};"+'\n';
};