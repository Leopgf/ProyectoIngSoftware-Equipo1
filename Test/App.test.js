import React from 'react';
import renderer from 'react-test-renderer';

import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import { nowTheme } from '../Vista/constants';

import { AppLoading } from 'expo';

describe('<AppLoading />', () => {
  //TEST PANTALLA CARGA
    it('renders correctly', () => {
        const tree = renderer.create(< AppLoading />).toJSON();
        expect(tree).toMatchSnapshot();
      });
  // TEST NAVEGACION
    it('renders correctly', () => {
        const tree = renderer.create(
        <NavigationContainer>
          <GalioProvider theme={nowTheme}>
            <Block flex>
            </Block>
          </GalioProvider>
        </NavigationContainer>
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
});