# Android Play Release

This project can build Android artifacts in GitHub Actions, so you do not need Android Studio on your Mac.

## What Google Play expects

- Upload an Android App Bundle (`.aab`) for Play Store releases.
- Increase `versionCode` for every upload.
- Keep `targetSdkVersion` at or above the current Play requirement.

## One-time GitHub setup

Add these repository secrets in GitHub:

- `GTG_ANDROID_KEYSTORE_BASE64`
- `GTG_UPLOAD_STORE_PASSWORD`
- `GTG_UPLOAD_KEY_ALIAS`
- `GTG_UPLOAD_KEY_PASSWORD`

`GTG_ANDROID_KEYSTORE_BASE64` should be the base64-encoded contents of your release keystore file.

## Running a cloud build

1. Open the GitHub repository.
2. Go to `Actions`.
3. Open `Android Release Build`.
4. Click `Run workflow`.
5. Choose:
   - `assembleDebug` if you want a test APK.
   - `bundleRelease` if you want a Play Store `.aab`.
6. Set `version_name`, for example `1.0.0`.
7. Set `version_code`, for example `1`.

The workflow uploads the finished file as a GitHub Actions artifact.

## Versioning rules

- `versionCode` must always go up: `1`, `2`, `3`, and so on.
- `versionName` is the human-readable label, such as `1.0.0`.

## Play Console path

1. Create the app in Play Console.
2. Start with `Internal testing`.
3. Upload the generated `.aab`.
4. Add your tester email.
5. Install the app from the Play Store test link.

## Local overrides

The Android Gradle project reads these environment variables or Gradle properties:

- `GTG_VERSION_CODE`
- `GTG_VERSION_NAME`
- `GTG_UPLOAD_STORE_FILE`
- `GTG_UPLOAD_STORE_PASSWORD`
- `GTG_UPLOAD_KEY_ALIAS`
- `GTG_UPLOAD_KEY_PASSWORD`
