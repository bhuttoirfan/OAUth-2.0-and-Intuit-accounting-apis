import OAuthClient from 'intuit-oauth';
export const oauth_client = new OAuthClient({
  clientId: 'ABV63cxx636dgOrP2H9RTrKMlDN8K98Ci5RM55kWzO8BoCZZSD',
  clientSecret: 'zAPhIO7qaNaNWsmtW6Nf0vf3jb9nQkkZsTIY0m5w',
  environment: 'sandbox',
  redirectUri: 'http://localhost:3000/dev/saveData',
});