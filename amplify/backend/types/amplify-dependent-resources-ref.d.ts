export type AmplifyDependentResourcesAttributes = {
  "auth": {
    "AuthStorageGroups": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "AdminsGroupRole": "string"
    }
  },
  "storage": {
    "AuthStorageGroups": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}