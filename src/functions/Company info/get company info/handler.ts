import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { oauth_client } from '@libs/oauth';

const company_info: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    const body = event.body;
    const realmId = body.realmId;
    const token = body.accesstoken;
    const query = `select * from CompanyInfo` 

    const response = await oauth_client.makeApiCall({
      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/query?query=${query}&minorversion=40`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
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

export const main = middyfy(company_info);