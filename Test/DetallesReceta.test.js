import React from 'react';
import renderer from 'react-test-renderer';

import { StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { nowTheme } from '../Vista/constants';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;


describe('<DetallesReceta />', () => {
  //
    it('renders correctly', () => {
        const tree = renderer.create(
            <Block
        style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}
      >
        <Block flex={0.15} />
        <Block flex={0.48}>
          <ImageBackground
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
                      Nombre
                    </Text>

                    {/* FECHA DE PUBLICACIÓN RECETA */}
                    <Text size={12} style={styles.date}>
                      Publicada el 
                    </Text>

                  </Block>
                </Block>
              </Block>

              <Block middle row style={{ position: 'absolute', width: width, top: height * 0.6 - 22, zIndex: 99 }}></Block>
            </Block>
          </ImageBackground>
        </Block>
        <Block />

        
      </Block>
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
    it('renders correctly', () => {
        const tree = renderer.create(
            <Block flex={0.9} style={{ padding: theme.SIZES.BASE, marginTop: 90 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex style={{ marginTop: 20 }}>

              <Block>

                <Block style={{flexDirection: 'row', alignSelf: 'flex-between'}}>
                  <Text style={{textAlign:'left',fontSize: 13,marginTop: 5,marginBottom: 30}}> 
                    {'Categorías: '}
                  </Text>
                  
                          <Text style={{textAlign:'left',fontSize: 13,marginTop: 5,marginBottom: 30}}> 
                          Categoria final
                          </Text>
                        
                          <Text style={{textAlign:'left',fontSize: 13,marginTop: 5,marginBottom: 30}}> 
                           Categoria
                          </Text>
                        
                </Block>

                <Block style={{flexDirection: 'row', alignSelf: 'flex-between'}}>
                <Text style={styles.subtitle}>
                  Receta para:      
                </Text>

                 <Button small primary style={{  borderRadius: nowTheme.SIZES.BASE * 1.5, width:35, marginTop:10, marginLeft: 10, marginRight: 5}} 
                >-</Button>
                <Button small primary style={{  borderRadius: nowTheme.SIZES.BASE * 1.5, width:35, marginTop:10, marginRight: 10}} 
                >+</Button>
              
             
                <Text style={{color: '#2c2c2c',fontSize: 19,marginTop: 15,marginBottom: 15,zIndex: 2,}}>
                   Porcion
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
                  Descripcion
                </Text>

                <Text
                  style={styles.subtitle}
                >
                  INGREDIENTES
                </Text>

                
                      <Text
                        size={16}
                        muted
                        style={styles.text}
                      >
                        Ingrediente al gusto.
                      </Text>
                      <Text>
                          <Text size={16} muted style={styles.textNegrita}>
                            Ingrediente cantidad 
                          </Text>
                          <Text size={16} muted style={styles.text} >
                            Ingrediente
                          </Text>
                      </Text>

                <Text
                  style={styles.subtitle}
                >
                  PREPARACIÓN
                </Text>

                  <Text>
                      <Text size={16} muted style={styles.textNegrita}>
                        # 
                      </Text>
                      <Text size={16} muted style={styles.text}>
                         paso
                      </Text>
                  </Text>

              </Block>
            </Block>
          </ScrollView>
        </Block>
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
});

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
  
    }
  });