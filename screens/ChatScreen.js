import React from 'react';

import Chat from '../containers/Chat';
import FetchSendbirdChannel from '../containers/FetchSendbirdChannel';

export default class ChatScreen extends React.Component {
  render() {
    const { courseId } = this.props.navigation.state.params;
    return (
      <>
        <FetchSendbirdChannel courseId={courseId} />
        <Chat courseId={courseId} />
      </>
    );
  }
}
