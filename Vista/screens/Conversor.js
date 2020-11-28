// NO SE ESTÁ USANDO

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LoadingView from 'react-native-loading-view';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { Button } from '../components';

class Conversor extends React.Component {

  state = {
    loading: true,
  };

  async componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  renderConversor = () => {
    return (
      <LoadingView
        loading={this.state.loading}
        size="large"
        style={styles.cargar}
        text="Cargando conversor de unidades..."
      >
        <Block flex={0.9} style={{ padding: theme.SIZES.BASE, marginTop: 90 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
            
            <Block>
              <Text>
                CONVERSOR DE NICOLITA
              </Text>
            </Block>

            </ScrollView>
        </Block>
      </LoadingView>
    );  
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderConversor()}
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

export default Conversor;
