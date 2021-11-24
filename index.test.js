module.exports = `/* eslint-disable no-unused-expressions */
const myFunction = require('../index');

describe('myFunction', function () {
  it('is a function', function () {
    expect(typeof myFunction).toBe('function');
  });
  it('returns true', function () {
    expect(myFunction()).toBe(true);
  });
});
`;
