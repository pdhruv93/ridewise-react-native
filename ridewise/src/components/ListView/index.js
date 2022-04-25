import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, StyleSheet, FlatList, Image, Linking, ToastAndroid } from 'react-native';
import axios from 'axios';
import { REACT_APP_MONGO_DB_BASE_URL, REACT_APP_REALM_SECRET } from '@env';
import { styles } from '../../styles/Styles';

export default ListView = (props) => {
  const [routesList, setRoutesList] = useState([]);
  const { userDetails, setUserDetails } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${REACT_APP_MONGO_DB_BASE_URL}/getAllRoutes?secret=${REACT_APP_REALM_SECRET}`)
      .then((routes) => setRoutesList(routes.data));
  }, []);

  function deleteRoute(routeId) {
    console.log(`Deleting routeId: ${routeId}`);
    axios
      .delete(
        `${REACT_APP_MONGO_DB_BASE_URL}/deleteRoute?secret=${REACT_APP_REALM_SECRET}&routeId=${routeId}`
      )
      .then(() => {
        console.log('Route deleted DB side!!');
        ToastAndroid.show('Route deleted!!', ToastAndroid.LONG);
      });
  }

  return routesList ? (
    <FlatList
      data={routesList}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id.$oid}
      renderItem={({ item }) => {
        //console.log(item.creatorDetails[0]);
        return (
          <View
            style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={style.image}
                source={{
                  uri: item.creatorDetails[0].profilePic,
                }}
              />
              <View style={{ marginHorizontal: 10, justifyContent: 'space-between' }}>
                <Text
                  style={{
                    color: styles.BLACK_COLOR,
                    fontSize: 16,
                    fontWeight: '500',
                    letterSpacing: 0.8,
                  }}
                >
                  {item.startPoint} - {item.endPoint}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '500', letterSpacing: 0.8 }}>
                  {item.days.map((day) => day.substring(0, 2) + ' ')}
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {item.creatorDetails[0].name} / Max Sharing: {item.maxSharingAllowed.$numberInt}
                </Text>
              </View>
            </View>
            <View>
              {userDetails &&
                (userDetails?.id == item.creatorDetails[0].userId ? (
                  <MaterialCommunityIcons
                    name="delete"
                    color={styles.PRIMARY_COLOR}
                    size={25}
                    onPress={() => deleteRoute(item._id.$oid)}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="email"
                    color={styles.PRIMARY_COLOR}
                    size={25}
                    onPress={() => Linking.openURL(`mailto:${item.creatorDetails[0].email}`)}
                  />
                ))}
            </View>
          </View>
        );
      }}
    />
  ) : (
    <h2>Loading routes list...</h2>
  );
};

const style = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});
