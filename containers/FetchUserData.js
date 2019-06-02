import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUser } from '../state/user/actions';
import { getUserToken } from '../state/user/selectors';

const propTypes = {
  token: PropTypes.string,
  onLoad: PropTypes.func,
};

const defaultProps = {
  token: null,
  onLoad() {},
};

function FetchUserData({ token, onLoad }) {
  useEffect(() => {
    if (token) {
      onLoad();
    }
  }, [token]);
  return null;
}

FetchUserData.propTypes = propTypes;
FetchUserData.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  token: getUserToken(state),
});

const mapDispatchToProps = {
  onLoad: loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchUserData);
