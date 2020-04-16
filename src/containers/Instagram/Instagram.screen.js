import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons'
import IconAwesomeFive from 'react-native-vector-icons/FontAwesome5'

import { styles } from './Instagram.style';

class Instagram extends Component {

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

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        {this.renderHeader()}
        {this.renderProfileInfo()}
        {this.renderProfileBio()}
        {this.renderMenu()}
      </View>
    )
  }
};

export { Instagram };
