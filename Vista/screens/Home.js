//IMPORT
import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { Card, Button } from '../components';
import {
  getRecetas,
  getRecetasFiltroCategoria,
  getRecetasTexto,
} from '../../Controladores/RecetaControler';
import LoadingView from 'react-native-loading-view';
import { RefreshControl } from 'react-native';

//CONST
const { width } = Dimensions.get('screen');
//CLASE HOME
class Home extends React.PureComponent {
  //PARA TRAER LAS RECETAS Y CARGAR EN TRUE
  state = {
    recetas: [],
    loading: true, //Carga arriba
    refreshing: false, //Refresh
    limite: 5,
    isTab: false
  };

  //Refresh arriba
  _onRefresh = () => {
    if(!this.state.isTab || this.props.currentTab === '0'){
      this.setState({ refreshing: true });
      getRecetas(this.onRecetasRecibidas, this.state.limite).then(() => {
        this.setState({ refreshing: false });
      });
    }
  };

  onRecetasRecibidas = (recetas) => {
    this.setState((prevState) => ({
      recetas: recetas,
    }));
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  async componentDidMount() {
    console.disableYellowBox=true;
    //TEMPORIZADOR DE CARGAR
    try {
      await getRecetas(this.onRecetasRecibidas, this.state.limite);
    } catch (error) {
      console.error(error);
    }
    this.setState({
      loading: false,
    });
  }

  /**
   * Cada vez que los props se acutalicen (las variables de la busqueda de texto y tab actual)
   * Se va a ejecutar esta funcion
   *
   * @param {*} prevProps
   * @memberof Home
   */
  async componentDidUpdate(prevProps) {
    // Verificamos que el texto no sea el mismo para que no haya un bucle infinito
    if (this.props.searchText !== prevProps.searchText) {
      this.setState({
        // Pantalla de carga
        loading: true,
        isTab: true,
      });
      try {
        if (this.props.searchText.length > 0) {
          // Buscamos la recta por texto
          await getRecetasTexto(this.onRecetasRecibidas, this.props.searchText);
        } else {
          await getRecetas(this.onRecetasRecibidas, this.state.limite);
        }
      } catch (error) {
        console.error(error);
      }
      this.setState({
        // quitamos la pantalla de carga
        loading: false,
      });
    }

    // Verificamos que el tab sea otro para evitar bucles
    if (this.props.currentTab !== prevProps.currentTab) {
      this.setState({
        loading: true,
        isTab: true,
      });
      try {
        if (this.props.currentTab.length > 0) {
          // Filtramos por categoria
          await getRecetasFiltroCategoria(this.onRecetasRecibidas, this.props.currentTab);
        } else {
          await getRecetas(this.onRecetasRecibidas, this.state.limite);
        }
      } catch (error) {
        console.error(error);
      }

      this.setState({
        loading: false,
      });
    }
  }

  renderArticles = () => {
    return (
      //CARGAR

      <LoadingView
        loading={this.state.loading}
        size="large"
        style={styles.cargar}
        text="Cargando las maravillosas recetas..."
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
          refreshControl={
              //REFRESH ARRIBA
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
          }
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent) && !this.state.isTab) {
              this.handleLoadMore();
            }
          }}
          scrollEventThrottle={0}
        >
          <Block flex>
            {this.state.recetas.map((receta, index) => (
              <Block flex row key={index}>
                <Card item={receta} params={{ recetaID: receta.recetaID }} />
              </Block>
            ))}

            {/* <Block flex row >
              <Button onPress={() => this.handleLoadMore()}> CARGAR MÁS</Button>
            </Block> */}
          </Block>
        </ScrollView>
      </LoadingView>
    );
  };

  handleLoadMore = () => {
    this.setState({ limite: this.state.limite + 2 });
    getRecetas(this.onRecetasRecibidas, this.state.limite);
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

//ESTILOS
const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  cargar: {
    backgroundColor: '#ffffff',
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: 20,
  },
});

export default Home;
