import React, { Component, createRef } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons'
import IconAwesomeFive from 'react-native-vector-icons/FontAwesome5'
import {
  TouchableOpacity,
  PanGestureHandler,
  LongPressGestureHandler,
  NativeViewGestureHandler,
  State
} from 'react-native-gesture-handler';
import Animated, { Value, event, cond, eq, set, block } from 'react-native-reanimated';

import { styles } from './Instagram.style';

const { width } = Dimensions.get('window');

class Instagram extends Component {
  constructor() {
    super()
    this.longPressRef = createRef();
    this.panGestureRef = createRef();
    this.scrollRef = createRef();

    this.longPressState = new Value(0)
    this.panGestureState = new Value(0)
    this.previewOpacity = new Value(0)

    this.onLongPressStateChange = event([{
      nativeEvent: {
        state: this.longPressState
      }
    }])
    this.onPanStateChange = event([{
      nativeEvent: {
        state: this.panGestureState
      }
    }])
    this.state = {
      photos: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      renderPreview: false
    };
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.headerText}>sawadikapap</Text>
          <IconMaterial name="verified-user" size={14} color="#35a8e6" />
        </View>
        <IconIon name="ios-menu" size={25} />
      </View>
    )
  };

  renderHeaderVoid = () => {
    return <View style={{ height: 50 }} />
  }

  renderProfileInfo = () => {
    return (
      <View style={styles.profileInfoContainer}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/09/2016_Open_Beatz_-_Marshmello_-_by_2eight_-DSC_4448.jpg' }} style={styles.profPic} />
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 3 }}>469</Text>
            <Text style={{ fontFamily: 'ProximaNova', fontSize: 18 }}>Posts</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 3 }}>49.9M</Text>
            <Text style={{ fontFamily: 'ProximaNova', fontSize: 18 }}>Followers</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 3 }}>11</Text>
            <Text style={{ fontFamily: 'ProximaNova', fontSize: 18 }}>Following</Text>
          </View>
        </View>
      </View>
    )
  };

  renderProfileBio = () => {
    return (
      <View style={styles.profileBioContainer}>
        <Text style={{ fontFamily: 'ProximaNova', fontSize: 16, marginBottom: 3 }}>Marshmellololll</Text>
        <Text style={{ fontFamily: 'ProximaNova', fontSize: 16, marginBottom: 3 }}>--------------------------</Text>
        <Text style={{ fontFamily: 'ProximaNova', fontSize: 16, marginBottom: 3 }}>👤 Musics | Video | Weirdo</Text>
        <Text style={{ fontFamily: 'ProximaNova', fontSize: 16, marginBottom: 3 }}>🆒 Youtube Channel :</Text>
        <Text style={{ fontFamily: 'ProximaNova', fontSize: 16, marginBottom: 3, color: '#02507a' }}>m.youtube.com/watch?v=61la84n637</Text>
        <Text style={{ fontFamily: 'ProximaNova', fontSize: 16, marginBottom: 3, marginBottom: 20 }}>Followed by <Text style={{ fontWeight: 'bold' }}>shroud, Sumail</Text> and <Text style={{ fontWeight: 'bold' }}>69 others</Text></Text>
        <View style={{ alignItems: 'center', borderRadius: 3, borderWidth: 1, paddingVertical: 8, borderColor: '#d9d9d9' }}>
          <Text style={{ fontFamily: 'ProximaNova', fontSize: 15 }}>Edit Profile</Text>
        </View>
      </View>
    )
  };

  renderMenu = () => {
    return (
      <View style={styles.menuContainer}>
        <View style={{ flex: 1, alignItems: 'center', borderBottomWidth: 0.7, height: '100%', justifyContent: 'center' }}>
          <IconSimple name="grid" size={23} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'center' }}>
          <IconAwesomeFive name="id-badge" size={23} color="#b9b9b9" />
        </View>
      </View>
    )
  };

  renderPhotoList = () => {
    const { photos } = this.state;
    return (
      <View style={styles.photosListContainer}>
        {photos.map((photo, index) => this.renderItem(index))}
      </View>
    )
  };

  onTapItem = (e) => {
    console.log('tapped photo item!');
  };

  onPressIn = () => {
    console.log('HEHEHHE');
  }

  renderItem = (index) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        onPressIn={this.onPressIn}
        onPress={this.onTapItem}
      >
        <LongPressGestureHandler
          ref={this.longPressRef}
          simultaneousHandlers={[this.panGestureRef, this.longPressRef]}
          onHandlerStateChange={this.onLongPressStateChange}
        >
          <Animated.View>
            <PanGestureHandler
              ref={this.panGestureRef}
              simultaneousHandlers={[this.longPressRef, this.scrollRef]}
              onGestureEvent={e => console.log(e.nativeEvent)}
              onHandlerStateChange={this.onPanStateChange}
            >
              <Animated.View>
                <Animated.Image
                  style={styles.photoItem(index)}
                  source={{ uri: 'https://pbs.twimg.com/profile_images/1238942163758510080/Hst-APUq_400x400.jpg' }}
                />
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </LongPressGestureHandler>
      </TouchableOpacity>
    );
  };

  renderPreview = () => {
    return (
      <Animated.View
        style={[styles.previewContainer, { opacity: this.previewOpacity }]}
      >
        <Animated.View style={{ width: width / 1.1, backgroundColor: 'white', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 }}>
            <Image
              style={{ width: 35, height: 35, borderRadius: 20 }}
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/09/2016_Open_Beatz_-_Marshmello_-_by_2eight_-DSC_4448.jpg' }}
            />
            <Text style={{ fontWeight: 'bold', marginLeft: 13, fontSize: 15 }}>sawadikapap</Text>
          </View>
          <Image
            style={{ width: width / 1.1, height: width / 1.1 }}
            source={{ uri: 'https://pbs.twimg.com/profile_images/1238942163758510080/Hst-APUq_400x400.jpg' }}
          />
          <View>

          </View>
        </Animated.View>
      </Animated.View>
    )
  };

  animatedCode = () => {
    return (
      <Animated.Code>
        {() => (
          block([
            cond(
              eq(this.longPressState, State.ACTIVE),
              set(this.previewOpacity, 1)
            ),
            cond(
              eq(this.panGestureState, State.END),
              set(this.previewOpacity, 0)
            )
          ])
        )}
      </Animated.Code>
    )
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        {this.animatedCode()}
        {this.renderHeader()}
        {this.renderHeaderVoid()}
        <NativeViewGestureHandler
          ref={this.scrollRef}
          simultaneousHandlers={[this.panGestureRef, this.longPressRef]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.renderProfileInfo()}
            {this.renderProfileBio()}
            {this.renderMenu()}
            {this.renderPhotoList()}
          </ScrollView>
        </NativeViewGestureHandler>
        {this.renderPreview()}
      </View>
    )
  }
};

export { Instagram };
