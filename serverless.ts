import type { AWS } from '@serverless/typescript';

import {
  authorizeUri, saveData, createToken, refreshToken,
  createAccount, queryByName, updateAccount, readAccount,
  getCompanyInfo, readCompanyByID
} from './src/functions/index';

const serverlessConfiguration: AWS = {
  service: 'store-management',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    authorizeUri, saveData, createToken, refreshToken,
    createAccount, queryByName, updateAccount, readAccount,
    getCompanyInfo, readCompanyByID
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        seed: true,
        migrate: true,
        port: 8000
      }
    }
  },
  resources: {
    Resources: {
      quickbook: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "quickbook",
          AttributeDefinitions:[ 
            {AttributeName: "realmId", AttributeType: "S"}
          ],
          KeySchema: [
            {AttributeName: "realmId", KeyType: "HASH"}
          ],
          BillingMode: "PAY_PER_REQUEST"
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
