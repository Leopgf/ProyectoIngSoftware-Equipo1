//IMPORT
import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { withNavigation } from '@react-navigation/compat';
import { Button } from '../components';
import { nowTheme } from '../constants';
import { getDetallesReceta, getCategoriaReceta } from '../../Controladores/RecetaControler';
import { aumentarPorcion, disminuirPorcion } from '../../Controladores/ConversorControler';
import LoadingView from 'react-native-loading-view'
import Moment from 'moment'; 

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
      loading: true,
    },
    porcion: 0,
    ingredientesCambiados: [],
    id: this.props.route.params.recetaID,
  };

  onDetallesRecetas = async (detalles) => {
    await this.setState({
      detalles: detalles,
    });

    this.state.detalles.categorias.forEach((categoria, index) => {
      getCategoriaReceta(this.onCategoriaRecetas, this.state.detalles, categoria, index);
    });

    
  };

  onCategoriaRecetas = async (detalles) => {
    await this.setState({
      detalles: detalles,
    });
  };

  
  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
        
      })
    }, 2000);
    await getDetallesReceta(this.onDetallesRecetas, this.state.id);
    this.setState({
      porcion: this.state.detalles.porcionDefecto,
      ingredientesCambiados: this.state.detalles.ingredientes,
    });
   
  }
  
    //FUNCIONES PARA CONVERTIR LAS PORCIONES
    botonAumentar = () => {
      aumentarPorcion(this.state.id, this.state.porcion, this.onPorcionCambiada);
    }
    
    botonDisminuir = () => {
      disminuirPorcion(this.state.id, this.state.porcion, this.onPorcionCambiada)  
    }
  
    onPorcionCambiada = (ingredientes, porciones) => {
      this.setState({
        ingredientesCambiados: ingredientes,
        porcion: porciones
      });
    }
  


  renderDetallesReceta = () => {
    return (
      <LoadingView loading={this.state.loading} size="large" style={styles.cargar} text="Cargando detalles de la receta...">
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
                <Block style={{ top: height * 0.2, backgroundColor : "rgba(0,0,0,0.5)", marginTop:100}}>

                  <Block middle>

                    {/* TITULO RECETA */}
                    <Text style={styles.title} color="#ffffff">
                      {this.state.detalles.nombre}
                    </Text>

                    {/* FECHA DE PUBLICACIÓN RECETA */}
                    <Text size={12} style={styles.date}>
                      Publicada el {Moment(this.state.detalles.fecha).format("DD/MM/YYYY")}
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

                <Block style={{flexDirection: 'row', alignSelf: 'flex-between'}}>
                  {/* CATEGORIAS DE LA RECETA */}
                  <Text style={{textAlign:'left',fontSize: 13,marginTop: 5,marginBottom: 30}}> 
                    {'Categorías: '}
                  </Text>
                  {
                    this.state.detalles.categorias.map((categoria, index) => {
                      if(index === (this.state.detalles.categorias.length - 1)){
                        return (
                          <Text key={categoria} style={{textAlign:'left',fontSize: 13,marginTop: 5,marginBottom: 30}}> 
                          {categoria + '.'}
                          </Text>
                        )
                      }else{
                        return (
                          <Text key={categoria} style={{textAlign:'left',fontSize: 13,marginTop: 5,marginBottom: 30}}> 
                          {categoria + ', '}
                          </Text>
                        )
                      }
                    })
                  }
                </Block>


                {/* PORCIONES DE LA RECETA */}
                <Block style={{flexDirection: 'row', alignSelf: 'flex-between'}}>
                <Text style={styles.subtitle}>
                  Receta para:      
                </Text>

                {/* BOTONES PARA CAMBIAR LAS PORCIONES DE LA RECETA  */}
                
                {/*Aqui pasaste unidadPorcion y era porcionDefecto, porque unidad porcion no existe jajaja*/}
                <Button small primary style={{  borderRadius: nowTheme.SIZES.BASE * 1.5, width:35, marginTop:10, marginLeft: 10, marginRight: 5}} 
                onPress={() => this.botonDisminuir()}
                >-</Button>
                <Button small primary style={{  borderRadius: nowTheme.SIZES.BASE * 1.5, width:35, marginTop:10, marginRight: 10}} 
                onPress={() => this.botonAumentar()}
                >+</Button>
              
             
                <Text style={{color: '#2c2c2c',fontSize: 19,marginTop: 15,marginBottom: 15,zIndex: 2,}}>
                   {this.state.porcion} {this.state.detalles.unidadPorcion}
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

                {this.state.ingredientesCambiados.map((ingrediente, index) => {
                  if (ingrediente.alGusto) {
                    return (
                      <Text
                        key={ingrediente}
                        size={16}
                        muted
                        style={styles.text}
                      >
                        {ingrediente.ingrediente} al gusto.
                      </Text>
                    );
                  } else {
                    return (
                      <Text>
                          <Text key={ingrediente} size={16} muted style={styles.textNegrita}>
                            {ingrediente.cantidad + ' '}   
                          </Text>
                          <Text key={index} size={16} muted style={styles.text} >
                            {ingrediente.ingrediente}.
                          </Text>
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
                  <Text>
                      <Text key={paso} size={16} muted style={styles.textNegrita}>
                        {index + 1} -   
                      </Text>
                      <Text key={index * 100} size={16} muted style={styles.text}>
                         {' '+paso}
                      </Text>
                  </Text>

                ))}
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
      </LoadingView>
      
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
    fontWeight: 'bold',

  },
  textNegrita: {
    fontFamily: 'montserrat-bold',
    zIndex: 2,
    lineHeight: 25,
    color: '#9A9A9A',
    paddingHorizontal: 15,
    marginTop:3,
    fontWeight: 'bold',

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
   }
});

export default withNavigation(DetallesReceta);
