import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSendbird } from '../state/sendbird/actions';
import { isSendbirdConnected } from '../state/sendbird/selectors';
import { getUserId } from '../state/user/selectors';

class FetchSendbirdConnection extends React.Component {
  static propTypes = {
    connected: PropTypes.bool,
    studentId: PropTypes.string,
    onConnect: PropTypes.func,
  };
  static defaultProps = {
    connected: false,
    studentId: '',
    onConnect() {},
  };

  componentDidMount() {
    const { connected, studentId } = this.props;
    if (!connected && this.props.studentId) {
      this.props.onConnect(studentId);
    }
  }

  componentDidUpdate(prevProps) {
    const { connected, studentId, onConnect } = this.props;
    if (!connected) {
      if (studentId &&
          studentId !== prevProps.studentId) {
        onConnect(studentId);
      }
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  connected: isSendbirdConnected(state),
  studentId: getUserId(state),
});

const mapDispatchToProps = {
  onConnect: connectSendbird,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchSendbirdConnection);
