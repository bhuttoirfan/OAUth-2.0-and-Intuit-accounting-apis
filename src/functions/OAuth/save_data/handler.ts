import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { DynamoDB } from '../../../libs/dynamodb';

const save_data: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    
    // const {realmId, code, state} = event.queryStringParameters;
    const body = event.queryStringParameters;
    const args = {
      TableName:"quickbook",
      Item: {
        // realmId,
        // code,
        // state
        ...body
      }
    }
    
    await DynamoDB.saveData(args);

    return formatJSONResponse({
      // realmId, code, state
      ...body
    });
  }catch(err) {
    return formatJSONResponse({
      error: err
    });
  }
}

export const main = middyfy(save_data);