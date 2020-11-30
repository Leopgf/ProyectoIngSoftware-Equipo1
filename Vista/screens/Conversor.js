import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform,  TouchableOpacity } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Images, nowTheme } from '../constants';
import LoadingView from 'react-native-loading-view';
import ModalDropdown from 'react-native-modal-dropdown';


const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Conversor extends React.Component {


  state = {
    loading: true,
    
  };
  
//TEMPORIZADOR DE INICIO CARGA DE CONVERSOR CON TIEMPO INDICADO 
  componentDidMount = () => {

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 3000)
  }

  renderConversor = () => {
    return (
        <LoadingView
          loading={this.state.loading}
          size="large"
          style={styles.cargar}
          text="Cargando conversor..."
        >
        <Block
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Block flex={0.6}>
            {/*Background*/}
            <ImageBackground
              source={Images.Conversor}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <Block flex style={styles.profileCard}>
                <Block
                  style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}
                >
                  <Block style={{ top: height * 0.23 }}>
                    <Block middle>
                      {/*nombre "conversor"*/}
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          marginBottom: theme.SIZES.BASE / 2,
                          fontWeight: '900',
                          fontSize: 30,
                        }}
                        color="#e63746"
                      >
                       Conversor
                      </Text>
                      {/*texto de conversor de Mixo´s*/}
                      <Text
                        size={16}
                        color="#0f1e2e"
                        style={{ marginTop: 5, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
                      >
                        Conversor de Unidades de Mixo's
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
          </Block>
          <Block />
          <Block flex={1}>
            <ScrollView
              showsVerticalScrollIndicator={false}
             
            >
              <Block middle style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text
                  size={16}
                  color="#0f1e2e"
                  style={{ marginTop: 5, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
                >
                  Seleccione con qué unidades desea trabajar y los números
                </Text>
              </Block>

              <Block flex>
              <Text
                  size={16}
                  color="#0f1e2e"
                  style={{ marginTop: 5, lineHeight: 20, fontSize: 18, opacity: 0.8 }}
                >
                  Seleccione con qué unidades desea trabajar y los números
                </Text>
              <ModalDropdown ref="dropdown" textStyle={styles.dropdownText} style={styles.dropdown} dropdownStyle={styles.dropdownOption} options={['option 1', 'option 2']}/>
              </Block>


              
              





            </ScrollView>
          </Block>
        </Block>
      </LoadingView>
    );
  };
  render() {
   
    return (
      <Block flex center>
        {this.renderConversor()}
      </Block>

     ); }
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
    height: height * 0.35,
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
  
  dropdown: {
    alignSelf: 'flex-end',
    width: 150,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: '#e63746',
  },

  dropdownOption:{
    width: 150,
    height: 100,
    borderColor: '#e63746',
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdownText:{
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },


});

export default Conversor;
