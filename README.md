# goodtogoradio

## Cloudways deployment

This app is a standard Vite + React single-page app. For Cloudways, the simplest production setup is:

1. Build the site with `npm install && npm run build`.
2. Upload the contents of `dist/` to your application's `public_html/` directory.
3. Keep the included `.htaccess` file in `public_html/` so React Router routes fall back to `index.html`.

### Important notes

- Production should serve the built static files from `dist/`.
- Do not use `vite` or `vite preview` as the long-running production server unless you intentionally want a Node-based reverse-proxy setup.
- If you deploy the app under a subdirectory instead of the root domain, add Vite `base` config for that path before building.
- The `cloudways` branch is generated from `dist/` plus `cloudways/api/` PHP endpoints and `cloudways/.htaccess`, so pulling that branch on the server includes the admin login and GHL webhook API.

## Admin station intake

The admin station builder is available at `/#/admin/stations`, but it is protected by server-side API authentication. Vercel uses the JavaScript files in `api/`; Cloudways uses the PHP files in `cloudways/api/`.

Set these environment variables in Vercel or Cloudways before using the admin workflow:

- `GOOGLE_CLIENT_ID`: Google OAuth web client ID used by the admin sign-in button.
- `ADMIN_SESSION_SECRET`: long random value used to sign the admin session cookie.
- `ADMIN_USERS`: JSON array of allowed Google account emails. Keep this private in server environment variables.
- `GHL_WEBHOOK_SECRET`: shared secret sent by the GHL webhook after payment.
- `GITHUB_TOKEN`: GitHub token with permission to create and read issues in this repo.
- `GITHUB_REPOSITORY`: `DominaMack/good-to-go-radio-network-73`.
- `GITHUB_ISSUE_LABEL`: optional, defaults to `station-submission`.

Configure the GHL post-payment workflow to send a `POST` request to:

`https://YOUR_DOMAIN/api/ghl/station-submission`

Send the shared secret as either:

- `Authorization: Bearer YOUR_GHL_WEBHOOK_SECRET`
- `x-ghl-webhook-secret: YOUR_GHL_WEBHOOK_SECRET`
- `?secret=YOUR_GHL_WEBHOOK_SECRET`

The webhook accepts common station form fields such as station name, host name, genre, tagline, description, contact email, tier/plan, stream URL, cover image URL, website, Facebook, Instagram, and YouTube. It stores each paid submission as a GitHub issue, then the admin builder can load that issue into a station draft.

Example `ADMIN_USERS` value:

```json
[
  {
    "name": "Admin Name",
    "email": "admin@example.com"
  },
  {
    "name": "Second Admin Name",
    "email": "second.admin@example.com"
  }
]
```

## Mobile app setup

This repo now also supports a Capacitor-based iOS and Android app on the `codex-mobile-app` branch.

### Mobile commands

- `npm run mobile:assets` regenerates the branded app icon and splash assets from `public/branding/`.
- `npm run build:mobile` builds the web app and syncs the latest `dist/` files into `ios/` and `android/`.
- `npm run cap:open:ios` opens the Xcode project.
- `npm run cap:open:android` opens the Android Studio project.

### Store-readiness notes

- iOS background audio is enabled in `Info.plist` and `AppDelegate.swift`.
- Android uses a branded splash theme and launcher assets generated into `android/app/src/main/res/`.
- Before store submission, set your Apple signing team in Xcode and create a Play Console keystore/signing config in Android Studio.
- For Android cloud release builds, see `docs/android-play-release.md`.
