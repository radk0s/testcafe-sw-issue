
export const oidcConfiguration = {
    client_id: "interactive.public.short",
    redirect_uri: window.location.origin + "/#/authentication/callback",
    silent_redirect_uri:
      window.location.origin + "/#/authentication/silent-callback",
    scope: "openid profile email api offline_access",
    authority: "https://demo.duendesoftware.com",
    refresh_time_before_tokens_expiration_in_second: 40,
    service_worker_relative_url: "/OidcServiceWorker.js",
    service_worker_only: false,
  };
  