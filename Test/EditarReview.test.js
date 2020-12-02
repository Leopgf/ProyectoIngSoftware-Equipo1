import React from 'react';
import renderer from 'react-test-renderer';

import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LoadingView from 'react-native-loading-view';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../Vista/components';
import { Images, nowTheme } from '../Vista/constants';
import ImagePickerExample from '../Vista/components/ImagePicker';
import { ScrollView } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

describe('<EditReview />', () => {
  //
  it('renders correctly', async () => {
    const tree = await renderer
      .create(
        <Block middle>
          <Text
            style={{
              fontFamily: 'montserrat-bold',
              textAlign: 'center',
              fontWeight: '500',
              marginTop: 10,
            }}
            color="#e63746"
            size={24}
          >
            Editar Review
          </Text>
          <Text
            style={{
              fontFamily: 'montserrat-bold',
              textAlign: 'center',
              fontWeight: '500',
              marginTop: 10,
            }}
            color="#0f1e2e"
            size={14}
          >
            Edita tu review de la receta
          </Text>
        </Block>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly', async () => {
    const tree = await renderer
      .create(
        <Block flex space="between">
          {/* NO SE POR QUE NO SE VE AAAAAAAAAAAAA */}
          <ImagePickerExample />
          <Input
            placeholder="Titulo"
            style={styles.inputs}
            iconContent={<Icon size={18} name="message" family="ArgonExtra" />}
          />
          <Input
            placeholder="Mensaje"
            style={styles.inputs}
            iconContent={<Icon size={18} name="message" family="ArgonExtra" />}
          />
          <Text>Valoración:</Text>
          <Button
            style={{
              fontFamily: 'montserrat-bold',
              borderRadius: nowTheme.SIZES.BASE * 1.5,
              width: 200,
              marginBottom: 30,
              marginTop: 30,
            }}
            color="primary"
            round
          >
            ACTUALIZAR
          </Button>
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
    width: width / 4,
    height: height / 22,
    marginTop: 10,
    alignItems: 'center',
    right: 8,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: '#e63746',
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
    color: 'white',
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
