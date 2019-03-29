import 'react-native';
import React from 'react';
import { render } from 'react-native-testing-library';

import App from '../App';

describe('<App />', () => {
  it('should renders correctly', () => {
    render(<App />);
  });
});
