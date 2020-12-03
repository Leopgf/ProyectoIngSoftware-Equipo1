import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Images, nowTheme } from '../constants';
import LoadingView from 'react-native-loading-view';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon, Input } from '../components';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Conversor extends React.Component {
  state = {
    loading: true,
    cantidad: 0,
    unidad: '',
    unidadDestino: '',
    conversion: 0,
    tiposUnidades: [
      'Longitud',
      'Masa',
      'Volúmen',
      'Temperatura',
      'Tiempo',
      'Frecuencia',
    ],
    tipoUnidad: 0,
    opciones: [
      ['mm', 'cm', 'm', 'in', 'ft', 'mi'],
      ['mcg', 'mg', 'g', 'kg', 'oz', 'lb', 'mt', 't'],
      [
        'mm3',
        'cm3',
        'ml',
        'l',
        'kl',
        'm3',
        'km3',
        'tsp',
        'Tbs',
        'in3',
        'fl-oz',
        'cup',
        'gal',
        'ft3',
        'yd3',
      ],
      ['C', 'F', 'K', 'R'],
      ['ns', 'ms', 's', 'min', 'h', 'd', 'week', 'month', 'year'],
      ['Hz', 'mHz', 'kHz', 'MHz', 'GHz', 'THz'],
    ],
    opcionesTexto: [
      ['Milímetros', 'Centímetros', 'Metros', 'Pulgadas', 'Pies', 'Millas'],
      [
        'Microgramos',
        'Miligramos',
        'Gramos',
        'Kilogramos',
        'Onzas',
        'Libras',
        'Militoneladas',
        'Toneladas',
      ],
      [
        'Milímetros cúbicos',
        'Centímetros cúbicos',
        'Mililitros',
        'Litros',
        'Kilolitros',
        'Metros cúbicos',
        'Kilómetros cúbicos',
        'Cucharitas',
        'Cucharadas',
        'Pulgadas cúbicas',
        'Onzas líquidas',
        'Tazas',
        'Galones',
        'Pies cúbicos',
        'Yardas cúbicas',
      ],
      ['Centígrados', 'Farenheit', 'Kelvin', 'Rankine'],
      [
        'Nanosegundos',
        'Milisegundos',
        'Segundos',
        'Minutos',
        'Horas',
        'Días',
        'Semanas',
        'Meses',
        'Años',
      ],
      ['Hertz', 'Milihertz ', 'Kilohertz', 'Megahertz', 'Gigahertz', 'Terahertz'],
    ],
  };

  //TEMPORIZADOR DE INICIO CARGA DE CONVERSOR CON TIEMPO INDICADO
  componentDidMount = () => {
    console.disableYellowBox=true;
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  };

  convertir = () => {
    if (this.state.unidad !== '' || this.state.unidadDestino !== '' || this.state.cantidad !== 0) {
      console.log(this.state.unidad);
      console.log(this.state.unidadDestino);
      var convert = require('convert-units');
      this.setState({
        conversion: convert(this.state.cantidad)
          .from(this.state.unidad)
          .to(this.state.unidadDestino),
      });
    }
  };

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
            <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={{ backgroundColor: '#e3e4e5', borderRadius: 50 }}>
            <Text
              style={{
                textAlign: 'center',
                width: 350,
                height: 18,
                color: '#0f1e2e',
                fontSize: 15,
                marginTop: 1,
                marginBottom: 15,
                marginLeft: 29,
                zIndex: 2,
                marginTop: 18,
              }}
            >
              Para usar el conversor siga las instrucciones
            </Text>
          </Block>
              <Block row>
                <Text
                  style={{
                    color: '#0f1e2e',
                    marginTop: 45,
                    marginLeft: 10,
                  }}
                >
                  Seleccione el tipo de unidad:
                </Text>
                <ModalDropdown
                  ref="dropdown"
                  defaultValue={'Tipo'}
                  textStyle={styles.dropdownText}
                  style={styles.dropdown2}
                  dropdownStyle={styles.dropdownOption}
                  options={this.state.tiposUnidades}
                  onSelect={(value) => this.setState({ tipoUnidad: [value] })}
                />
              </Block>
              <Block flex style={{ marginTop: 6 }}>
                <Input
                  placeholder={`  Coloque el número a convertir`}
                  style={styles.inputs}
                  keyboardType="numeric"
                  iconContent={<Icon size={18} name="keyboard" family="Etypo" />}
                  onChangeText={async (cantidad) => {
                    await this.setState({ cantidad });
                    if (
                      this.state.unidad !== '' ||
                      this.state.unidadDestino !== '' ||
                      this.state.cantidad !== 0
                    ) {
                      this.convertir();
                    }
                  }}
                />

                <Block row flex style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      color: '#0f1e2e',
                      marginTop: 15,
                      marginLeft: 10,
                    }}
                  >
                    Seleccione la unidad de Origen:{' '}
                  </Text>
                  <ModalDropdown
                    ref="dropdown"
                    defaultValue={'Origen'}
                    textStyle={styles.dropdownText}
                    style={styles.dropdown3}
                    dropdownStyle={styles.dropdownOption}
                    options={this.state.opcionesTexto[this.state.tipoUnidad]}
                    onSelect={async (value) => {
                      await this.setState({
                        unidad: this.state.opciones[this.state.tipoUnidad][value],
                      });
                      if (
                        this.state.unidad !== '' ||
                        this.state.unidadDestino !== '' ||
                        this.state.cantidad !== 0
                      ) {
                        this.convertir();
                      }
                    }}
                  />
                </Block>
              </Block>
              <Block row flex style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    color: '#0f1e2e',
                    marginTop: 15,
                    marginLeft: 10,
                  }}
                >
                  Seleccione la unidad de Destino:{' '}
                </Text>
                <ModalDropdown
                  ref="dropdown"
                  defaultValue={'Destino'}
                  textStyle={styles.dropdownText}
                  style={styles.dropdown3}
                  dropdownStyle={styles.dropdownOption}
                  options={this.state.opcionesTexto[this.state.tipoUnidad]}
                  onSelect={async (value) => {
                    await this.setState({
                      unidadDestino: this.state.opciones[this.state.tipoUnidad][value],
                    });
                    if (
                      this.state.unidad !== '' ||
                      this.state.unidadDestino !== '' ||
                      this.state.cantidad !== 0
                    ) {
                      this.convertir();
                    }
                  }}
                />
              </Block>
              <Block>
                {this.state.conversion !== 0 ? (
               
                  <Block style={{ backgroundColor: '#e3e4e5', borderRadius: 50, wiht:40 }}>
                    <Text style={{
                      fontFamily: 'montserrat-bold',
                      alignSelf: 'center',
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: '900',
                      fontSize: 15,
                      marginTop:5
                    }}
                    color="#e63746">
                      Conversión: {this.state.cantidad} {this.state.unidad} = {this.state.conversion} {this.state.unidadDestino}
                    </Text>
                  </Block>
                ) : null}
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
    width: 105,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: '#e63746',
  },
  dropdown2: {
    alignSelf: 'flex-end',
    width: 105,
    marginTop: 32,
    marginLeft: 20,
    right: 8,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: '#e63746',
  },
  dropdown3: {
    width: 105,
    marginBottom: 2,
    marginLeft: 20,
    right: 8,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: '#e63746',
  },
  dropdownOption: {
    width: 150,
    height: 100,
    borderColor: '#e63746',
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdownText: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Conversor;
