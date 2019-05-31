import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchChannelRequest } from '../state/sendbird/actions';
import { isSendbirdConnected } from '../state/sendbird/selectors';
import { getCourseSendbirdChannelUrl } from '../state/course/selectors';

const propTypes = {
  courseId: PropTypes.number,
  channelUrl: PropTypes.string,
  onLoad: PropTypes.func,
};

const defaultProps = {
  channelUrl: '',
  onLoad() {},
};

function FetchSendbirdChannel({
  courseId,
  channelUrl,
  connected,
  onLoad,
}) {
  useEffect(() => {
    if (connected && channelUrl) {
      onLoad(channelUrl, courseId);
    }
  }, [connected, channelUrl]);
  return null;
}

FetchSendbirdChannel.propTypes = propTypes;
FetchSendbirdChannel.defaultProps = defaultProps;

const mapStateToProps = (state, props) => ({
  channelUrl: getCourseSendbirdChannelUrl(state, props),
  connected: isSendbirdConnected(state),
});

const mapDispatchToProps = {
  onLoad: fetchChannelRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchSendbirdChannel);
