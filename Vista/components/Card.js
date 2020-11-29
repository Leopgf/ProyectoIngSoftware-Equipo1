//IMPORT
import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { Button as GaButton } from 'galio-framework';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';

import * as firebase from 'firebase';

//CLASE DE CARD
class Card extends React.Component {
   render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      params,
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    var user = '';

    if(item.userID){
      firebase.firestore().collection('Usuarios').where('usuarioID', '==', item.userID).get().then((usuarios) => {

        usuarios.forEach((usuario) => {
          user = usuario.data().usuario;
        });
      });
    }

    if(item.nombre){
      return (
        <Block row={horizontal} card flex style={cardContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('DetallesReceta', params)}>
            <Block flex style={imgContainer}>
              <Image
                resizeMode="cover"
                source={item.imagen && { uri: item.imagen }}
                style={imageStyles}
              />
            </Block>
          </TouchableWithoutFeedback>
  
          <TouchableWithoutFeedback onPress={() => navigation.navigate('DetallesReceta', params)}>
            <Block flex space="between" style={styles.cardDescription}>
              <Block flex>
                <Block flex style={{ justifyContent: 'center' }}>
                  {item.nombre && !horizontal ? (
                    <Text size={24} style={styles.cardTitle} color={'#e63746'}>
                      {/*TITULO DE LA RECETA*/}
                      {item.nombre}
                    </Text>
                  ) : (
                    <Text size={24} style={styles.cardTitle2} color={'#e63746'}>
                      {/*TITULO DE LA RECETA*/}
                      {item.nombre}
                    </Text>
                  )}
                </Block>
                {item.subtitle ? (
                  <Block flex center>
                    <Text
                      style={{ fontFamily: 'montserrat-regular' }}
                      size={32}
                      color={nowTheme.COLORS.BLACK}
                    >
                      {item.subtitle}
                    </Text>
                  </Block>
                ) : null}
                {/*DESCRIPCION RECETA*/}
                {item.descripcion && !horizontal ? (
                  <Block flex center>
                    <Text
                      style={{ fontFamily: 'montserrat-regular', textAlign: 'left', padding: 15 }}
                      size={14}
                      color={'#0f1e2e'}
                    >
                      {item.descripcion}
                    </Text>
                  </Block>
                ) : null}
                {item.body ? (
                  <Block flex left>
                    <Text
                      style={{ fontFamily: 'montserrat-regular' }}
                      size={12}
                      color={nowTheme.COLORS.TEXT}
                    >
                      {item.body}
                    </Text>
                  </Block>
                ) : null}
              </Block>
              {ctaRight ? (
                <Block right={ctaRight ? true : false}>
                  <Text
                    style={styles.articleButton}
                    size={12}
                    muted={!ctaColor}
                    color={ctaColor || nowTheme.COLORS.ACTIVE}
                    bold
                  >
                    {item.cta}
                  </Text>
                </Block>
              ) : null}
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      );
    }else{
        return (
          <Block row={horizontal} card flex style={cardContainer}>
            <Block flex style={imgContainer}>
              <Image
                resizeMode="cover"
                source={item.imagen && { uri: item.imagen }}
                style={imageStyles}
              />
            </Block>
  
            <Block flex space="between" style={styles.cardDescription}>
              <Block flex>
                <Block flex style={{ justifyContent: 'center' }}>
                  {item.titulo && !horizontal ? (
                    <Text size={24} style={styles.cardTitle} color={'#e63746'}>
                      {/*TITULO DE LA REVIEW*/}
                      {item.titulo}
                    </Text>
                  ) : (
                    <Text size={24} style={styles.cardTitle2} color={'#e63746'}>
                      {/*TITULO DE LA REVIEW*/}
                      {item.titulo}
                    </Text>
                  )}
                </Block>
                {/*DESCRIPCION REVIEW*/}
                {item.mensaje ? (
                  <Block flex center>
                    <Text
                      style={{ fontFamily: 'montserrat-regular', textAlign: 'left', padding: 15 }}
                      size={14}
                      color={'#0f1e2e'}
                    >
                      {item.mensaje}
                    </Text>
                  </Block>
                ) : null}
                {item.userID && item.valoracion ? (
                  <Block flex left>
                    <Text
                      style={{ fontFamily: 'montserrat-regular' }}
                      size={12}
                      color={nowTheme.COLORS.TEXT}
                    >
                      {item.userID}
                    </Text>
                    <Text
                      style={{ fontFamily: 'montserrat-regular' }}
                      size={12}
                      color={nowTheme.COLORS.TEXT}
                    >
                      {item.valoracion}
                    </Text>
                    <GaButton
                          round
                          onlyIcon
                          shadowless
                          icon="star"
                          iconFamily="Font-Awesome"
                          iconColor={'#E63746'}
                          iconSize={nowTheme.SIZES.BASE * 1.4}
                          color={'#FFFFFF'}
                          style={[styles.social, styles.shadow]}
                        />
                  </Block>
                ) : null}
              </Block>
              {ctaRight ? (
                <Block right={ctaRight ? true : false}>
                  <Text
                    style={styles.articleButton}
                    size={12}
                    muted={!ctaColor}
                    color={ctaColor || nowTheme.COLORS.ACTIVE}
                    bold
                  >
                    {item.cta}
                  </Text>
                </Block>
              ) : null}
            </Block>
          </Block>
        );
    }
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F2F2F3',
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 2,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardTitle2: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 2,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0f1e2e'
  },
  cardDescription: {
    // padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 200,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
});

export default withNavigation(Card);
