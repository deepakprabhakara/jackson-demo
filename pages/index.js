import { OAuth2AuthCodePKCE } from '@bity/oauth2-auth-code-pkce';

let authorize;
if (typeof window !== 'undefined') {
  const oauth = new OAuth2AuthCodePKCE({
    extraAuthorizationParams: {
      provider: 'saml',
    },
    clientId: '',
    scopes: [],
    authorizationUrl: 'http://localhost:5000/oauth/authorize',
    tokenUrl: 'http://localhost:5000/oauth/token',
    redirectUrl: 'http://localhost:3000',
    clientId: 'tenant=boxyhq.com&product=demo',
    clientSecret: 'dummy',
    onAccessTokenExpiry(refreshAccessToken) {
      console.log('Expired! Access token needs to be renewed.');
      alert(
        'We will try to get a new access token via grant code or refresh token.'
      );
      return refreshAccessToken();
    },
    onInvalidGrant(refreshAuthCodeOrRefreshToken) {
      console.log('Expired! Auth code or refresh token needs to be renewed.');
      alert('Redirecting to auth server to obtain a new auth grant code.');
      //return refreshAuthCodeOrRefreshToken();
    },
  });

  authorize = function () {
    oauth.fetchAuthorizationCode();
  };

  function json(response) {
    return response.json();
  }

  oauth
    .isReturningFromAuthServer()
    .then((hasAuthCode) => {
      if (!hasAuthCode) {
        console.log('Something wrong...no auth code.');
      }
      return oauth.getAccessToken().then((token) => {
        console.log(token.token.value);
        fetch(
          'http://localhost:5000/oauth/userinfo?access_token=' +
            token.token.value,
          {
            method: 'post',
            headers: {},
          }
        )
          .then(json)
          .then(function (data) {
            console.log('Request succeeded with JSON response', data);
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
      });
    })
    .catch((potentialError) => {
      if (potentialError) {
        console.log(potentialError);
      }
    });
}

export default function IndexPage() {
  return (
    <div>
      <button onClick={authorize}>Client-Side Flow</button>
      <br />
      <br />
      This is a demo app to showcase BoxyHQ's SAML integration. It is
      implemented as an OAuth 2.0 flow and can be used with most standard OAuth
      2.0 libraries out there.
    </div>
  );
}
