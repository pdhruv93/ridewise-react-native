import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/Styles';

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    //Wait for 4seconds and then redirect to LoginScreen
    navigation.replace('HomeScreen');
  }, 4000);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: styles.PRIMARY_COLOR,
        padding: 20,
      }}
    >
      <Text
        style={{ color: styles.WHITE_COLOR, fontSize: 60, fontWeight: 'bold', marginBottom: 5 }}
      >
        ridewise
      </Text>
      <Text style={{ color: styles.SECONDARY_COLOR, fontSize: 25 }}>book your carpool now</Text>
    </View>
  );
}
