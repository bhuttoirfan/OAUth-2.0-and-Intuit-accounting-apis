export default {
  type: "object",
  properties: {
    Name: {type: 'string'},
    AccountType: {type: 'string'}
  },
  required: ['Name', 'AccountType']
} as const;
