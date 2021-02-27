import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {

  const params = {
    TableName: process.env.postTableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.pathParameters.userId, // The id of the author
      postId: event.pathParameters.postId, // The id of the note from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});