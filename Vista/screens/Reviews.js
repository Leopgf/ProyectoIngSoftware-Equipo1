// NO SE ESTÁ USANDO

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LoadingView from 'react-native-loading-view';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { Button, Card } from '../components';

import { getReviews, getUsuarioReviewReceta } from '../../Controladores/RecetaControler';
import * as firebase from 'firebase';

class Reviews extends React.Component {
  state = {
    loading: true,
    user: false,
    reviews: [],
    recetaID: this.props.route.params.recetaID,
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
    try {
      await getReviews(this.state.recetaID, this.onReviewsRecibidas);
      if (await firebase.auth().currentUser) {
        this.setState({ user: true });
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
        text="Cargando reviews..."
      >
        <Block flex={0.9} style={{ padding: theme.SIZES.BASE, marginTop: 90 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex>
              <Text>REVIEWS</Text>
            </Block>

            {this.state.user ? (
              <Block>
                <Button onPress={() => this.handleAddReview()}>ESCRIBIR REVIEW</Button>
              </Block>
            ) : 
            (<Block>
              <Button onPress={() => this.handleLogin()}>INICIAR SESIÓN PARA PUBLICAR REVIEW</Button>
            </Block>)
            }

            {this.state.reviews.length !== 0 ? (
              <Block flex>
                {this.state.reviews.map((review, index) => (
                  <Block flex row key={index}>
                    <Card item={review} horizontal />
                  </Block>
                ))}
              </Block>
            ) : (
              <Block flex>
                <Text>No hay reviews para esta receta</Text>
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
});

export default Reviews;
