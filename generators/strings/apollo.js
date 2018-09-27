const homeScreen = `import * as React from 'react'
import { Text, FlatList } from 'react-native'
import { Query } from 'react-apollo'
import { currencyQuery } from '../queries'\n
export default class HomeScreen extends React.Component {
  render() {
    return (
      <Query query={currencyQuery}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error</Text>
          return (
            <FlatList
              keyExtractor={({ currency }) => \`\${currency}\`}
              data={data.rates}
              renderItem={({ item }) =>
                <Text key={item.currency}>{\`\${item.currency}: \${item.rate}\`}</Text>
              }
            />
          )
        }}
      </Query>
    )
  }
}`

const indexScreen = `import * as React from 'react'
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
AppRegistry.registerComponent(appName, () => Apollo)`

const queries = `import gql from 'graphql-tag'\n
export const currencyQuery = gql\`{
  rates(currency: "USD") {
    currency
    rate
  }
}\`
`
module.exports = {
  homeScreen,
  indexScreen,
  queries
}