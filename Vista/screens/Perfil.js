import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  Alert,
} from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Card } from '../components';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import LoadingView from 'react-native-loading-view';
import { getPerfil, getBiblioteca, getRecetasUsuarios } from '../../Controladores/UsuarioControler';
import { getRecetasBiblioteca } from '../../Controladores/RecetaControler';
import { RefreshControl } from 'react-native';
import * as firebase from 'firebase';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Perfil extends React.Component {
  state = {
    biblioteca: [],
    publicaciones: [],
    usuario: {},
    isPublicaciones: true,
    loading: true,
    isLoading: false,
    refreshing: false, //Refresh
  };

  handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Está seguro que desea cerrar su sesión?', [
      {
        text: 'Si',
        onPress: () => {
          firebase
            .auth()
            .signOut()
            .then(function () {
              Alert.alert('Su sesión ha sido cerrada');
            })
            .catch(function (error) {
              Alert.alert('Error');
              console.log(error);
            });
        },
      },
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  handleAddReview = () => {
    this.props.navigation.navigate('Publicar Receta');
  };

  onPerfilRecibido = (usuario) => {
    this.setState((prevState) => ({
      usuario: usuario,
    }));
  };

  onRecetaRecibidas = (receta) => {
    let recetas = this.state.biblioteca;
    recetas.push(receta);
    this.setState({
      biblioteca: recetas,
      isPublicaciones: false,
      isLoading: false,
    });
  };

  onBibliotecaRecibida = (biblioteca) => {
    console.log(biblioteca);
    this.setState({
      isPublicaciones: false,
      isLoading: false,
    });
    getRecetasBiblioteca(biblioteca, this.onRecetaRecibidas);
  };

  getBiblioteca = async () => {
    console.log('Cargando biblioteca');
    this.setState({
      isLoading: true,
      biblioteca: [],
    });
    await getBiblioteca(this.onBibliotecaRecibida);
  };

  getPublicaciones = async () => {
    console.log('Cargando publicaciones');
    this.setState({
      isLoading: true,
    });
    await getRecetasUsuarios(this.PublicacionesRecibidas);
  };

  PublicacionesRecibidas = (publicaciones) => {
    this.setState({
      publicaciones: publicaciones,
      isPublicaciones: true,
      isLoading: false,
    });
  };

  //Refresh arriba
  _onRefresh = async () => {
    if (this.state.isPublicaciones) {
      this.setState({ refreshing: true, publicaciones: [] });
      await getRecetasUsuarios(this.PublicacionesRecibidas);
      this.setState({ refreshing: false });
    } else {
      this.setState({ refreshing: true, biblioteca: [] });
      await getBiblioteca(this.onBibliotecaRecibida);
      this.setState({ refreshing: false });
    }
  };

  async cargar() {
    console.disableYellowBox = true;
    //TEMPORIZADOR DE CARGAR
    try {
      await getPerfil(this.onPerfilRecibido);
      await getRecetasUsuarios(this.PublicacionesRecibidas);
    } catch (error) {
      console.error(error);
    }
    this.setState({
      loading: false,
    });
  }

  async cambiarUsuario() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.uid !== this.state.usuario.usuarioID) {
          console.log('aqui');
          this.cargar();
        }
      }
    });
  }

  renderPerfil = () => {
    return (
      <LoadingView
        loading={this.state.loading}
        size="large"
        style={styles.cargar}
        text="Cargando perfil..."
      >
        <Block
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Block flex={0.6}>
            {/*Background*/}
            <ImageBackground
              source={Images.ProfileBackground}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <Block flex style={styles.profileCard}>
                <Block
                  style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}
                >
                  <Block style={{ top: height * 0.21 }}>
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
                        {this.state.usuario.nombre + ' ' + this.state.usuario.apellido}
                      </Text>
                      {/*texto usuario de Mixo´s*/}
                      <Text
                        size={16}
                        color="#0f1e2e"
                        style={{
                          marginTop: 5,
                          lineHeight: 20,
                          fontSize: 18,
                          opacity: 0.8,
                          marginBottom: 5,
                        }}
                      >
                        @{this.state.usuario.usuario}
                      </Text>
                      <Block row flex style={styles.contenidoDerecha}>
                        <Text color="#0f1e2e" style={{ marginTop: 8 }}>
                          Cerrar sesión
                        </Text>
                        <GaButton
                          round
                          onlyIcon
                          shadowless
                          icon="logout"
                          iconFamily="AntDesign"
                          iconColor={'#E63746'}
                          iconSize={nowTheme.SIZES.BASE * 1.2}
                          color={'#ffffff'}
                          style={[styles.social, styles.shadow]}
                          onPress={async () => {
                            await this.handleLogout();
                            this.props.navigation.navigate('Inicio');
                          }}
                        />
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
          </Block>
          <Block />
          <Block flex={1}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                //REFRESH ARRIBA
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  text="Actualizando..."
                />
              }
            >
              {/* BTN a publicar receta */}
              <Block middle style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'montserrat-bold',
                    marginBottom: theme.SIZES.BASE / 2,
                    marginTop: 10,
                    fontWeight: '900',
                    fontSize: 15,
                  }}
                  color="#0f1e2e"
                >
                  ¿Desea publicar una receta?
                </Text>

                <Button
                  primary
                  style={{
                    borderRadius: nowTheme.SIZES.BASE * 1,
                    width: 120,
                    marginRight: 10,
                    marginLeft: 15,
                    marginBottom: 15,
                  }}
                  onPress={() => this.handleAddReview()}
                >
                  Publicar Receta
                </Button>
              </Block>
              {/* texto biblioteca */}
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop: 20,
                  fontWeight: '900',
                  fontSize: 15,
                  alignSelf: 'center',
                }}
                color="#0f1e2e"
              >
                ¿Qué desea ver de su perfil?
              </Text>
              <Block
                middle
                style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}
              >
                <Button
                  primary
                  style={{
                    borderRadius: nowTheme.SIZES.BASE * 1,
                    width: 120,
                    marginRight: 10,
                    marginLeft: 15,
                  }}
                  onPress={() => this.getPublicaciones()}
                >
                  Publicaciones
                </Button>
                <Button
                  primary
                  style={{
                    borderRadius: nowTheme.SIZES.BASE * 1,
                    width: 120,
                    marginRight: 10,
                    marginLeft: 15,
                  }}
                  onPress={() => this.getBiblioteca()}
                >
                  Biblioteca
                </Button>
              </Block>
              {/* COLOCAR AQUI ITEM PARA TRAER RECETAS DE MI LIBRERIA */}
              <LoadingView
                loading={this.state.isLoading}
                size="large"
                style={styles.cargar}
                text="Cargando..."
              >
                <Block>
                  {this.state.isPublicaciones ? (
                    <Block flex>
                      {this.state.publicaciones.map((receta, index) => (
                        <Block flex row key={index}>
                          <Card horizontal item={receta} params={{ recetaID: receta.recetaID }} />
                        </Block>
                      ))}
                    </Block>
                  ) : (
                    <Block flex>
                      {this.state.biblioteca.map((receta, index) => (
                        <Block flex row key={index}>
                          <Card horizontal item={receta} params={{ recetaID: receta.recetaID }} />
                        </Block>
                      ))}
                    </Block>
                  )}
                </Block>
              </LoadingView>
            </ScrollView>
          </Block>
        </Block>
      </LoadingView>
    );
  };

  render() {
    this.cambiarUsuario();
    return (
      <Block flex center>
        {this.renderPerfil()}
      </Block>
    );
  }
}

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
    width: nowTheme.SIZES.BASE * 2,
    height: nowTheme.SIZES.BASE * 2,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
  contenidoDerecha: {
    flex: 1,
    marginTop: 7,
    marginLeft: 190,
  },
});

export default Perfil;
