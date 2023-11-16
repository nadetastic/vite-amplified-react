import { defineBackend } from '@aws-amplify/backend';
import { auth, auth2 } from './auth/resource.js';
import { data } from './data/resource.js';

defineBackend({
  auth,
  data,
  auth2
});
