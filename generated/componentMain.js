import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import * as _ from  'lodash';

import { API_BASE_ENDPOINT } from '../../constants/endPoints';


export default class NewComponent extends React.Component {
  constructor(props) {
    //defaults here
    props = Object.assign({
      // prop: props.prop || 'something else',
    }, props);

    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  //component lifecycle methods
  componentDidMount() {
    console.log('this.props at Mount:', this.props)
  }

  render() {
    return (
      <div>
        <h1>NEW COMPONENT</h1>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    // prop: state.get(''),
  }
}


export default connect(
  mapStateToProps,
  { requestAirport,
    addAirportToList,
    updateTripSearch }
)(TripSearch);

export default connect({
  mapStateToProps,
  {
    //action creators
  }
})(NewComponent)

NewComponent.propTypes = {
  // props: React.PropTypes.object,
};