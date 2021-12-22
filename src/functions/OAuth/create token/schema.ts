export default {
  type: "object",
  properties: {
    code: {type: 'string'},
    state: {type: 'string'},
    realmId: {type: 'string'}
  },
  required: ['code', 'state', 'realmId']
} as const;
