const homeScreen = `import React from 'react'
import { View, Text } from 'react-native'\n
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Thank you for using rn-cli</Text>
        <Text>Page Home</Text>
      </View>
    );
  }
}\n
`
const settingsScreen = `import React from 'react'
import { View, Text } from 'react-native'\n
export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Thank you for using rn-cli</Text>
        <Text>Page Settings</Text>
      </View>
    );
  }
}\n
`
const bottomTab = `import { createBottomTabNavigator } from 'react-navigation'\n
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'

export default createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
})`

const appRedux = `import * as React from 'react' 
import { Provider } from 'react-redux'
import { store } from './src/config/store'
import Navigator from './src/router'\n
export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
)`
const appSimple = `import * as React from 'react' 
import Navigator from './src/router'\n
export default () => <Navigator />`

module.exports = {
  homeScreen,
  settingsScreen,
  bottomTab,
  appRedux,
  appSimple
}