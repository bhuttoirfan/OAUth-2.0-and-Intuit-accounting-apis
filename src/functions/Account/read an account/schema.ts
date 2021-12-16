export default {
  type: "object",
  properties: {
    id: {type: 'string'},
    realmId: {type: 'string'},
    accessToken: {type: 'string'}
  },
  required: ['Id', 'realmId', 'accessToken']
} as const;
