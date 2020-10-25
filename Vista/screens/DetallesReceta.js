//IMPORT
import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { withNavigation } from '@react-navigation/compat';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import { getDetallesReceta, getCategoriaReceta } from '../../Controladores/RecetaControler';
import { block } from 'react-native-reanimated';
import Receta from '../../Modelos/Receta';
import { Input, Icon} from "../components";

//CONST
const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

//CLASE DETALLES DE LA RECETA
class DetallesReceta extends React.Component {

  //TRAER DETALLES
  state = {
    detalles: {
      categorias: [],
      pasos: [],
      ingredientes: [],
    },
    id: this.props.route.params.recetaID,
  };

  onDetallesRecetas = async (detalles) => {
    await this.setState((prevState) => ({
      detalles: detalles,
    }));
    getCategoriaReceta(this.onCategoriaRecetas, this.state.detalles, this.state.detalles.categorias[0]);
  };

  onCategoriaRecetas = async (detalles) => {
    await this.setState((prevState) => ({
      detalles: detalles,
    }));
  };

  componentDidMount() {
    getDetallesReceta(this.onDetallesRecetas, this.state.id);
  }


  renderDetallesReceta = () => {
    return (
      <Block
        style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}
      >
        <Block flex={0.15} />
        <Block flex={0.48}>
          <ImageBackground
            source={this.state.detalles.imagen && { uri: this.state.detalles.imagen }}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <Block flex style={styles.profileCard}>
              <Block
                style={{position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 2 }}
              >
                <Block style={{ top: height * 0.3276, backgroundColor : "rgba(0,0,0,0.5)"}}>

                  <Block middle>

                    {/* TITULO RECETA */}
                    <Text style={styles.title} color="#ffffff">
                      {this.state.detalles.nombre}
                    </Text>

                    {/* FECHA DE PUBLICACIÓN RECETA */}
                    <Text size={12} style={styles.date}>
                      Publicada el {this.state.detalles.fecha}
                    </Text>

                  </Block>
                </Block>
              </Block>

              <Block middle row style={{ position: 'absolute', width: width, top: height * 0.6 - 22, zIndex: 99 }}></Block>
            </Block>
          </ImageBackground>
        </Block>
        <Block />

        <Block flex={0.9} style={{ padding: theme.SIZES.BASE, marginTop: 90 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex style={{ marginTop: 20 }}>

              <Block>

                {/* CATEGORIAS DE LA RECETA */}
                <Text style={{textAlign:'left',fontSize: 13,marginTop: 5,marginBottom: 30}}> 
                  Categoría: {this.state.detalles.categorias[0]}
                </Text>


                {/* PORCIONES DE LA RECETA */}
                <Block style={{flexDirection: 'row', alignSelf: 'flex-between'}}>
                <Text style={styles.subtitle}>
                  Receta para:      
                </Text>

                {/* BOTONES PARA CAMBIAR LAS PORCIONES DE LA RECETA  */}
                
                <Button small primary style={{  borderRadius: nowTheme.SIZES.BASE * 1.5, width:35, marginTop:10, marginLeft: 10, marginRight: 5}}>+</Button>
                <Button small primary style={{  borderRadius: nowTheme.SIZES.BASE * 1.5, width:35, marginTop:10, marginRight: 10}}>-</Button>
              
             
                <Text style={{color: '#2c2c2c',fontSize: 19,marginTop: 15,marginBottom: 15,zIndex: 2,}}>
                   {this.state.detalles.porcionDefecto} {this.state.detalles.unidadPorcion}
                </Text>
                
                </Block>

                <Text style={styles.subtitle}>
                  DESCRIPCIÓN
                </Text>

                <Text
                  size={16}
                  muted
                  style={styles.text}
                >
                  {this.state.detalles.descripcion}
                </Text>

                <Text
                  style={styles.subtitle}
                >
                  INGREDIENTES
                </Text>

                {this.state.detalles.ingredientes.map((ingrediente, index) => {
                  if (ingrediente.alGusto) {
                    return (
                      <Text
                        size={16}
                        muted
                        style={styles.text}
                      >
                        {ingrediente.ingrediente} al gusto.
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        size={16}
                        muted
                        style={styles.text}
                      >
                        {ingrediente.cantidad} {ingrediente.ingrediente}.
                      </Text>
                    );
                  }
                })}

                <Text
                  style={styles.subtitle}
                >
                  PREPARACIÓN
                </Text>

                {this.state.detalles.pasos.map((paso, index) => (
                  <Text
                    size={16}
                    muted
                    style={styles.text}
                  >
                    {index + 1} - {paso}
                  </Text>
                ))}
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
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
  title: {
    fontFamily: 'montserrat-bold', 
    textAlign: 'center', 
    marginBottom: theme.SIZES.BASE / 2, 
    fontWeight: '500', 
    fontSize: 24
  },
  date: {
    fontFamily: 'montserrat-regular', 
    zIndex: 2, 
    lineHeight: 25, 
    color: '#FFFFFF', 
    paddingHorizontal: 15
  },
  subtitle: {
    color: '#2c2c2c', 
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'montserrat-bold',
    marginTop: 15,
    marginBottom: 15,
    zIndex: 2,
  },
  text: {
    fontFamily: 'montserrat-regular',
    zIndex: 2,
    lineHeight: 25,
    color: '#9A9A9A',
    paddingHorizontal: 15,
    marginTop:3,
  }
});

export default withNavigation(DetallesReceta);
