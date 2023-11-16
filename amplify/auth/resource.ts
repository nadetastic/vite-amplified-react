import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});


export const auth2 = defineAuth({
  loginWith: {
    email: true,
  },
});