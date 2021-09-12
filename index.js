#!/usr/bin/env node
require = require('esm')(module /*, options*/);
var fs = require('fs');
// import arg from 'arg';
arg = require("arg")
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fse = require('fs-extra');



console.log(
  chalk.yellow(
    figlet.textSync('React CLI', { horizontalLayout: 'full' })
  )
);



function getData(path) {
  arr = path.split("/")
  let className = arr[arr.length-1]
  let data = `import React from "react";

export default class ${className} extends React.Component { 
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1>${className}</h1>
    )
  }
}`
  return data
  // console.log("test", arr[arr.length-1])
}

function fsetest(path) {
  let data = getData(path)
  if (fs.existsSync(path + ".js")) {
    //file exists
    console.log(chalk.red("Component exists. Please choose another name"))
    return
  }
  fse.outputFileSync(path + '.js', data)
}

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--component': Boolean,
      '--form': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '-c': '--component',
      '-f': '--form'
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
    component: args['--component'] || false,
    form: args['--form'] || false,
  };
 }

function createComponent(args, options) {
  console.log("createComponent", 'here', options.template == undefined)
  if(options.template) {
    console.log('inside')
    let path = args.slice(3)[0] ;
    fsetest(path)
    console.log(chalk.green('Done'))
    return
  }
  console.log(chalk.red(
    'Invalid command Please enter component name. \nuse "rc -c test" to create new component with name test.js\nuse "rc -f myForm" to create new form'
  ))
}

function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  console.log(options, args, args.length);
  if(options.component) {
    createComponent(args, options)
  }
  // console.log(
  //   chalk.red(
  //     'Invalid command. \nuse "rc -c test" to create new component with name test.js\nuse "rc -f myForm" to create new form'
  //   )
  // );

 }

 cli(process.argv)