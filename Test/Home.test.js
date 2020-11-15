import React from 'react';
import renderer from 'react-test-renderer';

import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme } from "galio-framework";
import { Card } from "../Vista/components";

//CONST
const { width } = Dimensions.get("screen");


describe('<Home />', () => {
  //
    it('renders correctly', () => {
        const tree = renderer.create(
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}
            >
            <Block flex>
                <Block flex row>
                </Block>
            </Block>
          </ScrollView>
        ).toJSON();
        expect(tree).toMatchSnapshot();
      });
});


//ESTILOS 
const styles = StyleSheet.create({
    home: {
      width: width
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
      paddingHorizontal: 2,
      fontFamily: 'montserrat-regular'
  
    }
  });