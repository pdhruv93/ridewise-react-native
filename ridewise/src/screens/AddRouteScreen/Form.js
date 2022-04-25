import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { UserContext } from '../../../App';
import { REACT_APP_MONGO_DB_BASE_URL, REACT_APP_REALM_SECRET } from '@env';
import { Formik } from 'formik';
import { validationSchema } from './validator';
import ReactChipsInput from 'react-native-chips';
import { styles } from '../../styles/Styles';

export default Form = ({ navigation }) => {
  const { userDetails, setUserDetails } = useContext(UserContext);

  return (
    <ScrollView style={{ marginTop: 10, marginBottom: 30 }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          startPoint: '',
          endPoint: '',
          days: [],
          zipCodes: [],
          maxSharingAllowed: '1',
        }}
        onSubmit={(formValues, actions) => {
          axios
            .post(`${REACT_APP_MONGO_DB_BASE_URL}/addRoute?secret=${REACT_APP_REALM_SECRET}`, {
              ...formValues,
              creator: userDetails.id,
            })
            .then(() => {
              console.log('New Route added DB side!!');
              ToastAndroid.show('New Route added!!', ToastAndroid.LONG);
              actions.resetForm();
              navigation.jumpTo('HomeScreen');
            });
        }}
      >
        {(props) => (
          <View>
            <TextInput
              placeholder="Start Point"
              style={style.TextInputStyleClass}
              value={props.values.startPoint}
              onChangeText={props.handleChange('startPoint')}
            />
            <Text style={[style.error]}>{props.errors.startPoint}</Text>

            <TextInput
              placeholder="End Point"
              style={style.TextInputStyleClass}
              placeholderTextColor="#3b4956"
              value={props.values.endPoint}
              onChangeText={props.handleChange('endPoint')}
              keyboardType="numeric"
            />
            <Text style={[style.error]}>{props.errors.endPoint}</Text>

            <Text>Zip codes which might fall into your route</Text>
            <ReactChipsInput
              label="Zip codes which might fall into your route"
              inputStyle={{
                fontSize: 16,
                backgroundColor: '#FFFFFF',
                color: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 18,
                marginBottom: 30,
                height: 50,
              }}
              chipStyle={{ borderColor: 'blue', backgroundColor: 'grey' }}
            />

            <Text>Days when you take this route eg: Mo/Tu</Text>
            <ReactChipsInput
              label="Days when you take this route eg: Mo/Tu"
              inputStyle={{
                fontSize: 16,
                backgroundColor: '#FFFFFF',
                color: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 18,
                marginBottom: 30,
                height: 50,
              }}
              chipStyle={{ borderColor: 'blue', backgroundColor: 'grey' }}
            />

            <TextInput
              placeholder="Max Sharing Allowed"
              style={style.TextInputStyleClass}
              placeholderTextColor="#3b4956"
              value={props.values.maxSharingAllowed}
              onChangeText={props.handleChange('maxSharingAllowed')}
            />
            <Text style={[style.error]}>{props.errors.maxSharingAllowed}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableHighlight style={styles.button} onPress={props.handleSubmit}>
                <Text style={{ color: styles.WHITE_COLOR, fontSize: 15 }}>Submit</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.button}
                onPress={() => navigation.navigate('HomeScreen')}
              >
                <Text style={{ color: styles.WHITE_COLOR, fontSize: 15 }}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  TextInputStyleClass: {
    color: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },

  error: {
    color: 'red',
  },
});
