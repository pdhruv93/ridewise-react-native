import React, { useContext } from 'react';
import { ToastAndroid } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../../App';
import { REACT_APP_MONGO_DB_BASE_URL, REACT_APP_REALM_SECRET } from '@env';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default GoogleLogin = (props) => {
  const { userDetails, setUserDetails } = useContext(UserContext);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log(userInfo.user);
      axios
        .post(`${REACT_APP_MONGO_DB_BASE_URL}/addUser?secret=${REACT_APP_REALM_SECRET}`, {
          name: userInfo.user.name,
          userId: userInfo.user.id,
          email: userInfo.user.email,
          profilePic: userInfo.user.photo,
        })
        .then(() => {
          console.log('Users Table updated at DB side!!');
          ToastAndroid.show('Login successfull!!', ToastAndroid.LONG);
          setUserDetails(userInfo.user);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  );
};
