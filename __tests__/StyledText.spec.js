import 'react-native';
import React from 'react';
import { render } from 'react-native-testing-library';

import { HelveticaText } from '../components/StyledText';

describe('<StyledText />', () => {
  it('should renders <HelveticaText /> correctly', () => {
    const { toJSON } = render(<HelveticaText>Test</HelveticaText>);
    expect(toJSON()).toMatchSnapshot();
  });
});
