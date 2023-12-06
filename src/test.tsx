import { generateClient } from "aws-amplify/api";

const client = generateClient();


export const publishDoc = /* GraphQL */ `
  mutation Publish($data: AWSJSON!, $name: String!) {
    publish(data: $data, name: $name) {
      data
      name
    }
  }
`;

export async function publish(name: string, data: string) {
  try {
    const result = await client.graphql({
      query: publishDoc,
      variables: {
        name,
        data,
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
