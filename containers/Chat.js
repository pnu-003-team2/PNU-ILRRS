import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { GiftedChat, Avatar } from 'react-native-gifted-chat';
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

  renderCustomAvatar = (avatarProps) => {
    console.log(avatarProps);
    return (
      <View style={styles.avatarContainer}>
        <Avatar {...avatarProps} />
        <Text style={styles.name}>{avatarProps.currentMessage.user.name}</Text>
      </View>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <GiftedChat
        placeholder="메시지를 입력하세요"
        renderAvatarOnTop={true}
        renderAvatar={this.renderCustomAvatar}
        textInputProps={{autoFocus: true}}
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

const styles = StyleSheet.create({
  avatarContainer: {

  },
  name: {
    width: 36,
    marginTop: 5,
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
    color: '#3d3d3d',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, props) => ({
  channel: getCourseChannel(state, props),
  user: getUser(state),
});

export default connect(mapStateToProps)(Chat);
