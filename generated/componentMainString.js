export default = "import React from 'react';"+'\n'+
"import PureRenderMixin from 'react-addons-pure-render-mixin';"+'\n'+
"import { connect } from 'react-redux';"+'\n'+
"import { fromJS } from 'immutable';"+'\n'+
"import * as _ from  'lodash';"+'\n'+
""+'\n'+
"import { API_BASE_ENDPOINT } from '../../constants/endPoints';"+'\n'+
""+'\n'+
""+'\n'+
"export default class NewComponent extends React.Component {"+'\n'+
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
"  renderOption(item) {"+'\n'+
"    if (!item.airports){ return <div className='simple-option'>Seach for a US Airport</div>};"+'\n'+
"    return ("+'\n'+
"      <div className='simple-option' style={{fontSize: 12}}>"+'\n'+
"        <div>{item.city}, {item.region}</div>"+'\n'+
"        <div>{item.name} ({item.code})</div>"+'\n'+
"        <ul>"+'\n'+
"          {item.airports.map( (airport, i) =>"+'\n'+
"            <li key={i}>{airport.name}<small>({airport.iata_code})</small></li>"+'\n'+
"          )}"+'\n'+
"        </ul>"+'\n'+
"      </div>"+'\n'+
"    )"+'\n'+
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
"  { requestAirport,"+'\n'+
"    addAirportToList,"+'\n'+
"    updateTripSearch }"+'\n'+
")(TripSearch);"+'\n'+
""+'\n'+
"export default connect({"+'\n'+
"  mapStateToProps,"+'\n'+
"  {"+'\n'+
"    //action creators"+'\n'+
"  }"+'\n'+
"})(NewComponent)"+'\n'+
""+'\n'+
"NewComponent.propTypes = {"+'\n'+
"  // props: React.PropTypes.object,"+'\n'+
"};"+'\n'