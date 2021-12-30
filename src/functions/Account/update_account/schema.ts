export default {
  type: "object",
  properties: {
    realmId: {type: 'string'},
    accessToken: {type: 'string'},
    Name: {type: 'string'},
    Id: {type: 'string'}
  },
  required: ['Name', 'Id', 'realmId', 'accessToken']
} as const;
