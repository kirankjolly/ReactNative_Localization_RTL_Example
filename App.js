import React from 'react';
import { AppState, AsyncStorage } from 'react-native';
import { translate } from 'react-i18next';
import { createStackNavigator } from 'react-navigation';
import RNLanguages from 'react-native-languages';

import i18n from './src/I18n/index';
import Home from './src/screens/Home';
import Page2 from './src/screens/Page2';


const Stack = createStackNavigator({
  Home: { screen: Home },
  Page2: { screen: Page2 }
});

const WrappedStack = ({ t }) => {
  return <Stack screenProps={{ t }} />;
};
const ReloadAppOnLanguageChange = translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(WrappedStack);

export default class App extends React.Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('aaaa', i18n.language);
      console.log('language', RNLanguages.language.slice(0, 2));
      if (i18n.language != RNLanguages.language) {
        i18n.changeLanguage(RNLanguages.language.slice(0, 2));
        try {
          AsyncStorage.setItem('@APP:languageCode', lang);
        } catch (error) {
          console.log(` Hi Errorrrr : ${error}`);
        }
        console.log(i18n.dir());
        console.log(i18n.language);
      }
    }
    this.setState({ appState: nextAppState });
  }
  render() {
    return (
      <ReloadAppOnLanguageChange />
    );
  }
}

