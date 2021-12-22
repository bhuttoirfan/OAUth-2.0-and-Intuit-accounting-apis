import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { oauth_client } from '@libs/oauth'; 
import axios from 'axios';

const query_account: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    const body = event.body;

    const id = body.id; 
    const access_token = body.accessToken;
    const realm_id = body.realmId;

    // const response = await oauth_client.makeApiCall({
    //   url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${realm_id}/companyinfo/${id}?minorversion=40`,
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${access_token}`
    //   } 
    // });

    // By Axios
    const response = await axios.get(`https://sandbox-quickbooks.api.intuit.com/v3/company/${realm_id}/companyinfo/${id}?minorversion=40`, {
      headers: {
            Authorization: `Bearer ${access_token}`
      }
    });
    
    return formatJSONResponse({
      message: response.data
    });
  }catch(err) {
    return formatJSONResponse({
      error: err
    });
  }
}

export const main = middyfy(query_account);