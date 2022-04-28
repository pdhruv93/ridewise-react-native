import React, { useContext } from 'react';
import { ToastAndroid } from 'react-native';
import { UserContext } from '../../../App';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default GoogleLogin = (props) => {
  const { setUserDetails, realmUser } = useContext(UserContext);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log(userInfo.user);
      realmUser.functions
        .addUser({
          body: {
            name: userInfo.user.name,
            userId: userInfo.user.id,
            email: userInfo.user.email,
            profilePic: userInfo.user.photo,
          },
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
