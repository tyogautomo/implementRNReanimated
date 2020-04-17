import React, { Component, createRef } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import IconAwesomeFive from 'react-native-vector-icons/FontAwesome5';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  PanGestureHandler,
  LongPressGestureHandler,
  NativeViewGestureHandler,
  TapGestureHandler,
  State
} from 'react-native-gesture-handler';
import Animated, { Value, event, cond, eq, set, block } from 'react-native-reanimated';

import { styles } from './Instagram.style';

const { width } = Dimensions.get('window');

class Instagram extends Component {
  constructor(props) {
    super()
    this.longPressRef = createRef();
    this.panGestureRef = createRef();
    this.tapGestureRef = createRef();
    this.scrollRef = createRef();

    this.likeRef = createRef();
    this.commentRef = createRef();
    this.sendRef = createRef();
    this.menuLayout = {}

    this.longPressState = new Value(0)
    this.panGestureState = new Value(0)
    this.previewOpacity = new Value(0)

    this.dragX = new Value(0);
    this.dragY = new Value(0);
    this.gambar = 'https://i.ytimg.com/vi/NRmSf9VqrUA/maxresdefault.jpg';

    this.onLongPressStateChange = event([{
      nativeEvent: {
        state: this.longPressState
      }
    }])
    this.onPanGestureHandler = event([{
      nativeEvent: {
        state: this.panGestureState,
        absoluteX: this.dragX,
        absoluteY: this.dragY
      }
    }])
    this.state = {
      photos: [
        { image: 'https://i.ytimg.com/vi/NRmSf9VqrUA/maxresdefault.jpg' },
        { image: 'https://i.pinimg.com/originals/1f/03/3a/1f033af59c8069070ec6d2b70ddb7c4f.jpg' },
        { image: 'https://i.pinimg.com/originals/9d/8a/fd/9d8afda27846c8f37c6028edd1f16a7a.jpg' },
        { image: 'https://i.ytimg.com/vi/NRmSf9VqrUA/maxresdefault.jpg' },
        { image: 'https://i.pinimg.com/originals/1f/03/3a/1f033af59c8069070ec6d2b70ddb7c4f.jpg' },
        { image: 'https://i.pinimg.com/originals/9d/8a/fd/9d8afda27846c8f37c6028edd1f16a7a.jpg' },
        { image: 'https://i.ytimg.com/vi/NRmSf9VqrUA/maxresdefault.jpg' },
        { image: 'https://i.pinimg.com/originals/1f/03/3a/1f033af59c8069070ec6d2b70ddb7c4f.jpg' },
        { image: 'https://i.pinimg.com/originals/9d/8a/fd/9d8afda27846c8f37c6028edd1f16a7a.jpg' },
      ],
      renderPreview: false,
      currentPreviewUri: 'https://i.ytimg.com/vi/NRmSf9VqrUA/maxresdefault.jpg'
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
        {photos.map((photo, index) => this.renderItem(photo, index))}
      </View>
    )
  };

  onTapStateChange = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      console.log('to another page')
    }
  };

  renderItem = (photo, index) => {
    return (
      <TapGestureHandler
        key={index}
        ref={this.tapGestureRef}
        simultaneousHandlers={[this.panGestureRef, this.longPressRef, this.scrollRef]}
        minPointers={1}
        onHandlerStateChange={this.onTapStateChange}
      >
        <Animated.View>
          <LongPressGestureHandler
            ref={this.longPressRef}
            simultaneousHandlers={[this.panGestureRef, this.longPressRef, this.tapGestureRef]}
            onHandlerStateChange={this.onLongPressStateChange}
          >
            <Animated.View>
              <PanGestureHandler
                ref={this.panGestureRef}
                simultaneousHandlers={[this.longPressRef, this.scrollRef, this.tapGestureRef]}
                onGestureEvent={this.onPanGestureHandler}
                onHandlerStateChange={this.onPanGestureHandler}
              >
                <Animated.Image
                  style={styles.photoItem(index)}
                  source={{ uri: photo.image }}
                />
              </PanGestureHandler>
            </Animated.View>
          </LongPressGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    );
  };

  handleMeasureRef = (ref, type) => (e) => {
    console.log(ref.current.measure, '<<<<<<<<<<<<')
    if (ref.current.measure) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        this.menuLayout[type] = {
          absoluteX: pageX,
          absoluteY: pageY
        }
      });
    }
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
            source={{ uri: this.state.currentPreviewUri }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 15 }}>
            <IconAwesome
              ref={this.likeRef}
              name="heart-o" size={25}
              color="#303030"
              onLayout={this.handleMeasureRef(this.likeRef, 'like')} />
            <IconAwesome
              ref={this.commentRef}
              name="comment-o" size={25}
              color="#303030"
              onLayout={this.handleMeasureRef(this.commentRef, 'comment')} />
            <IconAwesome
              ref={this.sendRef}
              name="send-o" size={25}
              color="#303030"
              onLayout={this.handleMeasureRef(this.sendRef, 'send')} />
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
          simultaneousHandlers={[this.panGestureRef, this.longPressRef, this.tapGestureRef]}
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
