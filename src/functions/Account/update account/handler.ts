import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { oauth_client } from '@libs/oauth';
import axios from 'axios';

const update_account: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    
    // For Account Record Updation
    // Must required params => Name, Id, AccountType, SyncToken
    // and other attributes that you want to update
    // Remember: Id, AccountType, SyncToken can never be updated
    // SyncToken (number format) auto-increments at every update
    const body = event.body;
    const realmId = body.realmId;
    const access_token = body.accessToken;
    delete body.realmId;
    delete body.accessToken;

    const response = await oauth_client.makeApiCall({
      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/account?minorversion=63`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      body
    });
    
    return formatJSONResponse({
      message: response.json
    });
  }catch(err) {
    return formatJSONResponse({
      error: err
    });
  }
}

export const main = middyfy(update_account);