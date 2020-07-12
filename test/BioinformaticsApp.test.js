const BioinformaticsApp = require("./../index");

/**
 * Test that getVersion() method returns the expected version.
 */
test ("test getVersion method to return expected version", () => {
  // setup test
  const app = new BioinformaticsApp();
  const version = app.getVersion();
  // test expected version
  expect(version).toBe("0.0.1");
});

