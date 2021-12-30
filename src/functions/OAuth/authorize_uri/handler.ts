import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import opn from "opn";

import { oauth_client } from '@libs/oauth';

const authorize_uri: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try{
    const OAuthClient = require('intuit-oauth');
    // AuthorizationUri
    const auth_uri = oauth_client.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: 'testState',
    }); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}
    

    // const res = {
    //   headers: {
    //     location: auth_uri
    //   }
    // }

    // Redirect the authUri
    opn(auth_uri)
    
    return formatJSONResponse({
      message: "Authorizing"
    });
  }catch(err) {
    return formatJSONResponse({
      error: err
    });
  }
}

export const main = middyfy(authorize_uri);