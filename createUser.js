// import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const authProvider = event.requestContext.identity.cognitoAuthenticationProvider;
  const parts = authProvider.split(':');
  // const userPoolIdParts = parts[parts.length - 3].split('/');
  // const userPoolId = userPoolIdParts[userPoolIdParts.length - 1];
  const userPoolUserId = parts[parts.length - 1];

  const params = {
    TableName: process.env.userTableName,
    Item: {
      userId: userPoolUserId, // The id of the author
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