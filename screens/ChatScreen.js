import React from 'react';

import FetchSendbirdChannel from '../containers/FetchSendbirdChannel';
import Chat from '../components/Chat';

export default class ChatScreen extends React.Component {
  render() {
    const { courseId } = this.props.navigation.state.params;
    return (
      <>
        <FetchSendbirdChannel courseId={courseId} />
        <Chat />
      </>
    );
  }
}
