const { readFileSync } = require('fs');
const { writeFile } = require('fs/promises');
const { execSync } = require('child_process');
const colors = require('colors');

const npmInstall = async (path, testingPackage) => {
  console.log(colors.yellow(`\nInstalling packages... `));

  let testingNpm;
  let testScript;
  let eslintConfig = {
    "extends": "standard",
    "env": {
      "browser": true,
      "node": true
    }
  };

  switch(testingPackage) {
    case 'Mocha with Chai':
      testingNpm = " mocha chai";
      testScript = "mocha ./spec";
      eslintConfig["env"]["mocha"] = true;
      break;
    case 'Jest':
      testingNpm = " jest eslint-plugin-jest";
      testScript = "jest";
      eslintConfig["env"]["jest/globals"] = true;
      eslintConfig["plugins"] = ["jest"];
      eslintConfig["extends"] = ["plugin:jest/recommended"];
      break;
    default:
      break;
  }

  await execSync(
    `cd ${path} && npm init -y && npm install eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise husky${testingNpm}`
  );

  console.log(colors.green(`Packages installed successfully.`));

  const packageToUpdate = readFileSync(`${path}/package.json`);
  const packageContent = JSON.parse(packageToUpdate);
  packageContent.description = "A new project created with NodeItUp.";
  packageContent.scripts = {
    "start": "node index.js",
    "test": testScript,
    "lint": "eslint ./",
    "precommit": "npm run lint && npm test"
  };
  packageContent.eslintConfig = eslintConfig;

  console.log(colors.yellow(`\nUpdating package.json... `));

  await writeFile(
    `${path}/package.json`,
    JSON.stringify(packageContent, null, 2),
    {stdio: 'ignore'}
  );

  console.log(colors.green(`package.json updated.`));
  return;
}

module.exports = npmInstall;
