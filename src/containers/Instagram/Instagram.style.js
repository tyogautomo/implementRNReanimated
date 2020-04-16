import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    elevation: 2,
    backgroundColor: 'white'
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
    alignItems: 'center'
  }
})

export { styles };
