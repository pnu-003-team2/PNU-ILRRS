import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchChannelRequest } from '../state/sendbird/actions';
import { getCourseSendbirdChannelUrl } from '../state/course/selectors';

const propTypes = {
  channelUrl: PropTypes.string,
  onLoad: PropTypes.func,
};

const defaultProps = {
  channelUrl: '',
  onLoad() {},
};

function FetchSendbirdChannel({ channelUrl, onLoad }) {
  useEffect(() => {
    if (channelUrl) {
      onLoad(channelUrl);
    }
  }, [channelUrl]);
  return null;
}

FetchSendbirdChannel.propTypes = propTypes;
FetchSendbirdChannel.defaultProps = defaultProps;

const mapStateToProps = (state, props) => ({
  channelUrl: getCourseSendbirdChannelUrl(state, props),
});

const mapDispatchToProps = {
  onLoad: fetchChannelRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchSendbirdChannel);
