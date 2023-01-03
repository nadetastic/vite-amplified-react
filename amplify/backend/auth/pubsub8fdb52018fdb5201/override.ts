import { AmplifyAuthCognitoStackTemplate,AmplifyRootStackTemplate } from '@aws-amplify/cli-extensibility-helper';
import { 
    ManagedPolicy, 
    Role, 
    ServicePrincipal, 
    PolicyStatement, 
    Effect 
 } from '@aws-cdk/aws-iam';

export function override(resources: AmplifyAuthCognitoStackTemplate, rootresources:AmplifyRootStackTemplate) {

    // const authRole = rootresources.authRole;

    console.log('auth override')
    // const dependencies: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
    //     amplifyResourceProps.category,
    //     amplifyResourceProps.resourceName,
    //     [{
    //       category: "function", // api, auth, storage, function, etc.
    //       resourceName: "<resource-name>" // find the resource at "amplify/backend/<category>/<resourceName>"
    //     } /* add more dependencies as needed */] 
    //   );
    
    // Add a policy to a Role
    // const importedRole = Role.fromRoleName(
    //     this,
    //     'imported-role',
        // authRole.roleName,
        // `arn:aws:iam::${cdk.Stack.of(this).account}:role/Existing-Role-Name`,
        // {mutable: false},
    //   );
  
    // console.log('importedRole 👉', importedRole.roleName);
    // ecsFargateServiceRole.addToPolicy(
    //     new PolicyStatement({
    //     effect: Effect.ALLOW,
    //     resources: ['*'],
    //     actions: [            
    //         'ecr:GetAuthorizationToken',
    //         'ecr:BatchCheckLayerAvailability',
    //         'ecr:GetDownloadUrlForLayer',
    //         'ecr:BatchGetImage',
    //         'logs:CreateLogStream',
    //         'logs:PutLogEvents'
    //     ]
    //     })
    // );
  
    // Add a managed policy to a role you can use
    // importedRole.addManagedPolicy(
    //     ManagedPolicy.fromAwsManagedPolicyName('AmazonECSTaskExecutionRolePolicy')
    // );
}
