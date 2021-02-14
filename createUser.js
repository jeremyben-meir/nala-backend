// import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.userTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      firstName: data.firstName, // A unique uuid
      lastName: data.lastName, // Parsed from request body
      profImg: data.profImg, // Parsed from request body
      handle: data.handle,
      reccomendations: data.reccomendations,
      followingPerson: data.followingPerson,
      followingSpot: data.followingSpot,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});