#!/usr/bin/env node

// TODO: create Github repo and push up, using gh cli

const { execSync } = require('child_process');
const colors = require('colors');
const inquirer = require('inquirer');
const setupFiles = require('./setupFiles');
const npmInstall = require('./npmInstall');
const gitSetup = require('./gitSetup');

const create = async () => {
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'path',
        message: 'Your project name (lowercase, no spaces or numbers):'
      },
      {
        type: 'list',
        name: 'testingPackage',
        message: 'Your preferred testing package:',
        choices: ['Mocha with Chai', 'Jest']
      },
      {
        type: 'input',
        name: 'data',
        message: 'Content of your index.js file (optional):'
      },
      {
        type: 'list',
        name: 'createGithubRepo',
        message: 'Initialise repo in Github? (requires gh)',
        choices: ['yes', 'no']
      },
      {
        type: 'list',
        name: 'openInVSCode',
        message: 'Open in VSCode on completion? (requires VSCode)',
        choices: ['yes', 'no']
      }
    ]).then(async (answers) => {
      const { path, testingPackage, data, createGithubRepo, openInVSCode } = answers;
      await setupFiles(path, testingPackage, data);
      await npmInstall(path, testingPackage);
      await gitSetup(createGithubRepo, path);
      openInVSCode === "yes" && console.log(colors.yellow("\nOpening in VSCode..."));
      openInVSCode === "yes" && await execSync(`cd ${path} && code .`, (error, stdout, stderr) => {
        if (error) {
          console.error(colors.red(`FAILED: open ${path} in VSCode`), stderr);
          throw error;
        }}
      );

      console.log(colors.cyan(`\nYour project ${path} is ready! Happy coding!\n`));
      return;
    });
};

create()
  .catch(e => {
    console.log(colors.red('\nnodeitup has been unable to create this project.'));
  });
