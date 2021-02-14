import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.userTableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: event.pathParameters.id, // The id of the author
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET firstName = :firstName, lastName = :lastName, handle = :handle, reccomendations = :reccomendations, followingPerson = :followingPerson, followingSpot = :followingSpot, phoneNum = :phoneNum",
    ExpressionAttributeValues: {
      ":firstName": data.firstName || null,
      ":lastName": data.lastName || null,
      ":handle": data.handle || null,
      ":reccomendations": data.reccomendations || null,
      ":followingPerson": data.followingPerson || null,
      ":followingSpot": data.followingSpot || null,
      ":phoneNum": data.phoneNum || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});