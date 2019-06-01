import React from 'react';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import SendBird from 'sendbird';

import sb2gifted from '../libs/sendbird-to-gifted';
import { getCourseChannel } from '../state/sendbird/selectors';
import { getUser } from '../state/user/selectors';

const propTypes = {
  connected: PropTypes.bool,
  channel: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  connected: false,
  channel: null,
};

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      previousMessageQuery: null,
    };
  }

  componentDidMount() {
    if (this.props.channel) {
      this.setState({
        previousMessageQuery: this.createPreviousMessageQuery(),
      }, () => {
        this.fetchPreviousMessages();
        this.registerChannelHander();
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.channel && !prevProps.channel) {
      this.setState({
        previousMessageQuery: this.createPreviousMessageQuery(),
      }, () => {
        this.fetchPreviousMessages();
        this.registerChannelHander();
      });
    }
  }

  createPreviousMessageQuery() {
    const query = this.props.channel.createPreviousMessageListQuery();
    query.limit = 30;
    query.reverse = true;
    return query;
  }

  registerChannelHander() {
    const sb = SendBird.getInstance();
    const channelHandler = new sb.ChannelHandler();
    const channelUrl = this.props.channel.url;

    channelHandler.onMessageReceived = (channel, message) => {
      if (channel.url === channelUrl) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, [sb2gifted(message)]),
        }));
      }
    };

    sb.addChannelHandler(channelUrl, channelHandler);
  }

  handleSend = (messages = []) => {
    const { channel } = this.props;
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      channel.sendUserMessage(messages[0].text, (message, error) => {
        if (error) {
          return;
        }
      });
    });
  }

  fetchPreviousMessages = () => {
    const { previousMessageQuery } = this.state;

    if (previousMessageQuery.hasMore) {
      previousMessageQuery.load((messages, error) => {
        if (error) {
          return;
        }

        this.setState(previousState => ({
          messages: GiftedChat.append(
            previousState.messages,
            messages.map(message => sb2gifted(message)),
          ),
        }));
      });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <GiftedChat
        messages={this.state.messages}
        onLoadEarlier={this.fetchPreviousMessages}
        onSend={this.handleSend}
        user={{
          _id: user.id,
          name: user.name,
        }}
      />
    );
  }
}

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

const mapStateToProps = (state, props) => ({
  channel: getCourseChannel(state, props),
  user: getUser(state),
});

export default connect(mapStateToProps)(Chat);
