//IMPORT
import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { Card, Button } from "../components";
import { getRecetas, getRecetasFiltroCategoria, getRecetasTexto } from "../../Controladores/RecetaControler";
import LoadingView from 'react-native-loading-view'

//CONST
const { width } = Dimensions.get("screen");

//CLASE HOME
class Home extends React.Component {

    //PARA TRAER LAS RECETAS Y CARGAR EN TRUE
      state = {
        recetas: [],
        loading: true,
      }

      onRecetasRecibidas = (recetas) => {
        this.setState(prevState => ({
          recetas: recetas
        }));
      }

      componentDidMount() {
         //TEMPORIZADOR DE CARGAR
        setTimeout(() => {
          this.setState({
            loading: false
            
          })
        }, 2000)
        
        if(!this.props.route.params){
          getRecetas(this.onRecetasRecibidas);
        }
      }
      
      componentDidUpdate(nextProps) {
    
        if(this.props.route.params?.tabId){
          getRecetasFiltroCategoria(this.onRecetasRecibidas, this.props.route.params.tabId);
        }else if(this.props.route.params?.textSearcher){ 
          getRecetasTexto(this.onRecetasRecibidas, this.props.route.params.textSearcher);
        }

      }

  renderArticles = () => {
    return (
      //CARGAR
      <LoadingView loading={this.state.loading} size="large" style={styles.cargar} text="Cargando las maravillosas recetas...">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>

            {this.state.recetas.map((receta, index) => (
            <Block flex row  key = {index}>
                <Card
                item={receta}
                params={{ recetaID: receta.recetaID }}
                />
            </Block>
            ))}

        </Block>
      </ScrollView>
      </LoadingView>
    );
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
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  }, 
  cargar: {
   backgroundColor: '#c5e7e8',
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },


});

export default Home;
