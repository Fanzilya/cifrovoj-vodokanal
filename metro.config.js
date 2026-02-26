// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve(
    'react-native-svg-transformer'
);
config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== 'svg'
);
config.resolver.sourceExts.push('svg');



// Оборачиваем в withNativeWind после настройки SVG
module.exports = withNativeWind(config, { input: './global.css' });