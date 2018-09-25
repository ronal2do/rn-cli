#!/usr/bin/env node
const chalk = require('chalk')
const readline = require('readline')
const program = require('commander')
const inquirer = require('inquirer')
const folder = require('./generators/folder')
const reduxCli = require('./generators/redux')
const apolloCli = require('./generators/apollo')
const navigationCli = require('./generators/navigation')
const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

const blank = '\n'.repeat(process.stdout.rows)

const questions = [
  {
    name: 'name',
    type: 'input',
    message: 'Project name: '
  },
  {
    name: 'manager',
    type: 'list',
    message: 'Package manager: ',
    choices: ['yarn', 'npm'],
    default: 'yarn'
  },
  {
    name: 'creator',
    type: 'list',
    message: 'Project interface: ',
    choices: ['react-native-cli', 'expo'],
    default: 'react-native-cli'
  },
  {
    name: 'compiler',
    type: 'list',
    message: 'Project language: (Typescript avaible only for react-native-cli yet)',
    choices: ['Typescript', 'Javascript'],
    default: 'Javascript'
  },
  {
    name: 'state',
    type: 'list',
    message: 'Add Redux?: ',
    choices: ['yes', 'no'],
    default: 'no'
  },
  {
    name: 'graphql',
    type: 'list',
    message: 'GraphQL support with Apollo?',
    choices: ['yes', 'no'],
    default: 'no'
  },
  {
    name: 'navigation',
    type: 'list',
    message: 'React-Navigation support?',
    choices: ['yes', 'no'],
    default: 'yes'
  }
]

program
  .version('1.0.0')
  .description('React-Native Boilerplate Generator')

program
  .command('init')
  .action(() => {

    console.log(chalk.hex('#cb00ff').bold('                                                       '))
    console.log(chalk.hex('#CB00FF').bold('                                              _/  _/   '))
    console.log(chalk.hex('#CB00FF').bold('   _/  _/_/  _/_/_/                  _/_/_/  _/        '))
    console.log(chalk.hex('#CB00FF').bold('  _/_/      _/    _/  _/_/_/_/_/  _/        _/  _/     '))
    console.log(chalk.hex('#CB00FF').bold(' _/        _/    _/              _/        _/  _/      '))
    console.log(chalk.hex('#CB00FF').bold('_/        _/    _/                _/_/_/  _/  _/       '))
    console.log(chalk.hex('#CB00FF').bold('                                                       '))

    inquirer.prompt(questions)
      .then(answers => {
        const { name, creator, state, compiler, graphql, navigation, manager } = answers

        if (folder.exists(name)) {
          console.log(chalk.red(`Folder ${chalk.bold(name)} already exists. Choose another name for your project.`))
          process.exit(1)
        } else {

          const root = path.resolve(name)

          if (creator === 'expo') {
            console.log(chalk.hex('#cb00ff')(`Generating ${name} using the Native CLI`))
            console.log(chalk.hex('#cb00ff')(`Installing dependencies. This could take a while...`))
            execSync(`create-react-native-app ${name}`, { stdio: [0, 1, 2] })

            console.log(blank)
            readline.cursorTo(process.stdout, 0, 0)
            readline.clearScreenDown(process.stdout)

            console.log(chalk.hex('#cb00ff')('Generating folder structure...'))
            execSync(`cd ${name} && mkdir -p src/assets src/components src/views src/services src/config`)
          }

          if (creator === 'react-native-cli') {
            console.log(chalk.hex('#cb00ff')(`Generating ${name} using the Native CLI`))
            console.log(chalk.hex('#cb00ff')(`Installing dependencies. This could take a while...`))
            if (compiler === 'Typescript') {
              // https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native
              // https://github.com/emin93/react-native-template-typescript
              execSync(`react-native init ${name} --template typescript && node ${name}/setup.js`, { stdio: [0, 1, 2] })
            } else {
              execSync(`react-native init ${name}`, { stdio: [0, 1, 2] })
            }
            readline.cursorTo(process.stdout, 0, 0)
            readline.clearScreenDown(process.stdout)

            console.log(chalk.hex('#cb00ff')('Generating folder structure...'))
            execSync(`cd ${name} && mkdir -p src/screens src/config && touch src/screens/HomeScreen.js`)
          }

          if (state === 'yes') {
            reduxCli.addSupport(root, name, state, manager)
          }

          // if (graphql === 'relay') {
          //   // relayCli.addSupport(root, name)
          //   console.log(chalk.hex('#cb00ff').bold('adding relay!\n'))
          // }

          if (navigation === 'yes') {
            navigationCli.addSupport(root, name, state, manager)
            console.log(chalk.hex('#cb00ff').bold('adding react-navigation!\n'))
          }

          if (graphql === 'yes') {
            apolloCli.addSupport(root, name, state, manager)
            console.log(chalk.hex('#cb00ff').bold('adding apollo!\n'))
          }

          console.log(chalk.hex('#cb00ff').bold('Finished!, Thank you for using rn-cli!\n'))

          docs.readme(root, name)
          process.exit(1)
        }
      })
  })

program.parse(process.argv)