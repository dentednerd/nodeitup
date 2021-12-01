const readme = (path, testingPackage) => {
  let npmTestText;

  switch(testingPackage) {
    case 'Mocha with Chai':
      npmTestText = `Runs \`spec/index.spec.js\` in Mocha, using Chai assertions, to test \`index.js\`.`
      break;
    case 'Jest':
      npmTestText = `Runs \`__tests__/index.test.js\` in Jest, to test \`index.js\`.`
      break;
    default:
      break;
  }

  return `# ${path}

A new project created with NodeItUp.

## Usage

\`npm run start\`: Runs \`index.js\` in Node.

\`npm test\`: ${npmTestText}

\`npm run lint\`: Runs ESLint with Standard config across the entire project. You can find the ESLint config in \`package.json\`.
`;
};

module.exports = readme;
