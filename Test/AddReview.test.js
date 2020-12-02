import React from 'react';
import renderer from 'react-test-renderer';

import { StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../Vista/components';
import { Images, nowTheme } from '../Vista/constants';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePickerExample from '../Vista/components/ImagePicker';
import ModalDropdown from 'react-native-modal-dropdown';

const { width, height } = Dimensions.get('screen');

describe('<AddReview />', () => {
  it('renders correctly', async () => {
    const tree = await renderer
      .create(
        <Block>
          <Block>
            <Block center width={width * 0.8}>
              <Block flex={1} style={{ marginTop: 20, marginBottom: 20 }} middle>
                <ImagePickerExample />
              </Block>
              <Block>
                <Input
                  placeholder="Título de la Review"
                  style={styles.inputs}
                  iconContent={<Icon size={18} name="message" family="ArgonExtra" />}
                />
                <Input
                  placeholder="Mensaje de la Review"
                  style={styles.inputsGrandes}
                  iconContent={<Icon size={18} name="message" family="ArgonExtra" />}
                />
                <Block>
                  <Text
                    style={{
                      fontWeight: '500',
                      marginTop: 16,
                    }}
                    color="#0f1e2e"
                    size={18}
                  >
                    Valoración que desea colocarle a la receta:
                  </Text>
                  <Block
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: 50,
                      alignSelf: 'center',
                      padding: 10,
                      margin: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: '500',
                        alignSelf: 'center',
                      }}
                      color="#e63746"
                      size={13}
                    >
                      Con 1-Muy mala y 5-Excelente
                    </Text>
                    <Block flex center row>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly', async () => {
    const tree = await renderer
      .create(
        <Block>
          <Text
            style={{
              fontFamily: 'montserrat-bold',
              textAlign: 'center',
              fontWeight: '500',
              marginTop: 50,
            }}
            color="#e63746"
            size={24}
          >
            REVIEW DE LA RECETA
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '500',
              marginTop: 16,
            }}
            color="#0f1e2e"
            size={16}
          >
            Escribe tu Review de la receta realizada
          </Text>
        </Block>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

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
  dropdown: {
    alignSelf: 'center',
    width: width / 2.5,
    height: height / 20,
    marginTop: 10,
    alignItems: 'center',
    right: 8,
    borderWidth: 0,
    borderRadius: 7,
    backgroundColor: '#e63746',
    marginLeft: 10,
  },

  dropdownOption: {
    width: width / 5,
    alignItems: 'center',
    borderColor: '#e63746',
    borderRadius: 10,
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdownText: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: '#c1c2c2',
    textAlign: 'center',
    textAlignVertical: 'center',
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
    alignSelf: 'center',
  },
  inputsGrandes: {
    width: width * 0.65,
    height: 50,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    alignSelf: 'center',
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
