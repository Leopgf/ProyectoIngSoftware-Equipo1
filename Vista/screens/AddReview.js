import React from 'react';

import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import ImagePickerExample from '../components/ImagePicker';
import { ScrollView } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';

import { agregarReview } from '../../Controladores/RecetaControler';
import Review from '../../Modelos/Review';
import * as firebase from 'firebase';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recetaID: this.props.route.params.recetaID,
      valoracion: 0,
      titulo: '',
      mensaje: '',
      imagen: '',
    };
    this._dropdown_select = this._dropdown_select.bind(this);
  }

  _dropdown_select(event) {
    this.setState({ valoracion: event.target.index + 1 });
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    console.log(this.props.route.params.recetaID);
  }

  setImagen = (uri) => {
    this.setState({ imagen: uri.uri });
  };

  async addReview() {
    // Publicar review
    const review = {
      recetaID: this.state.recetaID,
      userID: firebase.auth().currentUser.uid,
      imagen: this.state.imagen,
      titulo: this.state.titulo,
      mensaje: this.state.mensaje,
      valoracion: parseInt(this.state.valoracion) + 1,
      fecha: new Date(),
    };

    await agregarReview(review)
      .then((resolve) => {
        Alert.alert(resolve);
        this.setState({
          valoracion: 0,
          titulo: '',
          mensaje: '',
          imagen: '',
        });
        this.props.navigation.navigate('Reviews', { recetaID: this.state.recetaID });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  render() {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.Review}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Block flex space="evenly">
                    <Block flex={0.8} middle>
                      <Block middle>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            fontWeight: '500',
                            marginTop: 50,
                          }}
                          color="#e63746"
                          size={24}
                        >
                          REVIEW DE LA RECETA
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: '500',
                            marginTop: 16,
                          }}
                          color="#0f1e2e"
                          size={16}
                        >
                          Escribe tu Review de la receta realizada
                        </Text>
                        <Block flex space="between">
                          <Block>
                            <Block center width={width * 0.8}>
                              <Block flex={1} style={{ marginTop: 20, marginBottom: 20 }} middle>
                                <ImagePickerExample onImagePicked={this.setImagen} />
                              </Block>
                              <Block>
                                <Input
                                  placeholder="Título de la Review"
                                  style={styles.inputs}
                                  onChangeText={(titulo) => this.setState({ titulo })}
                                  iconContent={
                                    <Icon size={18} name="message" family="ArgonExtra" />
                                  }
                                />
                                <Input
                                  placeholder="Mensaje de la Review"
                                  style={styles.inputsGrandes}
                                  onChangeText={(mensaje) => this.setState({ mensaje })}
                                  iconContent={
                                    <Icon size={18} name="message" family="ArgonExtra" />
                                  }
                                />
                                <Block>
                                  <Text
                                    style={{
                                      fontWeight: '500',
                                      marginTop: 16,
                                    }}
                                    color="#0f1e2e"
                                    size={18}
                                  >
                                    Valoración que desea colocarle a la receta:
                                  </Text>
                                  <Block
                                    style={{
                                      backgroundColor: '#ffffff',
                                      borderRadius: 50,
                                      alignSelf: 'center',
                                      padding: 10,
                                      margin: 5,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontWeight: '500',
                                        alignSelf: 'center',
                                      }}
                                      color="#e63746"
                                      size={13}
                                    >
                                      Con 1-Muy mala y 5-Excelente
                                    </Text>
                                  </Block>
                                  <ModalDropdown
                                    ref="dropdown"
                                    defaultValue={'Valoración'}
                                    textStyle={styles.dropdownText}
                                    style={styles.dropdown}
                                    dropdownStyle={styles.dropdownOption}
                                    options={[1, 2, 3, 4, 5]}
                                    onSelect={(value) => this.setState({ valoracion: value })}
                                  />
                                </Block>
                              </Block>
                            </Block>
                          </Block>
                          <Block center>
                            <Button
                              style={{
                                fontFamily: 'montserrat-bold',
                                borderRadius: nowTheme.SIZES.BASE * 1.5,
                                width: 200,
                                marginBottom: 30,
                                marginTop: 50,
                              }}
                              color="primary"
                              round
                              onPress={() => this.addReview()}
                            >
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                PUBLICAR
                              </Text>
                            </Button>
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </ScrollView>
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
  dropdown: {
    alignSelf: 'center',
    width: width / 2.5,
    height: height / 20,
    marginTop: 10,
    alignItems: 'center',
    right: 8,
    borderWidth: 0,
    borderRadius: 7,
    backgroundColor: '#e63746',
    marginLeft: 10,
  },

  dropdownOption: {
    width: width / 5,
    alignItems: 'center',
    borderColor: '#e63746',
    borderRadius: 10,
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdownText: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: '#c1c2c2',
    textAlign: 'center',
    textAlignVertical: 'center',
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
  inputsGrandes: {
    width: width * 0.65,
    height: 50,
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
