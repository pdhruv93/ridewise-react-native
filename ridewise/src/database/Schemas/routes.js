import Realm from 'realm';

export const routeSchema = {
  name: 'route',
  properties: {
    _id: 'objectId?',
    creator: 'string?',
    days: 'string[]',
    endPoint: 'string?',
    maxSharingAllowed: 'int?',
    partition_key: 'string?',
    startPoint: 'string?',
    zipCodes: 'string[]',
  },
  primaryKey: '_id',
};
