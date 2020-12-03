import React from 'react';

import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import LoadingView from 'react-native-loading-view';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import ImagePickerExample from '../components/ImagePicker';
import { ScrollView } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';

import { getReview, editarReview } from '../../Controladores/RecetaControler';
import * as firebase from 'firebase';
import { Image } from 'react-native-svg';
import Img from '../components/Img';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class EditReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      review: {},
      reviewID: this.props.route.params.reviewID,
      recetaID: this.props.route.params.recetaID,
    };
    this._dropdown_select = this._dropdown_select.bind(this);
  }

  _dropdown_select(event) {
    let review = (this.state.review.valoracion = event.target.index + 1);
    this.setState({ review: review });
  }

  async componentDidMount() {
    console.disableYellowBox=true;
    try {
      await getReview(this.state.reviewID, this.onReviewRecibida);
    } catch (error) {
      console.error(error);
    }
    this.setState({
      loading: false,
    });
  }

  onReviewRecibida = async (review) => {
    await this.setState({
      review: review,
    });
    console.log(review);
  };

  async editReview() {
    // Editar review
    const review = {
      id: this.state.review.id,
      recetaID: this.state.review.recetaID,
      userID: firebase.auth().currentUser.uid,
      imagen: this.state.review.imagen,
      titulo: this.state.review.titulo,
      mensaje: this.state.review.mensaje,
      valoracion: parseInt(this.state.review.valoracion) + 1,
      fecha: this.state.review.fecha,
    };

    if (review.valoracion === 6) {
      review.valoracion = 5;
    }

    await editarReview(review)
      .then((resolve) => {
        Alert.alert(resolve);
        this.props.navigation.navigate('Reviews', { recetaID: this.state.recetaID });
        this.setState({
          review: {},
        });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  setImagen = (uri) => {
    let review = this.state.review;
    review.imagen = uri.uri;
    this.setState({ review });
  };

  render() {
    return (
      <LoadingView
        loading={this.state.loading}
        size="large"
        style={styles.cargar}
        text="Cargando edición de la review..."
      >
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
                              marginTop: 10,
                            }}
                            color="#e63746"
                            size={24}
                          >
                            Editar Review 
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'montserrat-bold',
                              textAlign: 'center',
                              fontWeight: '500',
                              marginTop: 10,
                            }}
                            color="#0f1e2e"
                            size={14}
                          >
                            Edita tu review de la receta
                          </Text>
                          <Block flex space="between">
                            <Block>
                              <Block center width={width * 0.8}>
                                {/* NO SE POR QUE NO SE VE AAAAAAAAAAAAA */}
                                <Block flex={1} style={{ marginTop: 20, marginBottom: 20 }} middle>
                                  <ImagePickerExample
                                    onImagePicked={this.setImagen}
                                    defaultImage={this.state.review.imagen}
                                  />
                                </Block>
                                <Block>
                                  <Input
                                    placeholder="Titulo"
                                    style={styles.inputs}
                                    value={this.state.review.titulo}
                                    onChangeText={(titulo) => {
                                      let review = this.state.review;
                                      review.titulo = titulo;
                                      this.setState({ review });
                                    }}
                                    iconContent={
                                      <Icon size={18} name="message" family="ArgonExtra" />
                                    }
                                  />
                                  <Input
                                    placeholder="Mensaje"
                                    style={styles.inputs}
                                    value={this.state.review.mensaje}
                                    onChangeText={(mensaje) => {
                                      let review = this.state.review;
                                      review.mensaje = mensaje;
                                      this.setState({ review });
                                    }}
                                    iconContent={
                                      <Icon size={18} name="message" family="ArgonExtra" />
                                    }
                                  />
                                  <Text>Valoración:</Text>
                                  <ModalDropdown
                                    ref="dropdown"
                                    defaultValue={this.state.review.valoracion}
                                    textStyle={styles.dropdownText}
                                    style={styles.dropdown}
                                    dropdownStyle={styles.dropdownOption}
                                    options={[1, 2, 3, 4, 5]}
                                    onSelect={(value) => {
                                      let review = this.state.review;
                                      review.valoracion = value;
                                      this.setState({ review });
                                    }}
                                  />
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
                                  marginTop: 30,
                                }}
                                color="primary"
                                round
                                onPress={() => this.editReview()}
                              >
                                ACTUALIZAR
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
      </LoadingView>
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
    width: width / 4,
    height: height / 22,
    marginTop: 10,
    alignItems: 'center',
    right: 8,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: '#e63746',
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
    color: 'white',
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

export default EditReview;
