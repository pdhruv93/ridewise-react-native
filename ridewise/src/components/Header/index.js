import React, { useContext } from 'react';
import { View, TouchableHighlight, Image, Text, ToastAndroid } from 'react-native';
import { UserContext } from '../../../App';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { styles } from '../../styles/Styles';

export default Header = ({ navigation }) => {
  const { userDetails, setUserDetails } = useContext(UserContext);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 15,
      }}
    >
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('AddRouteScreen')}
      >
        <Text style={{ color: styles.WHITE_COLOR, fontSize: 15 }}>Add Route</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => {
          GoogleSignin.signOut();
          ToastAndroid.show('Signed Out!!', ToastAndroid.LONG);
          setUserDetails(null);
        }}
      >
        <Image
          style={{ marginLeft: 10, width: 40, height: 40, borderRadius: 20 }}
          source={{
            uri: userDetails
              ? userDetails.photo
              : 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
          }}
        />
      </TouchableHighlight>
    </View>
  );
};
