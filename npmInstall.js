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
      "node": true,
      "es6": true,
    }
  };

  switch(testingPackage) {
    case 'Mocha with Chai':
      testingNpm = "mocha chai";
      testScript = "mocha ./spec";
      eslintConfig["env"]["mocha"] = true;
      break;
    case 'Jest':
      testingNpm = "jest eslint-plugin-jest";
      testScript = "jest";
      eslintConfig["env"]["jest/globals"] = true;
      eslintConfig["plugins"] = ["jest"];
      eslintConfig["extends"] = ["plugin:jest/recommended"];
      break;
    default:
      break;
  }

  try {
    const installCommand = `cd ${path} && npm init -y && npm install eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise husky ${testingNpm} --save-dev`;
    await execSync(installCommand, { stdio: 'ignore' });
  } catch(err) {
    console.log(err);
  }

  console.log(colors.green(`Packages installed successfully.`));

  const packageToUpdate = readFileSync(`${path}/package.json`);
  const packageContent = JSON.parse(packageToUpdate);
  packageContent.description = "A new project created with NodeItUp.";
  packageContent.scripts = {
    "start": "node index.js",
    "test": testScript,
    "lint": "eslint ./ --fix",
    "precommit": "npm run lint && npm test",
    "prepare": "husky install"
  };
  packageContent.eslintConfig = eslintConfig;

  console.log(colors.yellow(`\nUpdating package.json... `));

  await writeFile(
    `${path}/package.json`,
    JSON.stringify(packageContent, null, 2),
    { stdio: 'ignore' }
  );

  console.log(colors.green(`package.json updated.`));

  console.log(colors.yellow(`\nInitialising Git and Husky...`));

  try {
    const huskyCommand = `cd ${path} && git init && npm run prepare && npx husky add .husky/pre-commit "npm test && npm run lint"`;
    await execSync(huskyCommand, { stdio: 'ignore' });
  } catch (err) {
    console.log(err);
  }

  console.log(colors.green(`Git and Husky initialised.`));
  return;
}

module.exports = npmInstall;
