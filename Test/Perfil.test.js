import React from 'react';
import renderer from 'react-test-renderer';

import { StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Card } from '../Vista/components';
import { Images, nowTheme } from '../Vista/constants';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

describe('<Perfil />', () => {
    //
    it('renders correctly', () => {
        const tree = renderer.create(
            <ImageBackground
              source={Images.ProfileBackground}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <Block flex style={styles.profileCard}>
                <Block
                  style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}
                >
                  <Block style={{ top: height * 0.23 }}>
                    <Block middle>
                      {/*nombre usuario*/}
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          marginBottom: theme.SIZES.BASE / 2,
                          fontWeight: '900',
                          fontSize: 30,
                        }}
                        color="#e63746"
                      >
                        Nombre Apellido
                      </Text>
                      {/*texto usuario de Mixo´s*/}
                      <Text
                        size={16}
                        color="#0f1e2e"
                        style={{ marginTop: 5, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
                      >
                        @Usuario
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
    it('renders correctly', () => {
        const tree = renderer.create(
            <Text
                  style={{
                    fontFamily: 'montserrat-bold',
                    marginBottom: theme.SIZES.BASE / 2,
                    fontWeight: '900',
                    fontSize: 25,
                  }}
                  color="#e63746"
                >
                  Mi Biblioteca
                </Text>
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
    it('renders correctly', () => {
        const tree = renderer.create(
            <Block flex>
                  <Block flex row>
                  </Block>
              </Block>
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
});

const styles = StyleSheet.create({
    profileContainer: {
      width,
      height,
      padding: 0,
      zIndex: 1,
    },
    profileBackground: {
      width,
      height: height * 0.35,
    },
  
    info: {
      marginTop: 30,
      paddingHorizontal: 10,
      height: height * 0.8,
    },
    avatarContainer: {
      position: 'relative',
      marginTop: -80,
    },
    avatar: {
      width: thumbMeasure,
      height: thumbMeasure,
      borderRadius: 50,
      borderWidth: 0,
    },
    nameInfo: {
      marginTop: 35,
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure,
    },
    social: {
      width: nowTheme.SIZES.BASE * 3,
      height: nowTheme.SIZES.BASE * 3,
      borderRadius: nowTheme.SIZES.BASE * 1.5,
      justifyContent: 'center',
      zIndex: 99,
      marginHorizontal: 5,
    },
  });  
  
