import "./style.css";
import { OidcClient } from "@axa-fr/oidc-client";
import { Router } from "./Router";
import { oidcConfiguration } from "./oidcConfiguration";

const router = new Router();

document.body.innerHTML = `<div id="my-vanilla-app"></div>`;
const element = document.getElementById("my-vanilla-app");

const href = window.location.href;
const vanillaOidc = OidcClient.getOrCreate(() => fetch)(oidcConfiguration);

vanillaOidc.tryKeepExistingSessionAsync().then(() => {
  if (href.includes(oidcConfiguration.redirect_uri)) {
    // @ts-ignore
    element.innerHTML = `<div>
            <h1>@axa-fr/oidc-client demo</h1>
            <h2>Loading callback</h2>
        </div>`;
    vanillaOidc.loginCallbackAsync().then(() => {
      router.getCustomHistory().replaceState("/");
      // @ts-ignore
      window.logout = () => vanillaOidc.logoutAsync();
      const tokens = vanillaOidc.tokens;
      // @ts-ignore
      element.innerHTML = `<div>
            <h1>@axa-fr/oidc-client demo</h1>
            <button id="logout" onclick="window.logout()">Logout</button>
            <h2>Authenticated</h2>
            <pre>${JSON.stringify(tokens, null, "\t")}</pre>
        </div>`;
    });
    return;
  }

  const tokens = vanillaOidc.tokens;

  if (tokens) {
    // @ts-ignore
    window.logout = () => vanillaOidc.logoutAsync();
    // @ts-ignore
    element.innerHTML = `<div>
            <h1>@axa-fr/oidc-client demo</h1>
            <button id="logout" onclick="window.logout()">Logout</button>
            <h2>Authenticated</h2>
            <pre>${JSON.stringify(tokens, null, "\t")}</pre>
        </div>`;
  } else {
    // @ts-ignore
    window.login = () => {
      // @ts-ignore
      element.innerHTML = `<div>
            <h1>@axa-fr/oidc-client demo</h1>
            <h2>Loading</h2>
        </div>`;
      vanillaOidc.loginAsync("/");
    };
    // @ts-ignore
    element.innerHTML = `<div>
            <h1>@axa-fr/oidc-client demo</h1>
            <button id="login" onclick="window.login()">Login</button>
        </div>`;
  }
});
