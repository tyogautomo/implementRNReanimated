import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { styles } from './Instagram.style';

class Instagram extends Component {

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text>sibujank</Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.renderHeader()}
        <Text>instagram</Text>
      </View>
    )
  }
};

export { Instagram };
