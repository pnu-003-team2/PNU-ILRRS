import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUser } from '../state/user/actions';

class FetchUserData extends React.Component {
  static propTypes = {
    onLoad: PropTypes.func,
  };
  static defaultProps = {
    onLoad() {},
  };

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  onLoad: loadUser,
};

export default connect(null, mapDispatchToProps)(FetchUserData);
