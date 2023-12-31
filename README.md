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

[![](test-scenario.mov)](https://github.com/radk0s/testcafe-sw-issue/assets/3709378/3c87d74c-0156-4ff0-850e-f9266f62fa9e)

## Running Testcafe automation

* without native automation ```npm run e2e```

  Testcafe executes 1-3 steps form test scenario but fails on 4th.

https://github.com/radk0s/testcafe-sw-issue/assets/3709378/96585405-062b-4114-9f94-c95b0b269b5a


* with native automation ```npm run e2e-native```

  Testcafe runner starts but opens blank page witout any errors.

https://github.com/radk0s/testcafe-sw-issue/assets/3709378/a60754a9-f34f-4565-a92a-9610a6d92e4e


