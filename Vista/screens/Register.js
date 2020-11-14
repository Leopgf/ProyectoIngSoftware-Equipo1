// NO SE ESTÁ USANDO

import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Register extends React.Component {

  state = {
    login: 1
  };

  verRegistro = () => {
    this.setState({
      login: 0
    });
    this.render();
  }

  verLogin = () => {
    this.setState({
      login: 0
    });
    this.render();
  }

  render() {
    if(this.state.login){
      return (
        <DismissKeyboard>
          <Block flex middle>
            <ImageBackground
              source={Images.RegisterBackground}
              style={styles.imageBackgroundContainer}
              imageStyle={styles.imageBackground}
            >
              <Block flex middle>
                <Block style={styles.registerContainer}>
                  <Block flex space="evenly">
                    <Block flex={0.4} middle style={styles.socialConnect}>
                      <Block flex={0.5} middle>
                        <Text
                          style={{
                            fontFamily: 'montserrat-regular',
                            textAlign: 'center'
                          }}
                          color="#333"
                          size={24}
                        >
                          Iniciar Sesión
                        </Text>
                      </Block>
  
                    </Block>
                    <Block flex={0.1} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        muted
                        size={16}
                      >
                        Inicia con tu email
                      </Text>
                    </Block>
                    <Block flex={1} middle space="between">
                      <Block center flex={0.9}>
                        <Block flex space="between">
                          <Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Email"
                                style={styles.inputs}
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    //AQUI SE CAMBIA EL ICONO IDK DONDE TA
                                    name="email-852x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Contraseña"
                                style={styles.inputs}
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    //AQUI SE CAMBIA EL ICONO IDK DONDE TA
                                    name="email-852x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
  
                          </Block>
                          <Block center>
                            <Button color="primary" round style={styles.createButton}>
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                ACCEDER
                              </Text>
                            </Button>
                            <Button color="primary" round style={styles.createButton} onPress={() => this.verRegistro()}>
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
          </Block>
        </DismissKeyboard>
      );
    }else {
      return (
        <DismissKeyboard>
          <Block flex middle>
            <ImageBackground
              source={Images.RegisterBackground}
              style={styles.imageBackgroundContainer}
              imageStyle={styles.imageBackground}
            >
              <Block flex middle>
                <Block style={styles.registerContainer}>
                  <Block flex space="evenly">
                    <Block flex={0.4} middle style={styles.socialConnect}>
                      <Block flex={0.5} middle>
                        <Text
                          style={{
                            fontFamily: 'montserrat-regular',
                            textAlign: 'center'
                          }}
                          color="#333"
                          size={24}
                        >
                          Regístrate
                        </Text>
                      </Block>
  
                    </Block>
                    <Block flex={0.1} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        muted
                        size={16}
                      >
                        Regístrate con tu email
                      </Text>
                    </Block>
                    <Block flex={1} middle space="between">
                      <Block center flex={0.9}>
                        <Block flex space="between">
                          <Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Email"
                                style={styles.inputs}
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    //AQUI SE CAMBIA EL ICONO IDK DONDE TA
                                    name="email-852x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Contraseña"
                                style={styles.inputs}
                                iconContent={
                                  <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    //AQUI SE CAMBIA EL ICONO IDK DONDE TA
                                    name="email-852x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
  
                          </Block>
                          <Block center>
                            <Button color="primary" round style={styles.createButton}>
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                ACCEDER
                              </Text>
                            </Button>
                            <Button color="primary" round style={styles.createButton}>
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
          </Block>
        </DismissKeyboard>
      );
    }
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
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
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
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
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default Register;
