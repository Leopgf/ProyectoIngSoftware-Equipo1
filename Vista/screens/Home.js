//IMPORT
import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { Card, Button } from "../components";
import { getRecetas, getRecetasFiltroCategoria, getRecetasTexto } from "../../Controladores/RecetaControler";

//CONST
const { width } = Dimensions.get("screen");

//CLASE HOME
class Home extends React.Component {

    //PARA TRAER LAS RECETAS
      state = {
        recetas: [],
      }

      onRecetasRecibidas = (recetas) => {
        this.setState(prevState => ({
          recetas: recetas
        }));
      }

      componentDidMount() {
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

      //RECETAS QUE SE VEN EN EL HOME
  renderArticles = () => {
    return (
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

  }
});

export default Home;
