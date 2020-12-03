// NO SE ESTÁ USANDO

import React from 'react';
import { ScrollView, StyleSheet, ImageBackground,Dimensions } from 'react-native';
import LoadingView from 'react-native-loading-view';
import { Images} from '../constants';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { Button, Card } from '../components';

import { getReviews, getUsuarioReviewReceta } from '../../Controladores/RecetaControler';
import * as firebase from 'firebase';


const { width, height } = Dimensions.get('screen');

class Reviews extends React.Component {
  state = {
    loading: true,
    user: false,
    reviews: [],
    recetaID: this.props.route.params.recetaID,
    usuarioActual: '',
  };

  handleAddReview = () => {
    this.props.navigation.navigate('Escribir Review', { recetaID: this.state.recetaID });
  };

  handleLogin = () => {
    this.props.navigation.navigate('Iniciar Sesión', { recetaID: this.state.recetaID });
  };

  onReviewsRecibidas = async (reviews) => {
    await this.setState({
      reviews: reviews,
    });

    this.state.reviews.forEach((review, index) => {
      getUsuarioReviewReceta(this.onUserReviewRecetas, this.state.reviews, review.userID, index);
    });
  };

  onUserReviewRecetas = async (reviews) => {
    await this.setState({
      reviews: reviews,
    });
  };

  async componentDidMount() {
    //TEMPORIZADOR DE CARGAR
    console.disableYellowBox=true;
    try {
      await getReviews(this.state.recetaID, this.onReviewsRecibidas);
      if (firebase.auth().currentUser) {
        await firebase.firestore().collection('Usuarios').where('usuarioID', '==', firebase.auth().currentUser.uid).get().then((usuarios) => {
          usuarios.forEach((usuario) => {
            this.setState({user: true, usuarioActual: usuario.data().usuario});
          })
        })
      } else{
        this.setState({user: false});
      }
    } catch (error) {
      console.error(error);
    }
    this.setState({
      loading: false,
    });
  }
  

  renderReviews = () => {
    return (
      <LoadingView
        loading={this.state.loading}
        size="large"
        style={styles.cargar}
        text="Cargando Reviews..."
      >

          <Block flex={0.6}>
          {/*Background*/}
          <ImageBackground
            source={Images.Review}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <Block flex style={styles.profileCard}>
              <Block
                style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}
              >
                <Block style={{ top: height * 0.17 }}>
                  <Block middle>
                    {/*nombre "conversor"*/}
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
                    {/*texto de conversor de Mixo´s*/}
                    <Text
                      size={16}
                      color="#0f1e2e"
                      style={{ marginTop: 5, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
                    >
                      Reviews de la receta
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>

        <Block flex={0.9} style={{ padding: theme.SIZES.BASE, marginTop: 50}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block middle style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text   size={16}
              color="#0f1e2e"
              style={{ marginTop: 5, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
           >¿Desea publicar una Review de la Receta?</Text>
            </Block>

            {this.state.user ? (
              <Block style={{ marginTop: 6}}>
               <Button onPress={() => this.handleAddReview()}>ESCRIBIR REVIEW</Button>
              </Block>
            ) : (
              <Block style={{marginTop: 3}}>
                <Button onPress={() => this.handleLogin()}>
                  INICIAR SESIÓN PARA PUBLICAR REVIEW
                </Button>
              </Block>
            )}

            {this.state.reviews.length !== 0 ? (
              <Block flex>
                {this.state.reviews.map((review, index) => {
                  if (this.state.usuarioActual === review.userID) {
                    return (
                      <Block flex row key={index}>
                        <Card item={review} horizontal isActualUser={true} method={this.onReviewsRecibidas}/>
                      </Block>
                    );
                  } else {
                    return (
                      <Block flex row key={index}>
                        <Card item={review} horizontal isActualUser={false} method={this.onReviewsRecibidas}/>
                      </Block>
                    );
                  }
                })}
              </Block>
            ) : (
              <Block flex>
                <Text  size={16}
                color="#0f1e2e"
                style={{ marginTop: 20, lineHeight: 20, fontSize: 18, opacity: 0.8 }}>No hay Reviews para esta receta</Text>
              </Block>
            )}
          </ScrollView>
        </Block>
      </LoadingView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderReviews()}
      </Block>
    );
  }
}

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

export default Reviews;
