import React from 'react';
import renderer from 'react-test-renderer';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Images, nowTheme } from '../Vista/constants';
import LoadingView from 'react-native-loading-view';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon, Input } from '../Vista/components';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

describe('<Conversor />', () => {
  //
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <LoadingView
          loading={false}
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
                      width: 300,
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
                </Block>
                <Block flex style={{ marginTop: 6 }}>
                  <Input
                    placeholder={`  Coloque el número a convertir`}
                    style={styles.inputs}
                    keyboardType="numeric"
                    iconContent={<Icon size={18} name="keyboard" family="Etypo" />}
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
                </Block>
                <Block>
                    <Block style={{ backgroundColor: '#e3e4e5', borderRadius: 50, wiht: 40 }}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          alignSelf: 'center',
                          marginBottom: theme.SIZES.BASE / 2,
                          fontWeight: '900',
                          fontSize: 20,
                          marginTop: 5,
                        }}
                        color="#e63746"
                      >
                        Conversión: 
                      </Text>
                    </Block>
                </Block>
              </ScrollView>
            </Block>
          </Block>
        </LoadingView>
      )
      .toJSON();
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
