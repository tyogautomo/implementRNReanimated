import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  set,
  cond,
  eq,
  spring,
  Clock,
  startClock,
  stopClock,
  clockRunning,
  defined,
  Value,
  event,
  sub,
  add
} from 'react-native-reanimated';

class BouncingBallNative extends Component {
  constructor() {
    super()
    this.gestureState1 = new Value(-1);
    this.gestureState2 = new Value(-1);

    this.clockX = new Clock();
    this.clockY = new Clock();

    this.dragX = new Value(0);
    this.dragVX = new Value(0);
    this.translateX = cond(
      eq(this.gestureState1, State.ACTIVE),
      [
        stopClock(this.clockX),
        this.dragX
      ],
      set(
        this.dragX,
        this.runSpring(this.clockX, this.dragX, this.dragVX, 0)
      )
    );

    this.dragY = new Value(0);
    this.dragVY = new Value(0);
    this.translateY = cond(
      eq(this.gestureState1, State.ACTIVE),
      [
        stopClock(this.clockY),
        this.dragY
      ],
      set(
        this.dragY,
        this.runSpring(this.clockY, this.dragY, this.dragVY, 0)
      )
    );

    this.onGestureHandler = event([
      {
        nativeEvent: {
          // translationX: this.dragX,
          translationY: this.dragY,
          // velocityX: this.dragVX,
          velocityY: this.dragVY,
          state: this.gestureState1
        }
      }
    ]);
  };

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
        console.log("hard task [bouncing ball Native Thread]")
      }
    }, 1000);
  };

  runSpring = (clock, value, velocity, destination) => {
    const state = {
      finished: new Value(0),
      velocity: new Value(0),
      position: new Value(0),
      time: new Value(0)
    };

    const config = {
      damping: 7,
      mass: 1,
      stiffness: 121.6,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: new Value(0)
    };

    return [
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.velocity, velocity),
        set(state.position, value),
        set(config.toValue, destination),
        startClock(clock)
      ]),
      spring(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position
    ];
  };

  render() {
    return (
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={this.onGestureHandler}
          onHandlerStateChange={this.onGestureHandler}
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
            <Text style={styles.text}>Pull</Text>
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
    backgroundColor: 'purple',
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
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
  }
});

export { BouncingBallNative };
