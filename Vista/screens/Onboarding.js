//IMPORT
import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
//CONST
const { height, width } = Dimensions.get('screen');

//CLASE Onboarding INICIO APP
export default class Onboarding extends React.Component {

  async componentDidMount() {
    console.disableYellowBox=true;
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
             {/* IMAGEN DE FONDO*/}
            <ImageBackground source={Images.Onboarding} style={{ flex: 1, height: height, width, zIndex: 1 ,  background: 'white' }}/>

            <Block space="between" style={styles.padded}>
                <Block>
                  <Block middle>
                    {/* IMAGEN DEL LOGO GRANDE*/}
                    <Image source={Images.NowLogo} style={{ width: 300, height: 300, bottom: 200, position: 'absolute', marginBottom: 50}} />
                  </Block>
                <Block>

                <Block middle>
                   {/* TEXTO DE BIENVENIDA*/}
                  <Text style={{marginBottom: 180, fontFamily: 'montserrat-regular', bottom: 50, position: 'absolute', letterSpacing: 2, paddingHorizontal: 10, textAlign: 'center'}}
                    color="#0F1E2E" size={35}>
                      ¡BIENVENIDO!
                  </Text>
                </Block>
              </Block>
          
              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2
                }}
              >
              {/* BTN DE EMPEZAR*/}
                <Button
                  shadowless
                  style={styles.button}
                  color={'#0F1E2E'}
                  onPress={() => navigation.navigate('App')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={'#E7ECEF'}
                  >
                    EMPEZAR
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

//ESTILOS DEL INICIO APP
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
