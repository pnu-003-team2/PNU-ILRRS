import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSendbird, disconnectSendbird } from '../state/sendbird/actions';
import { isSendbirdConnected } from '../state/sendbird/selectors';
import { getUserId } from '../state/user/selectors';

const propTypes = {
  connected: PropTypes.bool,
  studentId: PropTypes.string,
  onConnect: PropTypes.func,
  onDisconnect: PropTypes.func,
};

const defaultProps = {
  connected: false,
  studentId: '',
  onConnect() {},
  onDisconnect() {},
};

class FetchSendbirdConnection extends React.Component {
  componentDidMount() {
    const { connected, studentId, onConnect } = this.props;
    if (!connected && studentId) {
      onConnect(studentId);
    }
  }

  componentDidUpdate(prevProps) {
    const { connected, studentId, onConnect } = this.props;
    if (!prevProps.connected && !connected && studentId) {
      onConnect(studentId);
    }
  }

  componentWillUnmount() {
    this.props.onDisconnect();
  }

  render() {
    return null;
  }
}

FetchSendbirdConnection.propTypes = propTypes;
FetchSendbirdConnection.defaultProps = defaultProps;

const mapStateToProps = state => ({
  connected: isSendbirdConnected(state),
  studentId: getUserId(state),
});

const mapDispatchToProps = {
  onConnect: connectSendbird,
  onDisconnect: disconnectSendbird,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchSendbirdConnection);
