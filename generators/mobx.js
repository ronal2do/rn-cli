const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const execSync = require('child_process').execSync

module.exports = {
  addSupport: (root, name, state, manager) => {

    console.log(chalk.hex('#cb00ff')('Installing Redux dependencies...'))
    execSync(`cd ${name} && ${manager === 'npm' ? 'npm install --save ' : 'yarn add '} redux react-redux redux-thunk`, { stdio: [0, 1, 2] })
    execSync(`cd ${name} && mkdir -p src/reducers`)

    console.log(chalk.hex('#cb00ff')('Generating files...'))
    fs.writeFileSync(path.join(root, 'src/reducers/index.js'), `import { combineReducers } from 'redux' 
import { default as auth } from './Auth' \n
export default combineReducers({ auth })`)

    fs.writeFileSync(path.join(root, 'src/reducers/Auth.js'), `export const AUTHENTICATE_USER = 'auth/AUTHENTICATE_USER'\n
const INITIAL_STATE = { user: null }\n
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTHENTICATE_USER:
      return state
    default:
      return state
  }
}\n
export const authenticateUser = () => ({ type: AUTHENTICATE_USER })`)

    fs.writeFileSync(path.join(root, 'src/config/store.js'), ` import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

export const store = createStore(reducers, applyMiddleware(thunk))
`)

    fs.unlinkSync(path.join(root, 'App.js'))

    fs.writeFileSync(path.join(root, 'App.js'), `import * as React from 'react' 
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/config/store'\n
export default () => (
  <Provider store={store}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Thank you for using rn-cli</Text>
    </View>
  </Provider>
)`)

    console.log(chalk.hex('#cb00ff')('Redux added to your project.'))
  }
}