const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const execSync = require('child_process').execSync

module.exports = {
  addSupport: (root, name, state, manager) => {

    console.log(chalk.hex('#cb00ff')('Installing React Navigation'))
    execSync(`cd ${name} && ${manager === 'npm' ? 'npm install --save ' : 'yarn add '} react-navigation`, { stdio: [0, 1, 2] })
    console.log(chalk.hex('#cb00ff')('Generating folders'))
    execSync(`cd ${name} && mkdir -p src/router`)

    console.log(chalk.hex('#cb00ff')('Generating files'))
    fs.writeFileSync(path.join(root, 'src/screens/HomeScreen.js'), `import React from 'react'
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
`)
    fs.writeFileSync(path.join(root, 'src/screens/SettingsScreen.js'), `import React from 'react'
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
`)
    fs.writeFileSync(path.join(root, 'src/router/index.js'), `import { createBottomTabNavigator } from 'react-navigation'\n
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'

export default createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
})`)
    if (state === 'yes') {
      fs.unlinkSync(path.join(root, 'App.js'))

      fs.writeFileSync(path.join(root, 'App.js'), `import * as React from 'react' 
import { Provider } from 'react-redux'
import { store } from './src/config/store'
import Navigator from './src/router'\n
export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
)`)
    } else {
      fs.unlinkSync(path.join(root, 'App.js'))

      fs.writeFileSync(path.join(root, 'App.js'), `import * as React from 'react' 
import Navigator from './src/router'\n
export default () => <Navigator />`)
    }
    console.log(chalk.hex('#cb00ff')('React Navigation added to your project.'))
  }
}