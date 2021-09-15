import Link from "next/link";
import { OAuth2AuthCodePKCE } from "@bity/oauth2-auth-code-pkce";

let authorize;
if (typeof window !== "undefined") {
  const oauth = new OAuth2AuthCodePKCE({
    extraAuthorizationParams: {
      provider: "saml",
      tenant: "boxyhq.com",
      product: "demo",
    },
    clientId: '',
    scopes: [],
    authorizationUrl: "http://localhost:5000/oauth/authorize",
    tokenUrl: "http://localhost:5000/oauth/token",
    redirectUrl: "http://localhost:3000",
    onAccessTokenExpiry(refreshAccessToken) {
      console.log("Expired! Access token needs to be renewed.");
      alert(
        "We will try to get a new access token via grant code or refresh token."
      );
      return refreshAccessToken();
    },
    onInvalidGrant(refreshAuthCodeOrRefreshToken) {
      console.log("Expired! Auth code or refresh token needs to be renewed.");
      alert("Redirecting to auth server to obtain a new auth grant code.");
      //return refreshAuthCodeOrRefreshToken();
    },
  });

  authorize = function () {
    oauth.fetchAuthorizationCode();
  }

  oauth
    .isReturningFromAuthServer()
    .then((hasAuthCode) => {
      if (!hasAuthCode) {
        console.log("Something wrong...no auth code.");
      }
      return oauth.getAccessToken().then((token) => console.log(token));
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

      <br/>
      <br/>

      <button onClick={() => window.location.href='/authorize'}>Server-Side Flow</button>

      <br/>
      <br/>

      Hello World.{" "}
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}
