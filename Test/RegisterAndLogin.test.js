import React from 'react';
import renderer from 'react-test-renderer';

import {
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input} from '../Vista/components';
import { Images, nowTheme } from '../Vista/constants';

const { width, height } = Dimensions.get('screen');


describe('<RegisterAndLogin />', () => {
    //
    it('renders correctly', () => {
        const tree = renderer.create(
            <ImageBackground
              source={Images.RegisterBackground}
              style={styles.imageBackgroundContainer}
              imageStyle={styles.imageBackground}
            >
              <Block flex middle>
                <Block style={styles.registerContainer}>
                  <Block flex space="evenly">
                    <Block flex={0.4} middle >
                      <Block flex={0.5} middle>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            fontWeight: '500',
                            fontSize: 24,
                          }}
                          color="#0f1e2e"
                          size={24}
                        >
                          Iniciar Sesión
                        </Text>
                      </Block>
                    </Block>
                    <Block flex={0.1} middle>
                      <Text color="#0f1e2e" size={16}>
                        Inicia con tu email
                      </Text>
                    </Block>
                    <Block flex={1} middle space="between">
                      <Block center flex={0.9}>
                        <Block flex space="between">
                          <Block>
                            <Block center width={width * 0.8}>
                              <Input
                                placeholder="Email"
                                style={styles.inputs}
                                iconContent={<Icon size={18} name="email" family="ArgonExtra" />}
                              />
                            </Block>
                            <Block center width={width * 0.8}>
                              <Input
                                placeholder="Contraseña"
                                style={styles.inputs}
                                password={true}
                                iconContent={<Icon size={18} name="lock" family="ArgonExtra" />}
                              />
                            </Block>
                          </Block>
                          <Block center>
                            <Button
                              style={{
                                fontFamily: 'montserrat-bold',
                                borderRadius: nowTheme.SIZES.BASE * 1.5,
                                width: 200,
                                marginBottom: 30,
                                marginTop: 30
                              }}
                              color="primary"
                              round
                            >
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                Acceder
                              </Text>
                            </Button>
                            <Button
                              style={{
                                fontFamily: 'montserrat-bold',
                                borderRadius: nowTheme.SIZES.BASE * 1.5,
                                width: 200,
                                marginBottom: 30,
                              }}
                              color="primary"
                              round
                            >
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                He olvidado mi contraseña
                              </Text>
                            </Button>
                            <Button
                              style={{
                                fontFamily: 'montserrat-bold',
                                borderRadius: nowTheme.SIZES.BASE * 1.5,
                                width: 200,
                                marginBottom: 100,
                              }}
                              color="primary"
                              round
                            >
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                ¿No tienes una cuenta? Regístrate
                              </Text>
                            </Button>
                          </Block>
                        </Block>
                      </Block>
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
            <ImageBackground
              source={Images.RegisterBackground}
              style={styles.imageBackgroundContainer}
              imageStyle={styles.imageBackground}
            >
              <Block flex middle>
                <Block style={styles.registerContainer}>
                  <Block flex space="evenly">
                    <Block >
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          textAlign: 'center',
                          fontSize: 24,
                          marginTop: 25,
                        }}
                        color="#0f1e2e"
                        size={24}
                      >
                        Registro
                      </Text>
                    </Block>
                    <Block flex={0.1} middle>
                      <Text
                        color="#0f1e2e"
                        size={16}
                        style={{
                          marginTop: 10,
                        }}
                      >
                        Regístrate con tu email
                      </Text>
                    </Block>
                    <Block flex={1.2} middle space="between">
                      <Block center flex={0.5}>
                        <Block flex space="between">
                          <Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Email"
                                style={styles.inputs}
                                iconContent={<Icon size={18} name="email" family="ArgonExtra" />}
                              />
                            </Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Contraseña"
                                style={styles.inputs}
                                password={true}
                                iconContent={<Icon size={18} name="lock" family="ArgonExtra" />}
                              />
                            </Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Confirmar contraseña"
                                style={styles.inputs}
                                password={true}
                                iconContent={<Icon size={18} name="lock" family="ArgonExtra" />}
                              />
                            </Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Nombre"
                                style={styles.inputs}
                                iconContent={<Icon size={18} name="person" family="ArgonExtra" />}
                              />
                            </Block>
                            {/* NO SE POR QUE ESTE INPUT CUANDO ESCRIBO SALE CON ASTERISCOS */}
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Apellido"
                                style={styles.inputs}
                                iconContent={<Icon size={18} name="person" family="ArgonExtra" />}
                              />
                            </Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Usuario"
                                style={styles.inputs}
                                iconContent={<Icon size={18} name="person" family="ArgonExtra" />}
                              />
                            </Block>
                          </Block>
                          <Block center>
                            <Button
                              style={{
                                fontFamily: 'montserrat-bold',
                                borderRadius: nowTheme.SIZES.BASE * 1.5,
                                width: 250,
                                marginTop: 10,
                              }}
                              color="primary"
                              round
                            >
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                CREAR CUENTA
                              </Text>
                            </Button>
                            <Button
                              style={{
                                fontFamily: 'montserrat-bold',
                                borderRadius: nowTheme.SIZES.BASE * 1.5,
                                width: 250,
                                marginTop: 10,
                              }}
                              color="primary"
                              round
                            >
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                ¿Ya tienes una cuenta? Inicia sesión
                              </Text>
                            </Button>
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
});

const styles = StyleSheet.create({
    imageBackgroundContainer: {
      width: width,
      height: height,
      padding: 0,
      zIndex: 1,
    },
    imageBackground: {
      width: width,
      height: height,
    },
    registerContainer: {
      marginTop: 55,
      width: width * 0.9,
      height: height < 812 ? height * 0.8 : height * 0.8,
      backgroundColor: nowTheme.COLORS.WHITE,
      borderRadius: 4,
      shadowColor: nowTheme.COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: 'hidden',
    },
    socialConnect: {
      backgroundColor: nowTheme.COLORS.WHITE,
      // borderBottomWidth: StyleSheet.hairlineWidth,
      // borderColor: "rgba(136, 152, 170, 0.3)"
    },
    socialButtons: {
      width: 120,
      height: 40,
      backgroundColor: '#fff',
      shadowColor: nowTheme.COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
    },
    socialTextButtons: {
      color: nowTheme.COLORS.PRIMARY,
      fontWeight: '800',
      fontSize: 14,
    },
    inputIcons: {
      marginRight: 12,
      color: nowTheme.COLORS.ICON_INPUT,
    },
    inputs: {
      width: width * 0.65,
      borderWidth: 1,
      borderColor: '#E3E3E3',
      borderRadius: 21.5,
      alignSelf: 'center'
    },
    passwordCheck: {
      paddingLeft: 2,
      paddingTop: 6,
      paddingBottom: 15,
    },
    createButton: {
      width: width * 0.5,
      marginTop: 25,
      marginBottom: 40,
    },
    social: {
      width: theme.SIZES.BASE * 3.5,
      height: theme.SIZES.BASE * 3.5,
      borderRadius: theme.SIZES.BASE * 1.75,
      justifyContent: 'center',
      marginHorizontal: 10,
    },
  });

