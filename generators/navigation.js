const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const execSync = require('child_process').execSync
const navigation = require('./strings/navigation')

module.exports = {
  addSupport: (root, name, state, manager) => {

    console.log(chalk.hex('#cb00ff')('Installing React Navigation'))
    execSync(`cd ${name} && ${manager === 'npm' ? 'npm install --save ' : 'yarn add '} react-navigation`, { stdio: [0, 1, 2] })
    execSync(`cd ${name} && mkdir -p src/router`)
    fs.writeFileSync(path.join(root, 'src/screens/HomeScreen.js'), navigation.homeScreen)
    fs.writeFileSync(path.join(root, 'src/screens/SettingsScreen.js'), navigation.settingsScreen)
    fs.writeFileSync(path.join(root, 'src/router/index.js'), navigation.bottomTab)
    if (state === 'yes') {
      fs.unlinkSync(path.join(root, 'App.js'))
      fs.writeFileSync(path.join(root, 'App.js'), navigation.appRedux)
    } else {
      fs.unlinkSync(path.join(root, 'App.js'))
      fs.writeFileSync(path.join(root, 'App.js'), navigation.appSimple)
    }
    console.log(chalk.hex('#cb00ff')('React Navigation added to your project.'))
  }
}