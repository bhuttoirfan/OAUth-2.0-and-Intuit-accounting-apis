import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { DynamoDB } from '@libs/dynamodb';
import { oauth_client } from '@libs/oauth';

const get_refresh_token: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    const data = event.body;
    const refresh_token = data.refreshToken;

    const auth_token_info = await oauth_client.refreshUsingToken(refresh_token);
    const a_token = auth_token_info.token.access_token;
    
    // const realmId = data.realmId;
    // const query = {
    //   TableName: "quickbook",
    //   Key: {realmId},
    //   UpdateExpression: "set authToken=:at",
    //   ExpressionAttributeValues: {
    //     ":at": a_token
    //   }
    // }
    // await DynamoDB.updateData(query);

    return formatJSONResponse({
      msg: "Access token updated",
      a_token
    });
  }catch(err) {
    return formatJSONResponse({
      error: err
    });
  }
}

export const main = middyfy(get_refresh_token);