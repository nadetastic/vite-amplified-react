import { AmplifyAuthCognitoStackTemplate, AmplifyProjectInfo } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate, amplifyProjectInfo: AmplifyProjectInfo) {
    resources.addCfnResource(
        {
          type: "AWS::Cognito::UserPoolIdentityProvider",
          properties: {
            UserPoolId: { Ref: "UserPool" },
            ProviderName: "MyAzure",
            ProviderDetails: {
              MetadataURL:
                "https://login.microsoftonline.com/2476317a-848d-4411-98b1-6469e40e59da/federationmetadata/2007-06/federationmetadata.xml?appid=efbab870-e7ef-464c-b9f8-2a0913db1fa5", 
            },
            ProviderType: "SAML",
            AttributeMapping: {
              email:
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
            },
            IdpIdentifiers: ["MyAzure"],
          },
        },
        "MyAzure"
      );

    //   resources.addCfnResource(
    //     {
    //         type: "AWS::Cognito::UserPoolDomain",
    //         properties: {
    //             Domain: "mydomain-dkkiuna-saml-1488",
    //             UserPoolId: { Ref: "UserPool" },
    //         }
    //     },
    //     "MyUserPoolDomain",
    //   )
    
    //   resources.addCfnCondition(
    //     {
    //         expression: {
    //             creationStack: [],
    //             resolve: () => {
    //                 return { "Fn::Equals": [{ Ref: "env" }, "dev"] };
    //             }
    //         }

    //     },
    //     "MyAzureCondition",
    //   )

      
    
      resources.userPoolClientWeb.supportedIdentityProviders = [
        // "LoginWithAmazon",
        "MyAzure",
      ];

      resources.userPoolClientWeb.logoutUrLs = [
        "http://localhost:5173/",
      ];
      resources.userPoolClientWeb.callbackUrLs = [
        "http://localhost:5173/",
      ];
    
      resources.userPoolClientWeb.allowedOAuthFlows = ["code"];
      resources.userPoolClientWeb.allowedOAuthScopes = ["phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin"];
      resources.userPoolClientWeb.allowedOAuthFlowsUserPoolClient = true;
    
}
