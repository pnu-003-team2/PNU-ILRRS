export const isCourseLoading = state => state.course.isCourseLoading;
export const getCourses = state => state.course.ids.map(id => state.course.byId[id]);
export const getCourseSendbirdChannelUrl = (state, props) => {
  if (props.courseId in state.course.byId) {
    return state.course.byId[props.courseId].channelUrl;
  }
  return null;
};
