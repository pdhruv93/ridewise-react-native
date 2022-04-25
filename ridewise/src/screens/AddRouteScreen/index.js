import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { UserContext } from '../../../App';
import GoogleLogin from '../../components/GoogleLogin';
import Form from './Form';
import { styles } from '../../styles/Styles';

export default AddRouteScreen = ({ navigation }) => {
  const { userDetails, setUserDetails } = useContext(UserContext);

  return userDetails ? (
    <View style={{ marginVertical: 15, marginHorizontal: styles.FIXED_MARGIN }}>
      <Text style={styles.title}>Add new route</Text>
      <Form navigation={navigation} />
    </View>
  ) : (
    <View style={{ margin: 20 }}>
      <View>
        <Text style={styles.title}>You need to login</Text>
        <Text style={styles.title}>to add route</Text>
      </View>
      <GoogleLogin />
    </View>
  );
};
