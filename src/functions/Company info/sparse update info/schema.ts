export default {
  type: "object",
  properties: {
    realmId: {type: 'string'},
    accessToken: {type: 'string'}
  },
  required: ['realmId', 'accessToken']
} as const;
