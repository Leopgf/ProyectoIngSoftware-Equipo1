import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet, Dimensions } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../Vista/constants';
import { Button, Card } from '../Vista/components';

const { width, height } = Dimensions.get('screen');

describe('<EditReview />', () => {
  //
  it('renders correctly', async () => {
    const tree = await renderer
      .create(
          <Block flex={0.6}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          marginBottom: theme.SIZES.BASE / 2,
                          fontWeight: '900',
                          fontSize: 30,
                        }}
                        color="#e63746"
                      >
                        REVIEWS
                      </Text>
                      <Text
                        size={16}
                        color="#0f1e2e"
                        style={{ marginTop: 5, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
                      >
                        Reviews de la receta
                      </Text>
                      <Text
              size={16}
              color="#0f1e2e"
              style={{ marginTop: 5, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
            >
              ¿Desea publicar una Review de la Receta?
            </Text>
            <Button>ESCRIBIR REVIEW</Button>
            <Button>INICIAR SESIÓN PARA PUBLICAR REVIEW</Button>
            <Text
              size={16}
              color="#0f1e2e"
              style={{ marginTop: 20, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
            >
              No hay Reviews para esta receta
            </Text>
          </Block>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.4,
  },
});
