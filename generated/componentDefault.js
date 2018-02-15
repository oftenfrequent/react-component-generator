import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class COMPONENT_NAME extends React.Component {
  static propTypes = {
PROP_TYPES
  };

  constructor(props) {
    super(props);
    this.state = {
      // TODO: STATE_VARIABLES
    };
  }

  render() {
    return (
      <div>
        <h1>COMPONENT_NAME</h1>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    // TODO: INTERNAL_PROP_TYPES
  };
}

export default connect(
  mapStateToProps,
  {
    // TODO: PROP_FUNCTIONS
  }
)(COMPONENT_NAME);
