// NO SE ESTÁ USANDO

import React from 'react';

import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

//AQUI LO IMPORTO PERO DICE QUE NO SILVE AUSILIO 
import { Picker } from 'react-native';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class AddReview extends React.Component {
  state = {
    recetaID: this.props.route.params.recetaID,
    valoracion: [0, 1, 2, 3, 4, 5],
  };

  async componentDidMount() {
    console.log(this.props.route.params.recetaID);
  }

  render() {
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
                  <Block flex={0.8} middle>
                    <Block middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          textAlign: 'center',
                          fontWeight: '500',
                        }}
                        color="#0f1e2e"
                        size={24}
                      >
                        Escribe tu review de la receta
                      </Text>
                      <Block flex space="between">
                        <Block>
                          <Block center width={width * 0.8}>
                            <Input
                              placeholder="Titulo"
                              style={styles.inputs}
                              // onChangeText={(email) => this.setState({ email })}
                              iconContent={<Icon size={18} name="email" family="ArgonExtra" />}
                            />
                            <Input
                              placeholder="Mensaje"
                              style={styles.inputs}
                              // onChangeText={(email) => this.setState({ email })}
                              iconContent={<Icon size={18} name="email" family="ArgonExtra" />}
                            />
                            {/* CRASHEA LA APP NO SE POR QUE */}
                            <Picker
                              selectedValue={this.state.valoracion[0]}
                              style={{ height: 50, width: 100 }}
                              onValueChange={(itemValue, itemIndex) =>
                                this.setState({ valoracion: itemValue })
                              }
                            >
                              {
                                this.state.valoracion.map((punto) => 
                                <Picker.Item label={punto} value={punto} />
                                )
                              }
                            </Picker>
                          </Block>
                        </Block>
                        <Block center>
                          <Button
                            style={{
                              fontFamily: 'montserrat-bold',
                              borderRadius: nowTheme.SIZES.BASE * 1.5,
                              width: 200,
                              marginBottom: 30,
                              marginTop: 30,
                            }}
                            color="primary"
                            round
                            // onPress={() => this.login()}
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Publicar
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
    alignSelf: 'center',
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

export default AddReview;
