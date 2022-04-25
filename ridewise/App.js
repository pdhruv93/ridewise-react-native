import 'react-native-gesture-handler';
import React, { createContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddRouteScreen from './src/screens/AddRouteScreen';
import { REACT_APP_GOOGLE_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const UserContext = createContext();

export default App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const getGoogleUser = async () => {
      GoogleSignin.configure({
        scopes: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        webClientId: REACT_APP_GOOGLE_CLIENT_ID,
        offlineAccess: true,
        forceCodeForRefreshToken: true,
      });

      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const currentUser = await GoogleSignin.getCurrentUser();
        //console.log(currentUser);
        setUserDetails(currentUser.user);
      }
    };

    getGoogleUser();
  }, []);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AddRouteScreen" component={AddRouteScreen} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};
