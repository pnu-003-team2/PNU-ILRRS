import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCourseSendbirdChannelUrl } from '../state/course';
import { fetchChannelRequest } from '../state/sendbird';

class FetchSendbirdChannel extends React.Component {
  static propTypes = {
    channelUrl: PropTypes.string,
    onLoad: PropTypes.func,
  };
  static defaultProps = {
    channelUrl: '',
    onLoad() {},
  };

  componentDidMount() {
    const { channelUrl, onLoad } = this.props;
    if (channelUrl) {
      onLoad(channelUrl);
    }
  }

  componentDidUpdate(prevProps) {
    const { channelUrl, onLoad } = this.props;
    if (channelUrl && channelUrl !== prevProps.channelUrl) {
      onLoad(channelUrl);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state, props) => ({
  channelUrl: getCourseSendbirdChannelUrl(state, props),
});

const mapDispatchToProps = {
  onLoad: fetchChannelRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchSendbirdChannel);
