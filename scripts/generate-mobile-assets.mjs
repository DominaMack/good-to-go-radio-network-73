import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const squareLogo = path.join(root, "public/branding/goodtogoradio-logo-square.png");
const horizontalLogo = path.join(root, "public/branding/goodtogoradio-logo-horizontal.png");
const resourcesDir = path.join(root, "resources/mobile");

const colors = {
  background: "#0f0f0f",
  backgroundSoft: "#171717",
  primary: "#f3c23a",
  primaryDeep: "#d39a14",
  text: "#f8f3df",
};

const androidIconSizes = [
  { folder: "mipmap-mdpi", size: 48 },
  { folder: "mipmap-hdpi", size: 72 },
  { folder: "mipmap-xhdpi", size: 96 },
  { folder: "mipmap-xxhdpi", size: 144 },
  { folder: "mipmap-xxxhdpi", size: 192 },
];

const androidForegroundSizes = [
  { folder: "mipmap-mdpi", size: 108 },
  { folder: "mipmap-hdpi", size: 162 },
  { folder: "mipmap-xhdpi", size: 216 },
  { folder: "mipmap-xxhdpi", size: 324 },
  { folder: "mipmap-xxxhdpi", size: 432 },
];

const androidSplashTargets = [
  "drawable/splash.png",
  "drawable-port-mdpi/splash.png",
  "drawable-port-hdpi/splash.png",
  "drawable-port-xhdpi/splash.png",
  "drawable-port-xxhdpi/splash.png",
  "drawable-port-xxxhdpi/splash.png",
  "drawable-land-mdpi/splash.png",
  "drawable-land-hdpi/splash.png",
  "drawable-land-xhdpi/splash.png",
  "drawable-land-xxhdpi/splash.png",
  "drawable-land-xxxhdpi/splash.png",
];

const ensureDir = async (filePath) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
};

const svgOverlay = (width, height) => `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="38%" r="70%">
        <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.35" />
        <stop offset="55%" stop-color="${colors.primaryDeep}" stop-opacity="0.12" />
        <stop offset="100%" stop-color="${colors.background}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.14" />
        <stop offset="100%" stop-color="${colors.primaryDeep}" stop-opacity="0.02" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#glow)" />
    <rect x="${Math.round(width * 0.04)}" y="${Math.round(height * 0.04)}" width="${Math.round(width * 0.92)}" height="${Math.round(height * 0.92)}" rx="${Math.round(width * 0.09)}" fill="none" stroke="url(#sheen)" stroke-width="${Math.max(4, Math.round(width * 0.006))}" />
  </svg>
`;

const splashCaptionSvg = (width, height) => `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="75%" text-anchor="middle" fill="${colors.text}" opacity="0.82"
      style="font-family: Avenir Next, Helvetica Neue, Arial, sans-serif; font-size: 108px; font-weight: 600; letter-spacing: 18px;">
      LISTEN LIVE ANYWHERE
    </text>
  </svg>
`;

async function makeIconSource() {
  const size = 1024;
  const base = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: colors.background,
    },
  });

  const logo = await sharp(squareLogo)
    .resize(760, 760, { fit: "contain" })
    .png()
    .toBuffer();

  const output = path.join(resourcesDir, "icon-source.png");
  await ensureDir(output);

  await base
    .composite([
      { input: Buffer.from(svgOverlay(size, size)) },
      { input: logo, gravity: "center" },
    ])
    .png()
    .toFile(output);

  return output;
}

async function makeSplashSource() {
  const size = 2732;
  const base = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: colors.backgroundSoft,
    },
  });

  const logo = await sharp(horizontalLogo)
    .resize(1900, 820, { fit: "contain" })
    .png()
    .toBuffer();

  const output = path.join(resourcesDir, "splash-source.png");
  await ensureDir(output);

  await base
    .composite([
      { input: Buffer.from(svgOverlay(size, size)) },
      { input: logo, gravity: "center" },
      { input: Buffer.from(splashCaptionSvg(size, size)) },
    ])
    .png()
    .toFile(output);

  return output;
}

async function makeAndroidForeground() {
  const source = path.join(resourcesDir, "android-foreground-source.png");
  const logo = await sharp(squareLogo)
    .resize(720, 720, { fit: "contain" })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(source);

  return source;
}

async function writeIosAssets(iconSource, splashSource) {
  await sharp(iconSource).resize(1024, 1024).png().toFile(
    path.join(root, "ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png"),
  );

  const splashTargets = [
    "ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732.png",
    "ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-1.png",
    "ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-2.png",
  ];

  await Promise.all(
    splashTargets.map((target) =>
      sharp(splashSource).resize(2732, 2732).png().toFile(path.join(root, target)),
    ),
  );
}

async function writeAndroidAssets(iconSource, foregroundSource, splashSource) {
  await Promise.all(
    androidIconSizes.flatMap(({ folder, size }) => {
      const basePath = path.join(root, `android/app/src/main/res/${folder}`);
      return [
        sharp(iconSource).resize(size, size).png().toFile(path.join(basePath, "ic_launcher.png")),
        sharp(iconSource).resize(size, size).png().toFile(path.join(basePath, "ic_launcher_round.png")),
      ];
    }),
  );

  await Promise.all(
    androidForegroundSizes.map(({ folder, size }) =>
      sharp(foregroundSource)
        .resize(size, size)
        .png()
        .toFile(path.join(root, `android/app/src/main/res/${folder}/ic_launcher_foreground.png`)),
    ),
  );

  await Promise.all(
    androidSplashTargets.map((target) =>
      sharp(splashSource).resize(2732, 2732).png().toFile(path.join(root, `android/app/src/main/res/${target}`)),
    ),
  );
}

async function main() {
  const iconSource = await makeIconSource();
  const splashSource = await makeSplashSource();
  const foregroundSource = await makeAndroidForeground();

  await writeIosAssets(iconSource, splashSource);
  await writeAndroidAssets(iconSource, foregroundSource, splashSource);

  console.log("Generated mobile icon and splash assets.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
