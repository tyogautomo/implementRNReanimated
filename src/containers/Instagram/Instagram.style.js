import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    width: '100%',
    // elevation: 2,
    backgroundColor: 'white',
    position: 'absolute'
  },
  headerText: {
    fontFamily: 'ProximaNova',
    fontSize: 18,
    marginRight: 6
  },
  profileInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 15
  },
  profPic: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  profileBioContainer: {
    paddingHorizontal: 15,
    marginBottom: 20
  },
  menuContainer: {
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    borderColor: '#d9d9d9',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  photosListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  photoItem: index => ({
    width: (width / 3) - (4 / 3),
    height: (width / 3) - (4 / 3),
    marginBottom: 2,
    marginRight: (index + 1) % 3 === 0 ? 0 : 2
  }),
  previewContainer: {
    width, height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
})

export { styles };
