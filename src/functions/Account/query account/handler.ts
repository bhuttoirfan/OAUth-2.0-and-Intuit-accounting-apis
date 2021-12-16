import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { oauth_client } from '@libs/oauth';

const query_account: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    
    const {name} = event.pathParameters;
    const realmId = event.body.realmId;
    const token = event.body.accesstoken;

    const query = `select * from Account where Name = '${name}'` 

    const response = await oauth_client.makeApiCall({
      url: `https://sandbox-quickbooks.api.intuit.com//v3/company/${realmId}/query?query=${query}&minorversion=63`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return formatJSONResponse({
      message: response.json.QueryResponse
    });
  }catch(err) {
    return formatJSONResponse({
      error: err
    });
  }
}

export const main = middyfy(query_account);