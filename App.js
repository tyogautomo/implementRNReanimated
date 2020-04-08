import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Easing, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import Animated, { event, cond, eq, add, set } from 'react-native-reanimated';

class App extends Component {
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
    this.veryHardComputing();
  }

  veryHardComputing = () => {
    // setInterval(() => {
    //   for (let i = 0; i < 1000; i++) {
    //     console.log("hehhehe")
    //   }
    // }, 1000);
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
          ]}></Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
};

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
    top: 300
  }
});

export default App;
