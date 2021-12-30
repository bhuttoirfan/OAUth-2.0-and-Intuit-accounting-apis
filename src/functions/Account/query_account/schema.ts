export default {
  type: "object",
  properties: {
    realmId: {type: 'string'},
    accessToken: {type: 'string'}
  },
  required: ['Name', 'AccountType']
} as const;
