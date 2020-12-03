import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Images, nowTheme } from '../constants';
import LoadingView from 'react-native-loading-view';
import ModalDropdown from 'react-native-modal-dropdown';
import { Button, Icon, Input } from '../components';
import ImagePickerExample from '../components/ImagePicker';
import { getCategoriasHome } from '../../Controladores/RecetaControler';
import * as firebase from 'firebase';
import { agregarReceta } from '../../Controladores/UsuarioControler';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class AddReceta extends React.Component {
  state = {
    imagen: '',
    nombre: '',
    descripcion: '',
    porcionDefecto: 1,
    unidadPorcion: '',
    categorias: [''],
    pasos: [''],
    ingredientes: [],
    loading: true,
    listaCategorias: [],
    idCategorias: [],
  };

  setImagen = (uri) => {
    this.setState({ imagen: uri.uri });
  };

  onCategoriesFetch = (listaCategorias) => {
    let lista = [];
    let idCategorias = [];
    listaCategorias.forEach((categoria, index) => {
      if (index !== 0) {
        lista.push(categoria.title);
        idCategorias.push(categoria.id);
      }
    });
    this.setState({
      listaCategorias: lista,
      idCategorias: idCategorias,
    });
  };

  addClick() {
    this.setState((prevState) => ({ pasos: [...prevState.pasos, ''] }));
  }

  removeClick(i) {
    let pasos = this.state.pasos;
    pasos.splice(i, 1);
    this.setState({ pasos });
  }

  addClickIngrediente() {
    this.setState((prevState) => ({
      ingredientes: [
        ...prevState.ingredientes,
        {
          alGusto: false,
          cantidad: '',
          ingrediente: '',
        },
      ],
    }));
  }

  removeClickIngrediente(i) {
    let ingredientes = this.state.ingredientes;
    ingredientes.splice(i, 1);
    this.setState({ ingredientes });
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    try {
      await getCategoriasHome(this.onCategoriesFetch);
    } catch (error) {
      console.error(error);
    }
    this.setState({
      loading: false,
    });
  }

  async publicarReceta() {
    // Publicar receta
    const receta = {
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      porcionDefecto: parseInt(this.state.porcionDefecto, 10),
      unidadPorcion: this.state.unidadPorcion,
      categorias: this.state.categorias,
      pasos: this.state.pasos,
      imagen: this.state.imagen,
      ingredientes: this.state.ingredientes,
      fecha: new Date(),
    };

    await agregarReceta(receta)
      .then((resolve) => {
        Alert.alert(resolve);
        this.setState({
          imagen: '',
          nombre: '',
          descripcion: '',
          porcionDefecto: 1,
          unidadPorcion: '',
          categorias: [''],
          pasos: [''],
          ingredientes: [],
        });
        this.renderAddReceta();
        this.props.navigation.navigate('Inicio');
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  renderAddReceta = () => {
    return (
      <LoadingView
        loading={this.state.loading}
        size="large"
        style={styles.cargar}
        text="Cargando Publicar Receta..."
      >
        <Block flex middle>
          <ImageBackground
            source={Images.AddReceta}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentInset={{ top: 30, left: 0, bottom: 60, right: 0 }}
                >
                  <Block flex space="evenly">
                    <Block flex={0.4} middle>
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
                          Publicar Receta
                        </Text>
                      </Block>
                    </Block>
                    <Block flex={0.1} middle style={{ marginTop: 10 }}>
                      <Text color="#0f1e2e" size={16}>
                        ¡Publica tus recetas con nosotros!
                      </Text>
                    </Block>
                    <Block flex={1} middle space="between">
                      <Block center flex={0.9}>
                        <Block flex space="between">
                          <Block>
                            <Block flex style={{ marginTop: 10 }}>
                              <ImagePickerExample onImagePicked={this.setImagen} />
                            </Block>
                            <Block flex center width={width * 0.8}>
                              <Input
                                placeholder="Título de la Receta"
                                style={styles.inputs}
                                onChangeText={(nombre) => this.setState({ nombre })}
                                iconContent={<Icon size={18} name="tag" family="AntDesign" />}
                              />
                            </Block>
                            <Block flex center width={width * 0.8}>
                              <Input
                                placeholder="Descripción de la Receta"
                                style={styles.inputs}
                                onChangeText={(descripcion) => this.setState({ descripcion })}
                                iconContent={<Icon size={18} name="text" family="Entypo" />}
                              />
                            </Block>
                            <Block flex center width={width * 0.8}>
                              <Input
                                placeholder="Porción por defecto de la receta"
                                // keyboardType="numeric"
                                style={styles.inputs}
                                onChangeText={(porcionDefecto) => {
                                  let numreg = /^[0-9]+$/;
                                  if (numreg.test(porcionDefecto)) {
                                    this.setState({ porcionDefecto });
                                  }else{
                                    Alert.alert('Por favor introduzca solo números en la porción de la receta.')
                                  }
                                }}
                                iconContent={<Icon size={18} name="text" family="Entypo" />}
                              />
                            </Block>
                            <Block flex center width={width * 0.8}>
                              <Input
                                placeholder="Unidad de las porciones de la Receta"
                                style={styles.inputs}
                                onChangeText={(unidadPorcion) => this.setState({ unidadPorcion })}
                                iconContent={<Icon size={18} name="text" family="Entypo" />}
                              />
                            </Block>
                            <Block flex center width={width * 0.8}>
                              <Block row flex center>
                                <Text color="#0f1e2e" size={16} style={{ marginTop: 10 }}>
                                  Categoría:
                                </Text>
                                <ModalDropdown
                                  ref="dropdown"
                                  defaultValue={'Seleccione'}
                                  textStyle={styles.dropdownText}
                                  style={styles.dropdown}
                                  dropdownStyle={styles.dropdownOption}
                                  options={this.state.listaCategorias}
                                  onSelect={(value) => {
                                    let categorias = this.state.categorias;
                                    categorias[0] = this.state.idCategorias[value];
                                    this.setState({ categorias });
                                  }}
                                />
                              </Block>
                              <Block flex center width={width * 0.8}>
                                <Block
                                  row
                                  flex
                                  center
                                  style={{
                                    marginTop: 15,
                                    backgroundColor: '#ffffff',
                                    borderRadius: 50,
                                    alignSelf: 'center',
                                    padding: 10,
                                  }}
                                >
                                  <Text color="#e63746" size={12}>
                                    Click en + para añadir un paso y en - para eliminar un paso
                                    específico.
                                  </Text>
                                </Block>
                                <Block row flex center>
                                  <Text color="#0f1e2e" size={16} style={{ marginTop: 10 }}>
                                    Pasos de la receta:
                                  </Text>
                                  <Button
                                    style={{
                                      fontFamily: 'montserrat-bold',
                                      borderRadius: nowTheme.SIZES.BASE * 1.5,
                                      width: 30,
                                      height: 30,
                                      marginTop: 10,
                                      marginLeft: 5,
                                    }}
                                    color="primary"
                                    round
                                    onPress={() => this.addClick()}
                                  >
                                    +
                                  </Button>
                                </Block>
                                {this.state.pasos.map((paso, i) => (
                                  <Block flex syle={{ flexDirection: 'row' }} key={i}>
                                    <Block row flex center style={{ marginTop: 10 }} key={i}>
                                      <Input
                                        placeholder={`Paso ${i + 1}`}
                                        style={styles.inputs}
                                        iconContent={
                                          <Icon size={18} name="tag" family="AntDesign" />
                                        }
                                        value={paso || ''}
                                        onChangeText={(paso) => {
                                          let pasos = this.state.pasos;
                                          pasos[i] = paso;
                                          this.setState({ pasos });
                                        }}
                                      />
                                      <Button
                                        style={{
                                          fontFamily: 'montserrat-bold',
                                          borderRadius: nowTheme.SIZES.BASE * 1.5,
                                          width: 30,
                                          height: 30,
                                          marginTop: 0,
                                          marginLeft: 5,
                                        }}
                                        color="primary"
                                        round
                                        onPress={() => this.removeClick(i)}
                                      >
                                        -
                                      </Button>
                                    </Block>
                                  </Block>
                                ))}
                              </Block>
                              <Block flex center width={width * 0.8} style={{ marginTop: 20 }}>
                                <Block
                                  row
                                  flex
                                  center
                                  style={{
                                    marginTop: 15,
                                    margin: 5,
                                    backgroundColor: '#ffffff',
                                    borderRadius: 50,
                                    alignSelf: 'center',
                                    padding: 10,
                                  }}
                                >
                                  <Text color="#e63746" size={12}>
                                    Click en + para añadir un ingrediente y en - para eliminar un
                                    ingrediente específico.
                                  </Text>
                                </Block>
                                <Block row flex center>
                                  <Text color="#0f1e2e" size={16}>
                                    Ingredientes:
                                  </Text>
                                  <Button
                                    style={{
                                      fontFamily: 'montserrat-bold',
                                      borderRadius: nowTheme.SIZES.BASE * 1.5,
                                      width: 30,
                                      height: 30,
                                      marginLeft: 10,
                                    }}
                                    color="primary"
                                    round
                                    onPress={() => this.addClickIngrediente()}
                                  >
                                    +
                                  </Button>
                                </Block>

                                {this.state.ingredientes.map((ingrediente, i) => (
                                  <Block flex syle={{ flexDirection: 'row' }} key={i}>
                                    <Block flex center row>
                                      <ModalDropdown
                                        ref="dropdown"
                                        defaultValue={'Cantidad'}
                                        textStyle={styles.dropdownText}
                                        style={styles.dropdown}
                                        dropdownStyle={styles.dropdownOption}
                                        options={['Al gusto', 'Cantidad']}
                                        onSelect={(value) => {
                                          console.log(value);
                                          if (value == 0) {
                                            let ingredientes = this.state.ingredientes;
                                            ingredientes[i].alGusto = true;
                                            this.setState({ ingredientes });
                                          } else {
                                            let ingredientes = this.state.ingredientes;
                                            ingredientes[i].alGusto = false;
                                            this.setState({ ingredientes });
                                          }
                                        }}
                                      />
                                      <Button
                                        style={{
                                          fontFamily: 'montserrat-bold',
                                          borderRadius: nowTheme.SIZES.BASE * 1.5,
                                          width: 30,
                                          height: 30,
                                          marginLeft: 2,
                                          marginTop: 10,
                                        }}
                                        color="primary"
                                        round
                                        onPress={() => this.removeClickIngrediente(i)}
                                      >
                                        -
                                      </Button>
                                    </Block>
                                    {!this.state.ingredientes[i].alGusto ? (
                                      <Input
                                        placeholder={`Cantidad del ingrediente ${i + 1}`}
                                        style={styles.inputs}
                                        keyboardType="numeric"
                                        iconContent={
                                          <Icon size={18} name="tag" family="AntDesign" />
                                        }
                                        value={ingrediente.cantidad || ''}
                                        onChangeText={(cantidad) => {
                                          let numreg = /^[0-9]+$/;
                                          if (numreg.test(cantidad)) {
                                            //test ok
                                            let ingredientes = this.state.ingredientes;
                                            ingredientes[i].cantidad = parseInt(cantidad, 10);
                                            this.setState({ ingredientes });
                                          } else {
                                            //test not ok
                                            Alert.alert(
                                              'Por favor introduzca solo números en la cantidad del ingrediente.'
                                            );
                                          }
                                        }}
                                      />
                                    ) : null}
                                    <Input
                                      placeholder={`Ingrediente ${i + 1}`}
                                      style={styles.inputs}
                                      iconContent={<Icon size={18} name="tag" family="AntDesign" />}
                                      value={ingrediente.ingrediente || ''}
                                      onChangeText={(ingrediente) => {
                                        let ingredientes = this.state.ingredientes;
                                        ingredientes[i].ingrediente = ingrediente;
                                        this.setState({ ingredientes });
                                      }}
                                    />
                                  </Block>
                                ))}
                              </Block>
                            </Block>
                          </Block>
                          <Block center style={{ marginTop: 10 }}>
                            <Button
                              style={{
                                fontFamily: 'montserrat-bold',
                                borderRadius: nowTheme.SIZES.BASE * 1.5,
                                width: 200,
                              }}
                              color="primary"
                              round
                              onPress={() => this.publicarReceta()}
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
      </LoadingView>
    );
  };
  render() {
    return (
      <Block flex center>
        {this.renderAddReceta()}
      </Block>
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
  dropdown: {
    marginLeft: 15,
    alignSelf: 'center',
    width: width / 3,
    height: height / 24,
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
    marginVertical: 7,
    marginHorizontal: 6,
    fontSize: 15,
    color: '#c2c1c1',
    textAlign: 'center',
    textAlignVertical: 'center',
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

export default AddReceta;
