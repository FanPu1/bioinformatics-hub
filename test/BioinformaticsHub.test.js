const BioinformaticsHub = require("./../index");

/**
 * Test that getVersion() method returns the expected version.
 */
test ("test getVersion method to return expected version", () => {
  // setup test
  const bioinformaticsHub = new BioinformaticsHub;
  const version = bioinformaticsHub.getVersion();
  // test expected version
  expect(version).toBe("0.0.1");
});

