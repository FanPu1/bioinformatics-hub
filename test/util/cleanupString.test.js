const cleanup = require("./../../src/util/cleanupString");

/**
 * Test that cleanup() method returns expected string.
 */
test("test cleanup() method returns expected string", () => {
  const inputString = "asdfasdfa adsfasdf adsf 12 asdf -- * adsfas";
  const expectedString = "asdfasdfaadsfasdfadsfasdf--*adsfas";
  expect(cleanup(inputString)).toBe(expectedString);
});

/**
 * Test that an exception is thrown by clean up method when the sequence contains illegal characters
 */
test("test string contains illegal characters", ()=> {
  inputString = "SDFASFDn;sdfadsf";
  expect(()=>{
    cleanup(inputString);
  }).toThrow("Sequence contains invalid characters. Sequence: " + inputString);
});

/**
 * Test that an exception is thrown by cleanup() method when the sequence only contains blanks
 */
test("test string contains illegal characters", ()=> {
  inputString = "    \n    \r     ";
  expect(()=>{
    cleanup(inputString);
  }).toThrow("At least one of the sequences is empty.");
});