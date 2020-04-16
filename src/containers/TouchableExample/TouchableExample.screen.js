import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  event,
  Value,
  cond,
  eq,
  Clock,
  Easing,
  timing,
  stopClock,
  startClock,
  set,
  neq,
  and,
  interpolate,
  Extrapolate,
  block
} from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

class TouchableExample extends Component {
  constructor() {
    super();
    this.clock = new Clock();
    this.gestureState = new Value(0);
    this.onStateChange = event([{
      nativeEvent: {
        state: this.gestureState
      }
    }])
    this.opacity = cond(
      eq(this.gestureState, State.BEGAN),
      0.2,
      1
    )
    this._opacity = this.runOpacityTimer(this.clock, this.gestureState)
  };

  runOpacityTimer = (clock, gestureState) => {
    const state = {
      finished: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
      position: new Value(0)
    }

    const config = {
      duration: 300,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    }

    return block([
      cond(
        and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)),
        [
          set(state.finished, 0),
          set(state.time, 0),
          set(state.frameTime, 0),
          set(config.toValue, 1),
          startClock(clock)
        ]
      ),
      cond(
        and(eq(gestureState, State.END), neq(config.toValue, 0)),
        [
          set(state.finished, 0),
          set(state.time, 0),
          set(state.frameTime, 0),
          set(config.toValue, 0),
          startClock(clock)
        ]
      ),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      interpolate(state.position, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
      })
    ])
  };

  onHandlerStateChange = e => {
    console.log(State.BEGAN, "BEGAN");
    console.log(State.ACTIVE, "ACTIVE");
    console.log(State.CANCELLED, "CANCELLED");
    console.log(State.END, "END");
    console.log(State.FAILED, "FAILED");
    console.log(State.UNDETERMINED, "UNDETERMINED");
    console.log(e.nativeEvent.state)
  };

  render() {
    return (
      <View style={styles.container}>
        <TapGestureHandler
          onHandlerStateChange={this.onStateChange}
        >
          <Animated.View style={[styles.box, { opacity: this._opacity }]} />
        </TapGestureHandler>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    backgroundColor: 'purple',
    width: 150,
    height: 150,
    borderRadius: 8
  }
})

export { TouchableExample };
