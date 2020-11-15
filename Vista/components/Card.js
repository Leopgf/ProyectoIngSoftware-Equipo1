//IMPORT
import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { color } from 'react-native-reanimated';

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
      params
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (

      <Block row={horizontal} card flex style={cardContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('DetallesReceta', params)}>
            <Block flex style={imgContainer}>
              <Image resizeMode="cover" source= {item.imagen && {uri: item.imagen}} style={imageStyles} />
            </Block>
          </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('DetallesReceta', params)}>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text size={24}style={styles.cardTitle} color={'#7faac7'} >
              {/*TITULO DE LA RECETA*/}
                {item.nombre}
              </Text>
              {item.subtitle ? (
                <Block flex center>
                  <Text style={{ fontFamily: 'montserrat-regular'}} size={32} color={nowTheme.COLORS.BLACK}>
                    {item.subtitle}
                  </Text>
                </Block>
              ) : (
                  <Block />
                )}
                {/*DESCRIPCION RECETA*/}
              {item.descripcion ? (
                <Block flex center>
                  <Text
                    style={{ fontFamily: 'montserrat-regular', textAlign: 'left', padding: 15  }}
                    size={14}
                    color={"#0f1e2e"}
                  >
                    {item.descripcion}
                  </Text>
                </Block>
              ) : (
                  <Block />
                )}
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
              ) : (
                  <Block />
                )}
            </Block>
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
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
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
  textBodyStyle: PropTypes.any
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F2F2F3',
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 2,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cardDescription: {
    // padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 4,
    elevation: 1,
    overflow: 'hidden'
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 200,
    width: 'auto'
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7
  }
});

export default withNavigation(Card);
