import * as AWS from "aws-sdk";

const dynamo =new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
});

export const DynamoDB = {
    async saveData(query) {
        await dynamo.put(query).promise();
    },

    async scanData(query) {
        try {
            return await dynamo.scan(query).promise();
        }catch(err) {
            console.log(err);
        }
        
    },

    async updateData(query) {
        await dynamo.update(query).promise();
    }
}