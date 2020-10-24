import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { withNavigation } from '@react-navigation/compat';

import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import { getDetallesReceta } from '../../Controladores/RecetaControler'
import { block } from 'react-native-reanimated';
import Receta from '../../Modelos/Receta';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class DetallesReceta extends React.Component{

  state = {
    detalles: Receta,
    id: this.props.route.params.recetaID,
  }

  onDetallesRecetas = (detalles)=>{
    this.setState(prevState =>({
      detalles: detalles
    }));
    console.log(this.state);
  }

  componentDidMount() {
    getDetallesReceta(this.onDetallesRecetas, this.state.id);
  }

renderDetallesReceta = () => {
  return (
    <Block style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} >
      <Block flex={0.6} >
        <ImageBackground
          source= {this.state.detalles.imagen && {uri: this.state.detalles.imagen}}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
                <Block style={{ top: height * 0.3 }}>
                    {/* TITULO RECETA */}
                      
                        <Block middle >
                        <Text style={{ fontFamily: 'montserrat-bold',textAlign: "center", marginBottom: theme.SIZES.BASE / 2, fontWeight: '500',fontSize: 24 }}color='#ffffff'>
                            {this.state.detalles.nombre}
                        </Text>
                        </Block>
                </Block>
            </Block>


            <Block middle row style={{ position: 'absolute', width: width, top: height * 0.6 - 22, zIndex: 99 }}>
            </Block>

            </Block>
        </ImageBackground>

      </Block>
      <Block />

      <Block flex={1.2} style={{ padding: theme.SIZES.BASE, marginTop: 90}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={{ marginTop: 20 }}>
          
                {/* TEXTO DE RECETA, INGREDIENTES */}
            <Block middle>

                <Text style={{ color: '#2c2c2c', fontWeight: 'bold',fontSize: 19,fontFamily: 'montserrat-bold',marginTop: 15,marginBottom: 30,zIndex: 2}}>
                    INGREDIENTES
                </Text>
                
                {/* {
                  this.state.detalles.ingredientes.map((ingrediente, index) => (
                <Text size={16} muted style={{textAlign: 'center',fontFamily: 'montserrat-regular',zIndex: 2,lineHeight: 25,color: '#9A9A9A',paddingHorizontal: 15}}>
                {ingrediente.ingrediente && item.missions[0].name}
                </Text>

                  ))
                } */}

                <Text style={{color: '#2c2c2c',fontWeight: 'bold',fontSize: 19,fontFamily: 'montserrat-bold',marginTop: 15,marginBottom: 30,zIndex: 2}}>
                    PREPA
                </Text>

                <Text size={16} muted style={{textAlign: 'center',fontFamily: 'montserrat-regular',zIndex: 2,lineHeight: 25,color: '#9A9A9A',paddingHorizontal: 15}}>
                    PREPA 2
                </Text>

            </Block>


             {/* ALBUM RECETA */}
            <Block row style={{ paddingVertical: 14, paddingHorizontal: 15 }} space="between">
              <Text bold size={16} color="#2c2c2c" style={{ marginTop: 3 }}>
                Album de la Receta
                </Text>
            </Block>

            <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15}}>
              <Block row space="between" style={{ flexWrap: 'wrap' }}>
                {Images.Viewed.map((img, imgIndex) => (
                  <Image source={img} key={`viewed-${img}`} resizeMode="cover" style={styles.thumb}/>
                ))}
              </Block>
            </Block>


          </Block>
        </ScrollView>
      </Block>
   

      
      </Block>

    

  )
};

render() {
  return (
    <Block flex center style={styles.home}>
      {this.renderDetallesReceta()}
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
    height: height * 0.4,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5
  }
});

export default withNavigation(DetallesReceta);
