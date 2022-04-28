import Realm from 'realm';
import { REACT_APP_REALM_AUTH_API_KEY } from '@env';
import { routeSchema } from './Schemas/routes';
import { userSchema } from './Schemas/users';

function getRealmApp() {
  const appId = 'ridewise-xstzz'; // Set Realm app ID here.
  const appConfig = {
    id: appId,
    timeout: 10000,
  };
  return new Realm.App(appConfig);
}

export async function getUser() {
  let user;
  try {
    const app = getRealmApp();
    const credentials = Realm.Credentials.serverApiKey(REACT_APP_REALM_AUTH_API_KEY);
    user = await app.logIn(credentials);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function openRealm() {
  console.log('REALM PATH', Realm.defaultPath);
  let user = await getUser();
  let realm;
  try {
    console.log(`Logged in with the user: ${user.id}`);
    const config = {
      schema: [routeSchema, userSchema],
      sync: {
        user: user,
        partitionValue: null,
      },
    };
    realm = await Realm.open(config);
    return realm;
  } catch (error) {
    console.error(error);
  }
}
