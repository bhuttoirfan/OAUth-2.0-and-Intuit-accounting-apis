import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { DynamoDB } from '@libs/dynamodb';
import { oauth_client } from '@libs/oauth';

const create_token: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try{
    const args = {
      TableName:"quickbook"
    }
    
    const data = await DynamoDB.scanData(args);
    const realmId = data.Items[0].realmId;
    const code = data.Items[0].code;
    const state = data.Items[0].state;

    const url = `code=${code}&state=${state}&realmId=${realmId}`
    const auth_token_info = await oauth_client.createToken(url);

    const token = auth_token_info.getJson();
    const resfresh_token = token.refresh_token;
    const access_token = token.access_token;

    const query = {
      TableName: "quickbook",
      Key: {realmId},
      UpdateExpression: "set refreshToken=:rt, authToken=:at",
      ExpressionAttributeValues: {
        ":rt": resfresh_token,
        ":at": access_token
      }
    }

    await DynamoDB.updateData(query);

    return formatJSONResponse({
      msg: "Refresh token and access token are created.",
      refreshToken: resfresh_token,
      accessToken: access_token
    });
  }catch(err) {
    return formatJSONResponse({
      error: err
    });
  }
}

export const main = middyfy(create_token);