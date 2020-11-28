// NO SE ESTÁ USANDO

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LoadingView from 'react-native-loading-view';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { Button } from '../components';

class Reviews extends React.Component {

  state = {
    loading: true,
    user: false,
    reviews: [],
    recetaID: this.props.route.params.recetaID,
  };

  onDetallesRecetas = async (detalles) => {
    // await this.setState({
    //   detalles: detalles,
    // });

    // this.state.detalles.categorias.forEach((categoria, index) => {
    //   getCategoriaReceta(this.onCategoriaRecetas, this.state.detalles, categoria, index);
    // });
  };

  handleAddReview = () => {
    this.props.navigation.navigate('Escribir Review',{recetaID: this.state.recetaID});
  }

  async componentDidMount() {
    // try {
    //   await getDetallesReceta(this.onDetallesRecetas, this.state.id);
    //   await this.isUser();
    // } catch (error) {
    //   console.error(error);
    // }
    this.setState({
      loading: false,
    });
    // this.setState({
    //   porcion: this.state.detalles.porcionDefecto,
    //   ingredientesCambiados: this.state.detalles.ingredientes,
    // });
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
            
            <Block>
              <Text>
                REVIEWS
              </Text>
            </Block>

            <Block>
              <Button onPress={ () => this.handleAddReview()}>
                ESCRIBIR REVIEW
              </Button>
            </Block>

            </ScrollView>
        </Block>
      </LoadingView>
    );  
  }

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
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  }
});

export default Reviews;
