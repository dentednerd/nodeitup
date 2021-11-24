const { mkdir, writeFile } = require('fs/promises');
const colors = require('colors');
const specFile = require('./spec.js');
const indexTestFile = require('./index.test.js');
const gitIgnore = require('./gitignore.js');
const backupData = require('./data.js');
const readme = require('./readme.js');

const setupFiles = async (path, testingPackage, data) => {
  if (!path) path = "new-project";
  if (!data) data = backupData;
  let testingPath;
  let testingFilename;
  let testingTemplate;

  switch(testingPackage) {
    case 'Mocha with Chai':
      testingPath = "spec";
      testingFilename = "index.spec.js";
      testingTemplate = specFile;
      break;
    case 'Jest':
      testingPath = "__tests__";
      testingFilename = "index.test.js";
      testingTemplate = indexTestFile;
      break;
    default:
      break;
  }

  console.log(colors.yellow(`\nCreating /${path}... `));
  await mkdir(path, (e) => e && console.log(colors.red(`FAILED: create /${path}`, e)));
  await writeFile(`${path}/index.js`, data, (e) => e && console.log(colors.red(`FAILED: create ${path}/index.js`, e)));
  await writeFile(`${path}/.gitignore`, gitIgnore, (e) => e && console.log(colors.red(`FAILED: create /${path}/.gitignore`, e)));
  await writeFile(`${path}/README.md`, readme(path, testingPackage), (e) => e && console.log(colors.red(`FAILED: create ${path}/README.md`, e)));
  await mkdir(`${path}/${testingPath}`, (e) => e && console.log(colors.red(`FAILED: create /${path}/${testingPath}`, e)));
  await writeFile(`${path}/${testingPath}/${testingFilename}`, testingTemplate, (e) => e && console.log(colors.red(`FAILED:  create ${testingFilename}`, e)));
  console.log(colors.green(`File setup successful.`));
  return;
}

module.exports = setupFiles;
