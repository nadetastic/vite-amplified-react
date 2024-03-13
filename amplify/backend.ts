import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";

const backend = defineBackend({
  auth,
  // data,
});

backend.auth.resources.cfnResources.cfnIdentityPool.allowUnauthenticatedIdentities =
  false;

backend.addOutput({
  custom: {
    branch: backend.auth.resources.userPool.node.tryGetContext(
      "amplify-backend-type"
    ),
    namespace: backend.auth.resources.userPool.node.tryGetContext(
      "amplify-backend-namespace"
    ),
    name: backend.auth.resources.userPool.node.tryGetContext(
      "amplify-backend-name"
    ),
  },
});
