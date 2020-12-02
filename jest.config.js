module.exports = {
    preset: 'jest-expo',
    moduleFileExtensions: [
      'ts', 'tsx', 'js', 'jsx', 'json', 'node'
    ],
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|galio-framework|@react-navigation|deprecated-react-native-listview|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base|unimodules-permissions-interface)"    
    ],
  };