import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
  View,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  static defaultProps = {
    onComplete: () => {}
  }
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      const { buttonContainerViewStyle, buttonStyle } = styles;
      return (
        <Button
          title="I'm ready"
          raised
          containerViewStyle={buttonContainerViewStyle}
          buttonStyle={buttonStyle}
          onPress={this.props.onComplete}
        />
      );
    }
  }
  renderSlides() {
    const { textStyle, slideStyle } = styles;
    return this.props.data.map((slide, i) => {
      return (
        <View
          style={[slideStyle, { backgroundColor: slide.color }]}
          key={slide.text}
        >
          <Text style={textStyle}>{slide.text}</Text>
          {this.renderLastSlide(i)}
        </View>
      );
    });
  }
  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: '#0288D1'
  },
  buttonContainerViewStyle: {
    marginTop: 15
  }
};

export default Slides;
