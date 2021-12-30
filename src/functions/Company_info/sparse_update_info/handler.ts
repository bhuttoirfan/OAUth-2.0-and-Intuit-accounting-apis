import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema'; 
import axios from 'axios';

const sparse_update: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    const body = event.body;
    const access_token = body.accessToken;
    const realm_id = body.realmId;
    delete body.accessToken;
    delete body.realmId;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> in sparse")
    // By Axios
    const response = await axios.post(`https://sandbox-quickbooks.api.intuit.com/v3/company/${realm_id}/companyinfo`, body, {
      headers: {
            Authorization: `Bearer ${access_token}`
      }
    });
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> in sparse")
    return formatJSONResponse({
      message: response.data
    });
  }catch(err) {
    return formatJSONResponse({
      error: err
    });
  }
}

export const main = middyfy(sparse_update);