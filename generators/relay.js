const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const execSync = require('child_process').execSync

module.exports = {
  addSupport: (root, name, manager) => {

    console.log(chalk.hex('#cb00ff')('Installing Apollo'))
    execSync(`cd ${name} && ${manager === 'npm' ? 'npm install --save ' : 'yarn add '} apollo-boost react-apollo graphql graphql-tag`, { stdio: [0, 1, 2] })
    fs.unlinkSync(path.join(root, 'index.js'))

    fs.writeFileSync(path.join(root, 'index.js'), `import * as React from 'react'
import { AppRegistry } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'\n
import App from './App'
import { name as appName } from './app.json'\n
// Create the client as outlined in the setup guide
const client = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
})\n
const Apollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)\n
AppRegistry.registerComponent(appName, () => Apollo)`)

    fs.unlinkSync(path.join(root, 'src/screens/HomeScreen.js'))

    fs.writeFileSync(path.join(root, 'src/screens/HomeScreen.js'), `import * as React from 'react' 
import { View, Text } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'\n
const ExchangeRates = () => (
  <Query
    query={gql\`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
      \`}
  >
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>
      if (error) return <Text>Error</Text>
      return data.rates.map(({ currency, rate }) => (
        <View key={currency}>
          <Text>{\`\${ currency}: \${rate}\`}</Text>
        </View>
      ))
    }}
  </Query>
)\n
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Thank you for using rn-cli</Text>
        <ExchangeRates />
      </View>
    )
  }
}
`)

    console.log(chalk.hex('#cb00ff')('Apollo added to your project.'))
  }
}