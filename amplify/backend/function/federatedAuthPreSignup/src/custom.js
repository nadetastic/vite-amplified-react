var AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  console.log(JSON.stringify(event,null,2))
  
  const { userPoolId } = event
  const { email } = event.request.userAttributes;
  
  const [provider, ...providerValues] = event.userName.split('_');
  const providerValue = providerValues.join('_');
  
  if (provider.length > 0 && providerValues.length > 0) {
      console.log('Provider exists as =>',provider)
      console.log('ProviderValues', JSON.stringify(providerValues,null,2))
    
      const [{ Users }, providerName] = await Promise.all([
        cognitoidentityserviceprovider.listUsers({
            UserPoolId: userPoolId,
            AttributesToGet: ['email'],
            Filter: `email = "${email}"`,
            Limit: 1
        }).promise(),
        getProviderName(userPoolId, provider)
      ]);
    
      console.log('Users',JSON.stringify(Users,null,2))
      console.log(providerName)

    if (providerName && Users.length > 0) {
      for (const user of Users) {
        await cognitoidentityserviceprovider.adminLinkProviderForUser({
            UserPoolId: userPoolId,
            DestinationUser: {
              ProviderName: 'Cognito',
              ProviderAttributeValue: user.Username
            },
            SourceUser: {
              ProviderName: providerName,
              ProviderAttributeName: 'Cognito_Subject',
              ProviderAttributeValue: providerValue
            }
        }).promise();
      }
    } 
  } else {
    console.log('Provider is =>' ,provider)
  }
  
  return event
};


const knownProviderNames = {
  google: 'Google',
  facebook: 'Facebook'
};

const getProviderName = async (userPoolId, providerName) => {
  if (knownProviderNames[providerName]) {
    return knownProviderNames[providerName];
  }

  const { Providers } = await cognito.listIdentityProviders({ UserPoolId: userPoolId }).promise();
  for (const provider of Providers) {
    if (provider.ProviderName.toLowerCase() === providerName.toLowerCase()) {
      return provider.ProviderName;
    }
  }
};