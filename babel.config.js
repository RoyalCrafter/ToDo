module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module:react-native-dotenv", {
      "envName": "APPWRITE",
      "moduleName": "@appwrite",
      "path": "constants/appwrite.env",
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }]
  ],
};
