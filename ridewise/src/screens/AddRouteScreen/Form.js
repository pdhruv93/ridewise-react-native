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
import { Formik } from 'formik';
import { validationSchema } from './validator';
import { styles } from '../../styles/Styles';

export default Form = ({ navigation }) => {
  const { userDetails, realmUser } = useContext(UserContext);

  return (
    <ScrollView style={{ marginTop: 10, marginBottom: 30 }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          startPoint: '',
          endPoint: '',
          days: ['Monday', 'Tuesday', 'Wednesday'],
          zipCodes: ['393930', '393030', '00700'],
          maxSharingAllowed: '1',
        }}
        onSubmit={(formValues, actions) => {
          console.log(formValues);
          realmUser.functions
            .addRoute({
              body: {
                ...formValues,
                creator: userDetails.id,
              },
            })
            .then(() => {
              console.log('New Route added DB side!!');
              ToastAndroid.show('New Route added!!', ToastAndroid.LONG);
              actions.resetForm();
              navigation.navigate('HomeScreen');
            });
        }}
      >
        {(props) => (
          <View>
            <TextInput
              placeholder="Start Point"
              style={styles.textInput}
              value={props.values.startPoint}
              onChangeText={props.handleChange('startPoint')}
            />
            <Text style={[style.error]}>{props.errors.startPoint}</Text>

            <TextInput
              placeholder="End Point"
              style={styles.textInput}
              placeholderTextColor="#3b4956"
              value={props.values.endPoint}
              onChangeText={props.handleChange('endPoint')}
            />
            <Text style={[style.error]}>{props.errors.endPoint}</Text>

            <TextInput
              placeholder="Zip codes falling on your route(83939, 78393..)"
              style={styles.textInput}
              placeholderTextColor="#3b4956"
              value={props.values.zipCodes.join(',')}
            />
            <Text style={[style.error]}>{props.errors.zipCodes}</Text>

            <TextInput
              placeholder="Days when you take this route(Monday, Tuesday..)"
              style={styles.textInput}
              placeholderTextColor="#3b4956"
              value={props.values.days.join(',')}
            />
            <Text style={[style.error]}>{props.errors.days}</Text>

            <TextInput
              placeholder="Max Sharing Allowed"
              style={styles.textInput}
              placeholderTextColor="#3b4956"
              value={props.values.maxSharingAllowed}
              onChangeText={props.handleChange('maxSharingAllowed')}
              keyboardType="numeric"
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
  error: {
    color: 'red',
  },
});
