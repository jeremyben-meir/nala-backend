import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  // const authProvider = event.requestContext.identity.cognitoAuthenticationProvider;
  // const parts = authProvider.split(':');
  // // const userPoolIdParts = parts[parts.length - 3].split('/');
  // // const userPoolId = userPoolIdParts[userPoolIdParts.length - 1];
  // const userPoolUserId = parts[parts.length - 1];

  const params = {
    TableName: process.env.postTableName,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      postId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});