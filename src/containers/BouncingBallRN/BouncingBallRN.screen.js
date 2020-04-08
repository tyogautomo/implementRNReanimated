import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

class BouncingBallRN extends Component {
  constructor() {
    super()
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.onGestureHandler = Animated.event([
      {
        nativeEvent: {
          translationX: this.translateX,
          translationY: this.translateY
        }
      }
    ], { useNativeDriver: true })
  }

  componentDidMount() {
    // this.focusListener();
    // this.blurListener();
  }

  focusListener = () => {
    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      this.hardComputing();
    });
  };

  blurListener = () => {
    const { navigation } = this.props;
    navigation.addListener('blur', () => {
      clearInterval(this.interval);
    });
  };

  hardComputing = () => {
    this.interval = setInterval(() => {
      for (let i = 0; i < 3000; i++) {
        console.log("hard task [bouncing ball JS Thread]")
      }
    }, 1000);
  };

  onHandlerStateChange = event => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      Animated.parallel([
        Animated.spring(
          this.translateX,
          {
            toValue: 0,
            tension: 100,
            useNativeDriver: true
          }
        ),
        Animated.spring(
          this.translateY,
          {
            toValue: 0,
            tension: 100,
            useNativeDriver: true
          }
        )
      ]).start();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={this.onGestureHandler}
          onHandlerStateChange={this.onHandlerStateChange}
          maxPointers={1}
        >
          <Animated.View style={[
            styles.round,
            {
              transform: [
                {
                  translateX: this.translateX,
                  translateY: this.translateY
                }
              ]
            }
          ]}>
            <Text style={styles.text}>Drag</Text>
            <Text style={styles.text}>Me!</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  round: {
    backgroundColor: 'blue',
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: 300
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export { BouncingBallRN };
