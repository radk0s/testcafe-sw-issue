# testcafe-sw-issue

Sample app with authentication based on` @axa-fr/oidc-client` solution with service worker. Library is using SW to store auth data and intercepts http requests to inject access tokens.

## Build and run the app

```
npm install
npm run build
npm run serve
```

## Manual test scenario

1. Open http://localhost:3000/.
2. Click `Login` button.
3. Provide credentials on external IDP page `bob`/`bob` and press `Enter`.
4. Authenticated user is redirected to http://localhost:3000/ and can log out.

## Running Testcafe automation

* without native automation ```npm run e2e```

  Testcafe executes 1-3 steps form test scenario but fails on 4th.
  
* with native automation ```npm run e2e-native```

  Testcafe runner starts but opens blank page witout any errors.
   
