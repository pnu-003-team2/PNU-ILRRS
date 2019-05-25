import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  handleSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        locale="ko"
        messages={this.state.messages}
        onSend={this.handleSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
