import React from 'react';
import renderer from 'react-test-renderer';

import Onboarding from '../Vista/screens/Onboarding'

describe('<Onboarding />', () => {
  //
    it('renders correctly', () => {
        const tree = renderer.create(< Onboarding />).toJSON();
        expect(tree).toMatchSnapshot();
      });
});