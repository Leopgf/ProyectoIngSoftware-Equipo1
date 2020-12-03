import React, { useState } from 'react';
import { Easing, Animated, Dimensions, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// screens
import Home from '../screens/Home';
import DetallesReceta from '../screens/DetallesReceta';
import Pro from '../screens/noUsadas/Pro';
import Perfil from '../screens/Perfil';
import Register from '../screens/RegisterAndLogin';
import Components from '../screens/noUsadas/Components';
import Reviews from '../screens/Reviews';
import Onboarding from '../screens/Onboarding';
// drawer
import CustomDrawerContent from './Menu';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';

import * as firebase from 'firebase';
import AddReview from '../screens/AddReview';
import EditReview from '../screens/EditReview';
import Conversor from '../screens/Conversor';
import AddReceta from '../screens/AddReceta';

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
    // Hooks que nos ayudara a mantener la comunicacion entre el Header y el Home
    const [searchText, setSearchText] = useState(''); // Este nos va a ayudar a manejar la busqueda por texto
    const [currentTab, setCurrentTab] = useState(''); // Este el tab actual

  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Inicio" // Comente la linea de abajo porque sino el componente se iba a renderizar a acada rato
        // component={() => <Home searchText={searchText} />} // El componente Home lo pase a PureComponente tambien. See: https://stackoverflow.com/questions/47027401/pass-props-stacknavigator
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Inicio"
              search
              // options
              tabs
              navigation={navigation}
              scene={scene}
              setSearchText={setSearchText}
              setCurrentTab={setCurrentTab}

            />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      > 
            {/** Ahora el componete es Pure Component para evitar renders innecesarios. https://stackoverflow.com/questions/47027401/pass-props-stacknavigator */}
          {() => <Home searchText={searchText} currentTab={currentTab}/>}
      </Stack.Screen>
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

function EditReviewStack(props) {
  return (
    <Stack.Navigator initialRouteName="Editar Review" mode="card" headerMode="screen">
      <Stack.Screen
        name="Editar Review"
        component={() => <EditReview {...props} />}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Edita tu review"
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

function AddReviewStack(props) {
  return (
    <Stack.Navigator initialRouteName="Escribir Review" mode="card" headerMode="screen">
      <Stack.Screen
        name="Escribir Review"
        component={() => <AddReview {...props} />}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Escribe tu review"
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

function ReviewsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Reviews" mode="card" headerMode="screen">
      <Stack.Screen
        name="Reviews"
        component={() => <Reviews {...props} />}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Reviews de la Receta" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ConversorStack(props) {
  return (
    <Stack.Navigator initialRouteName="Conversor" mode="card" headerMode="screen">
      <Stack.Screen
        name="Conversor"
        component={Conversor}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Conversor de Unidades"
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

function AddRecetaStack(props) {
  return (
    <Stack.Navigator initialRouteName="Publicar Receta" mode="card" headerMode="screen">
      <Stack.Screen
        name="Publicar Receta"
        component={AddReceta}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Publicar Receta" navigation={navigation} scene={scene} />
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

function PerfilStack(props) {
  return (
    <Stack.Navigator initialRouteName="Perfil" mode="card" headerMode="screen">
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Perfil" navigation={navigation} scene={scene} />
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
      <Drawer.Screen name="Inicio" component={HomeStack}/>
      <Drawer.Screen name="Iniciar Sesión" component={AccountStack}/>
      <Drawer.Screen name="Perfil" component={PerfilStack}/>
      <Drawer.Screen name="DetallesReceta" component={DetallesRecetaStack} />
      <Drawer.Screen name="Reviews" component={ReviewsStack} />
      <Drawer.Screen name="Escribir Review" component={AddReviewStack} />
      <Drawer.Screen name="Editar Review" component={EditReviewStack} />
      <Drawer.Screen name="Conversor" component={ConversorStack} />
      <Drawer.Screen name="Publicar Receta" component={AddRecetaStack} />
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
