const BioinformaticsApp = require("../index");

/**
 * Test the following workflow: 
 * 1. define fastaSequence string as undefined, empty,, blank, undefined, or null 
 * 2. create a BioinformaticsApp;
 * 3. invoke setFastaSequences(fastaSequenceString) method, we should see that error is throw in the console.
 */

// integration test start here
let fastaSequenceString = undefined;
const app = new BioinformaticsApp("dna");
app.setFastaSequences(fastaSequenceString);



