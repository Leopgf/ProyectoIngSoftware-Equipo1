import React from 'react';
import { Easing, Animated, Dimensions, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// screens
import Home from '../screens/Home';
import DetallesReceta from '../screens/DetallesReceta';
import Pro from '../screens/noUsadas/Pro';
import Perfil from '../screens/Perfil';
import Register from '../screens/RegisterAndLogin';
import Components from '../screens/noUsadas/Components';
import Articles from '../screens/noUsadas/Articles';
import Onboarding from '../screens/Onboarding';
// drawer
import CustomDrawerContent from './Menu';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';

import * as firebase from 'firebase';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Components" mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

// Renderizados que estamos usando
function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Inicio"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Inicio"
              search
              // options
              tabs
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}

function DetallesRecetaStack(props) {
  return (
    <Stack.Navigator initialRouteName="DetallesReceta" mode="card" headerMode="screen">
      <Stack.Screen
        name="DetallesReceta"
        component={() => <DetallesReceta {...props} />}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Detalles de la Receta" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="Iniciar Sesión" mode="card" headerMode="screen">
      <Stack.Screen
        name="Iniciar Sesión"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Accede a tu cuenta Mixo's"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function LogoutStack(props) {
  Alert.alert('Cerrar Sesión', '¿Está seguro que desea cerrar su sesión?', [
    {
      text: 'Si',
      onPress: () => {
        firebase
          .auth()
          .signOut()
          .then(function () {
            Alert.alert('Su sesión ha sido cerrada');
          })
          .catch(function (error) {
            Alert.alert('Error');
          });
      },
    },
    {
      text: 'No',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
  ]);
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Inicio"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Inicio"
              search
              // options
              tabs
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}

function PerfilStack(props) {
  return (
    <Stack.Navigator initialRouteName="Perfil" mode="card" headerMode="screen">
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent white title="Perfil" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

// Renderizados que no estamos usando
function ArticlesStack(props) {
  return (
    <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

// Renderizado de la app
function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Inicio" component={HomeStack} />
      <Drawer.Screen name="Components" component={ComponentsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="Perfil" component={PerfilStack} />
      <Drawer.Screen name="Iniciar Sesión" component={AccountStack} />
      <Drawer.Screen name="Cerrar Sesión" component={LogoutStack} />
      <Drawer.Screen name="DetallesReceta" component={DetallesRecetaStack} />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
