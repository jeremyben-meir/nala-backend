// import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: "123", // The id of the author
      firstName: data.firstName, // A unique uuid
      lastName: data.lastName, // Parsed from request body
      profImg: data.profImg, // Parsed from request body
      handle: data.handle,
      reccomendations: data.reccomendations,
      followingPerson: data.followingPerson,
      followingSpot: data.followingSpot,
      phoneNum: data.phoneNum,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}