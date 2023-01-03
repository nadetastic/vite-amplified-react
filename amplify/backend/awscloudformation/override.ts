import { AmplifyRootStackTemplate } from '@aws-amplify/cli-extensibility-helper';
// import { ManagedPolicy } from '@aws-cdk/aws-iam';
export function override(resources: AmplifyRootStackTemplate) {
    const authRole = resources.authRole;
    const unauthRole = resources.unauthRole;

    const basePolicies = Array.isArray(authRole.policies) ? authRole.policies : [authRole.policies];

    const unAuthPolicies = Array.isArray(unauthRole.policies) ? unauthRole.policies : [unauthRole.policies];

//   const mp1 = ManagedPolicy.fromAwsManagedPolicyName('AWSIoTDataAccess')
  
//   authRole.managedPolicyArns = [ 
//     ...authRole.managedPolicyArns,
//     mp1.managedPolicyArn
//   ]
    authRole.policies = [
        ...basePolicies,
        pubsubPolicy
    ];

    unauthRole.policies = [
        ...unAuthPolicies,
        pubsubPolicy
    ];
}


const pubsubPolicy ={
    policyName: "amplify-permissions-for-pubsub",
    policyDocument: {
        Version: "2012-10-17",
        Statement: [{
            Resource: "*",
            Action: ["iot:*"],
            Effect: "Allow",
        }],
    },
}

