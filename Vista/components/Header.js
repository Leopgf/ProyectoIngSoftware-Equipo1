import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Alert } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import nowTheme from '../constants/Theme';
import { getCategoriasHome } from '../../Controladores/RecetaControler';
import { color } from 'react-native-reanimated';
import * as firebase from 'firebase';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon family="NowExtra" size={16} name="bulb" color={'#e63746'} />
    <Block middle style={[styles.notify, { backgroundColor: '#e63746' }]} />
  </TouchableOpacity>
);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon family="NowExtra" size={16} name="basket2x" color={'#e63746'} />
  </TouchableOpacity>
);

class Header extends React.Component {
  state = {
    categories: [],
    textSearcher: '',
    user: false,
  };

  componentDidMount() {
    getCategoriasHome(this.onCategoriesFetch);
    if (firebase.auth().currentUser) {
      this.setState({ user: true });
    }
  }

  onCategoriesFetch = (categories) => {
    this.setState({
      categories,
    });
  };

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  handleAddReview = () => {
    this.props.navigation.navigate('Publicar Receta');
  };

  renderRight = () => {
    const { white, title, navigation } = this.props;

    if (title === 'Title') {
      return [
        // <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        // <BasketButton key="basket-title" navigation={navigation} isWhite={white} />
      ];
    }

    switch (title) {
      case 'Inicio':
        if (firebase.auth().currentUser) {
          return [
            // <BasketButton key="basket-home" navigation={navigation} isWhite={white} />
          ];
        }
      case 'Perfil':
        if (firebase.auth().currentUser) {
        return [
          // <BellButton key="chat-categories" navigation={navigation} />,
          // <BasketButton key="basket-categories" navigation={navigation} />
        ];
      }
      case 'Categories':
        return [
          // <BellButton key="chat-categories" navigation={navigation} isWhite={white} />,
          // <BasketButton key="basket-categories" navigation={navigation} isWhite={white} />
        ];
      case 'Category':
        return [
          // <BellButton key="chat-deals" navigation={navigation} isWhite={white} />,
          // <BasketButton key="basket-deals" navigation={navigation} isWhite={white} />
        ];
      case 'Profile':
        return [
          // <BellButton key="chat-profile" navigation={navigation} isWhite={white} />,
          // <BasketButton key="basket-deals" navigation={navigation} isWhite={white} />
        ];
      case 'Account':
        return [
          // <BellButton key="chat-profile" navigation={navigation} />,
          // <BasketButton key="basket-deals" navigation={navigation} />
        ];
      case 'Product':
        return [
          // <BellButton key="chat-profile" navigation={navigation} isWhite={white} />,
          // <BasketButton key="basket-product" navigation={navigation} isWhite={white} />
        ];
      case 'Search':
        return [
          // <BellButton key="chat-search" navigation={navigation} isWhite={white} />,
          // <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
        ];
      case 'Settings':
        return [
          // <BellButton key="chat-search" navigation={navigation} isWhite={white} />,
          // <BasketButton key="basket-search" navigation={navigation} isWhite={white} />
        ];
      default:
        break;
    }
  };
  renderSearch = () => {
    const { navigation, setSearchText } = this.props;
    return (
      <Input
        right
        color="#e63746"
        style={styles.search}
        placeholder="Ingrese el nombre de la receta que busca..."
        placeholderTextColor={'#8b8c89'}
        name="textSearcher"
        value={this.state.textSearcher}
        onChangeText={(textSearcher) => this.setState({ textSearcher })}
        onSubmitEditing={() => setSearchText(this.state.textSearcher)} // Aca actualizamos la variable que tambien esta en el compoente Home, asi le indicamos que debe de buscar por dicho texto
        iconContent={
          <Icon
            size={16}
            color={theme.COLORS.MUTED}
            name="zoom-bold2x"
            family="NowExtra"
            onPress={() => setSearchText(this.state.textSearcher)} // Aca actualizamos la variable que tambien esta en el compoente Home, asi le indicamos que debe de buscar por dicho texto
          />
        }
      />
    );
  };
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => console.log(navigation.navigate('Pro'))}
        >
          <Block row middle>
            <Icon
              name="bulb"
              family="NowExtra"
              size={18}
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
              {optionLeft || 'Beauty'}
            </Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon
              size={18}
              name="bag-162x"
              family="NowExtra"
              style={{ paddingRight: 8 }}
              color={nowTheme.COLORS.HEADER}
            />
            <Text style={{ fontFamily: 'montserrat-regular' }} size={16} style={styles.tabTitle}>
              {optionRight || 'Fashion'}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  renderTabs = () => {
    const { tabs, tabIndex, navigation, setCurrentTab } = this.props;
    const { categories } = this.state;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={categories}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => {
          //   navigation.setParams({ tabId: id });
          //   navigation.navigate('Inicio', id);
          setCurrentTab(id);
        }}
      />
    );
  };
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: '#ffffff' } : null,
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'minimal-left2x' : 'align-left-22x'}
              family="NowExtra"
              size={16}
              onPress={this.handleLeftPress}
              color={'#e63746'}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 3 : theme.SIZES.BASE * 3,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#e63746',
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 2,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});

export default withNavigation(Header);
