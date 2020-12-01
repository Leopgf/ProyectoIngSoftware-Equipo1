import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Block, theme } from "galio-framework";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";
import * as firebase from 'firebase';

 // AQUÍ AGREGAMOS LAS NUEVAS OPCIONES DEL MENÚ
let screens = [];

function getInitialNav(){
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      screens = [
        "Inicio",
        "Conversor",
        "Perfil",
        
      ];
    }else {
      screens = [
        "Inicio",
        "Conversor",
        "Iniciar Sesión",
      ];
    }
  })
}

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  getInitialNav();
  return (
    <Block style={styles.container} forceInset={{ top: "always", horizontal: "never" }} >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={15}
            color={'#e63746'}
          />
        </Block>
      </Block>


      <Block flex style={{ paddingLeft: 8, paddingRight: 14}}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                // focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
        </Block> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#a4a4a2'
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: "center"
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 37
  }
});

export default CustomDrawerContent;
