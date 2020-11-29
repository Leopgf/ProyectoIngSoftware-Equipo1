import React from 'react'
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
  } from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import { Button, Icon, Input} from '../components';
import { Images, nowTheme } from '../constants';

class addReceta extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            descripcion: '',
            porcionDefecto: 1,
            unidadPorcion: '',
            categorias: [],
            pasos: [],
            imagen: '',
            ingredientes: [],
            fecha: Date,
        }
    }
}