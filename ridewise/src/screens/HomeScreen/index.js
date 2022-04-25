import React from 'react';
import { Text, View } from 'react-native';
import ListView from '../../components/ListView';
import Header from '../../components/Header';
import { styles } from '../../styles/Styles';

function HomeScreen({ navigation }) {
  return (
    <View
      style={{ display: 'flex', flex: 1, backgroundColor: styles.BACKGROUND_COLOR, padding: 15 }}
    >
      <Header navigation={navigation} />

      <View>
        <Text style={styles.title}>Find Your</Text>
        <Text style={styles.title}>Perfect Ride</Text>
      </View>

      <View style={{ marginVertical: 20, flex: 1 }}>
        <ListView />
      </View>
    </View>
  );
}

export default HomeScreen;
