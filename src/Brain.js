import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Brain extends React.Component {
  static propTypes = {
    speed: PropTypes.number,
    thoughts: PropTypes.object.isRequired,
    createdAt: PropTypes.instanceOf(date),
    // notsureofthetype: PropTypes.?????,
  };

  static defaultProps = {
    // if props not required,
    // specify defaults here
  };

  constructor(props) {
    super(props);
    this.state = {
      currentlyThinking: undefined,
      onMeds: undefined,
    };
  }

  render() {
    return (
      <div>
        <h1>Brain Component</h1>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    // state.get(...)
  };
}

export default connect(
  mapStateToProps,
  {
    // action creators
  }
)(Brain);
