import Realm from 'realm';

export const userSchema = {
  name: 'user',
  properties: {
    _id: 'objectId?',
    email: 'string?',
    name: 'string?',
    partition_key: 'string?',
    profilePic: 'string?',
    userId: 'string?',
  },
  primaryKey: '_id',
};
