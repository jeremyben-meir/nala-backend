import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.userTableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.pathParameters.userId,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});