export const isConnecting = state => state.sendbird.isConnecting;
export const isSendbirdConnected = state => state.sendbird.connected;
export const getCourseChannel = (state, props) => {
  return state.sendbird.channel[props.courseId];
};
