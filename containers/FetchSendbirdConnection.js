import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSendbird } from '../state/sendbird/actions';
import { isSendbirdConnected } from '../state/sendbird/selectors';
import { getUserId } from '../state/user/selectors';

const propTypes = {
  connected: PropTypes.bool,
  studentId: PropTypes.string,
  onConnect: PropTypes.func,
};

const defaultProps = {
  connected: false,
  studentId: '',
  onConnect() {},
};

function FetchSendbirdConnection({ connected, studentId, onConnect }) {
  useEffect(() => {
    if (!connected && studentId) {
      onConnect(studentId);
    }
  }, [connected, studentId]);
  return null;
}

FetchSendbirdConnection.propTypes = propTypes;
FetchSendbirdConnection.defaultProps = defaultProps;

const mapStateToProps = state => ({
  connected: isSendbirdConnected(state),
  studentId: getUserId(state),
});

const mapDispatchToProps = {
  onConnect: connectSendbird,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchSendbirdConnection);
