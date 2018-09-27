const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const execSync = require('child_process').execSync
const apollo = require('./strings/apollo')

module.exports = {
  addSupport: (root, name, manager) => {
    console.log(chalk.hex('#cb00ff')('Installing Apollo...'))
    execSync(`cd ${name} && ${manager === 'npm' ? 'npm install --save ' : 'yarn add '} apollo-boost react-apollo graphql graphql-tag`, { stdio: [0, 1, 2] })
    execSync(`cd ${name} && mkdir -p src/queries && touch index.js`)
    fs.unlinkSync(path.join(root, 'src/queries/index.js'))
    fs.writeFileSync(path.join(root, 'src/queries/index.js'), apollo.queries)
    fs.unlinkSync(path.join(root, 'index.js'))
    fs.writeFileSync(path.join(root, 'index.js'), apollo.indexScreen)
    fs.unlinkSync(path.join(root, 'src/screens/HomeScreen.js'))
    fs.writeFileSync(path.join(root, 'src/screens/HomeScreen.js'), apollo.homeScreen)
    console.log(chalk.hex('#cb00ff')('Apollo added to your project.'))
  }
}