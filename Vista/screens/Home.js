import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { Card, Button } from "../components";

import { getRecetas } from "../../Controladores/RecetaControler";

const { width } = Dimensions.get("screen");

class Home extends React.Component {

  state = {
    recetas: [],
  }

  onRecetasRecibidas = (recetas) => {
    console.log(recetas);
    this.setState(prevState => ({
      recetas: prevState.recetas = recetas
    }));
  }

  componentDidMount() {
      getRecetas(this.onRecetasRecibidas);
  }

  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>

          {this.state.recetas.map((receta, index) => (
          <Block flex row>
            <Card
              item={receta}
              key = {index}
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
