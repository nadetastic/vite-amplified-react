/**
 * @type {import('@types/aws-lambda').CreateAuthChallengeTriggerHandler}
 */
exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));
  if (event.request.challengeName === 'CUSTOM_CHALLENGE') {
    event.response.publicChallengeParameters = {};
    event.response.publicChallengeParameters.trigger = 'true',
    event.response.publicChallengeParameters.NewDeviceMetadata = null,
    // event.response.publicChallengeParameters.AuthenticationResult = {}
    // event.response.publicChallengeParameters.AuthenticationResult.NewDeviceMetadata = {
    //     NewDeviceMetadata: null,
    // }

    event.response.privateChallengeParameters = {};
    event.response.privateChallengeParameters.answer = 5;
  }
  console.log(JSON.stringify(event, null, 2));
  return event;
};
