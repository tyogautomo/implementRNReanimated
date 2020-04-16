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
  Value,
  event,
} from 'react-native-reanimated';

class BouncingBallNative extends Component {
  constructor() {
    super()
    this.gestureState = new Value(0);
    this.oldGestureState = new Value(0);

    this.clock = new Clock();

    this.dragY = new Value(0);
    this.dragVY = new Value(0);
    this.translateY = cond(
      eq(this.oldGestureState, State.ACTIVE),
      [
        set(
          this.dragY,
          this.runSpring(this.clock, this.dragY, this.dragVY, new Value(0))
        ),
        this.dragY
      ],
      [
        stopClock(this.clock),
        this.dragY
      ]
    );

    this.onGestureHandler = event([
      {
        nativeEvent: {
          translationY: this.dragY,
          velocityY: this.dragVY,
          state: this.gestureState,
          oldState: this.oldGestureState
        }
      }
    ]);
  };

  state = {
    number: 0
  };

  componentDidMount() {
    // this.focusListener();
    // this.blurListener();
  }

  focusListener = () => {
    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      this.heavyTask();
    });
  };

  blurListener = () => {
    const { navigation } = this.props;
    navigation.addListener('blur', () => {
      clearInterval(this.interval);
    });
  };

  heavyTask = () => {
    this.interval = setInterval(() => {
      for (let i = 0; i < 3000; i++) {
        console.log(i)
        this.setState({ number: i })
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
      cond(
        clockRunning(clock),
        0,
        [
          set(state.finished, 0),
          set(state.velocity, velocity),
          set(state.position, value),
          set(state.time, 0),
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
        <Text style={styles.title}>UI Thread</Text>
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
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    position: 'absolute',
    top: 80
  }
});

export { BouncingBallNative };
