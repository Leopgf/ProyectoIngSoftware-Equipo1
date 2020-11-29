import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Card } from '../components';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import LoadingView from 'react-native-loading-view';
import { getPerfil, getBiblioteca } from '../../Controladores/UsuarioControler';
import { getRecetasBiblioteca } from '../../Controladores/RecetaControler';
import { RefreshControl } from 'react-native';
import * as firebase from 'firebase';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Perfil extends React.Component {
  state = {
    recetas: [],
    usuario: {},
    loading: true,
    refreshing: false, //Refresh
  };

  handleAddReview = () => {
    this.props.navigation.navigate('Publicar Receta');
  }

  onPerfilRecibido = (usuario) => {
    this.setState((prevState) => ({
      usuario: usuario,
    }));
  };

  onRecetaRecibidas = (receta) => {
    let recetas = this.state.recetas;
    recetas.push(receta);
    this.setState({
      recetas: recetas,
    });
  };

  onBibliotecaRecibida = (biblioteca) => {
    getRecetasBiblioteca(biblioteca, this.onRecetaRecibidas);
  };

  //Refresh arriba
  _onRefresh = () => {
    this.setState({ refreshing: true, recetas: [] });
    getBiblioteca(this.onBibliotecaRecibida).then(() => {
      this.setState({ refreshing: false });
    });
  };

  async cargar() {
    //TEMPORIZADOR DE CARGAR
    try {
      await getPerfil(this.onPerfilRecibido);
      await getBiblioteca(this.onBibliotecaRecibida);
    } catch (error) {
      console.error(error);
    }
    this.setState({
      loading: false,
    });
  }

  async cambiarUsuario() {
    await firebase.auth().onAuthStateChanged((user) => {
      if(user){
        if(user.uid !== this.state.usuario.usuarioID){
          console.log('aqui');
          this.cargar();
        }
      }
    })
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
                        {this.state.usuario.nombre + ' ' + this.state.usuario.apellido}
                      </Text>
                      {/*texto usuario de Mixo´s*/}
                      <Text
                        size={16}
                        color="#0f1e2e"
                        style={{ marginTop: 5, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
                      >
                        @{this.state.usuario.usuario}
                      </Text>
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
                  text="Actualizando biblioteca..."
                />
              }
            >
              {/* BTN a publicar receta */}
            <Block middle style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  marginBottom: theme.SIZES.BASE / 2,
                  marginTop:10,
                  fontWeight: '900',
                  fontSize: 15,
                }}
                color="#0f1e2e"
              >
              ¿Desea publicar una receta?
              </Text>
            
            <Button
                primary
                style={{ borderRadius: nowTheme.SIZES.BASE * 1, width: 120, marginRight: 10,marginLeft: 15 }}
                onPress={() => this.handleAddReview()}>
                  Publicar Receta
                </Button> 

            </Block>
  {/* texto biblioteca */}
              <Block middle style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
            
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
              </Block>
              {/* COLOCAR AQUI ITEM PARA TRAER RECETAS DE MI LIBRERIA */}

              <Block flex>
                {this.state.recetas.map((receta, index) => (
                  <Block flex row key={index}>
                    <Card horizontal item={receta} params={{ recetaID: receta.recetaID }} />
                  </Block>
                ))}
              </Block>
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
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
});

export default Perfil;
