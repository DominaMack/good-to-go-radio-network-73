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
