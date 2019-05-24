import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUser } from '../state/user/actions';
import { getUserId } from '../state/user/selectors';

const propTypes = {
  userId: PropTypes.number,
  onLoad: PropTypes.func,
};

const defaultProps = {
  userId: null,
  onLoad() {},
};

function FetchUserData({ userId, onLoad }) {
  useEffect(() => {
    if (userId) {
      onLoad();
    }
  }, [userId]);
  return null;
}

FetchUserData.propTypes = propTypes;
FetchUserData.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  userId: getUserId(state),
});

const mapDispatchToProps = {
  onLoad: loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchUserData);
