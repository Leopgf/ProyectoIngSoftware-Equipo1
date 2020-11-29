import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform,  TouchableOpacity } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Images, nowTheme } from '../constants';
import LoadingView from 'react-native-loading-view';
import ModalDropdown from 'react-native-modal-dropdown';
import { Button, Icon, Input} from '../components';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class AddReceta extends React.Component {


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
  handleInicio = () => {
    this.props.navigation.navigate('Inicio');
  }


  renderAddReceta = () => {
    return (
        <LoadingView
          loading={this.state.loading}
          size="large"
          style={styles.cargar}
          text="Cargando Publicar Receta..."
        >
        <Block flex middle>
            <ImageBackground
              source={Images.AddReceta}
              style={styles.imageBackgroundContainer}
              imageStyle={styles.imageBackground}
            >
              <Block flex middle>
                <Block style={styles.registerContainer}>
                  <Block flex space="evenly">
                    <Block flex={0.4} middle >
                      <Block flex={0.5} middle>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            fontWeight: '500',
                            fontSize: 24,
                          }}
                          color="#0f1e2e"
                          size={24}
                        >
                          Publicar Receta
                        </Text>
                      </Block>
                    </Block>
                    <Block flex={0.1} middle>
                      <Text color="#0f1e2e" size={16}>
                       ¡Publica tus recetas con nosotros!
                      </Text>
                    </Block>
                    <Block flex={1} middle space="between">
                      <Block center flex={0.9}>
                        <Block flex space="between">
                          <Block>
                            <Block center width={width * 0.8}>
                              <Input
                                placeholder="Imagen de la Receta"
                                style={styles.inputs}
                                onChangeText={(picture) => this.setState({ picture })}
                                iconContent={<Icon size={18} name="picture" family="AntDesign"/>}
                              />
                            </Block>
                            <Block center width={width * 0.8}>
                              <Input
                                placeholder="Título de la Receta"
                                style={styles.inputs}
                                password={true}
                                onChangeText={(pass) => this.setState({ pass })}
                                iconContent={<Icon size={18} name="tag" family="AntDesign" />}
                              />
                            </Block>
                            <Block center width={width * 0.8}>
                              <Input
                                placeholder="Descripción de la Receta"
                                style={styles.inputs}
                                password={true}
                                onChangeText={(pass) => this.setState({ pass })}
                                iconContent={<Icon size={18} name="text" family="Entypo" />}
                              />
                            </Block>
                          </Block>
                          <Block center>
                            <Button
                              style={{
                                fontFamily: 'montserrat-bold',
                                borderRadius: nowTheme.SIZES.BASE * 1.5,
                                width: 200,
                                marginBottom: 30,
                                marginTop: 30
                              }}
                              color="primary"
                              round
                              onPress={() => this.handleInicio()}
                            >
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                PUBLICAR
                              </Text>
                            </Button>
                            
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
          </Block>
      </LoadingView>
    );
  };
  render() {
   
    return (
      <Block flex center>
        {this.renderAddReceta()}
      </Block>

     ); }
}


const styles = StyleSheet.create({
    imageBackgroundContainer: {
      width: width,
      height: height,
      padding: 0,
      zIndex: 1,
    },
    imageBackground: {
      width: width,
      height: height,
    },
    registerContainer: {
      marginTop: 55,
      width: width * 0.9,
      height: height < 812 ? height * 0.8 : height * 0.8,
      backgroundColor: nowTheme.COLORS.WHITE,
      borderRadius: 4,
      shadowColor: nowTheme.COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: 'hidden',
    },
    socialConnect: {
      backgroundColor: nowTheme.COLORS.WHITE,
      // borderBottomWidth: StyleSheet.hairlineWidth,
      // borderColor: "rgba(136, 152, 170, 0.3)"
    },
    socialButtons: {
      width: 120,
      height: 40,
      backgroundColor: '#fff',
      shadowColor: nowTheme.COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
    },
    socialTextButtons: {
      color: nowTheme.COLORS.PRIMARY,
      fontWeight: '800',
      fontSize: 14,
    },
    inputIcons: {
      marginRight: 12,
      color: nowTheme.COLORS.ICON_INPUT,
    },
    inputs: {
      width: width * 0.65,
      borderWidth: 1,
      borderColor: '#E3E3E3',
      borderRadius: 21.5,
      alignSelf: 'center'
    },
    passwordCheck: {
      paddingLeft: 2,
      paddingTop: 6,
      paddingBottom: 15,
    },
    createButton: {
      width: width * 0.5,
      marginTop: 25,
      marginBottom: 40,
    },
    social: {
      width: theme.SIZES.BASE * 3.5,
      height: theme.SIZES.BASE * 3.5,
      borderRadius: theme.SIZES.BASE * 1.75,
      justifyContent: 'center',
      marginHorizontal: 10,
    },
  });
  

export default AddReceta;
