const BioinformaticsApp = require("../index");

/**
 * Test the following workflow: 
 * 1. read fastaFile; 
 * 2. create a BioinformaticsApp;
 * 3. set up FASTA sequence, and then {FastaSeq} object is returned with expected structure.
 */

// integration test start here
const fastaSequenceString = "  ";
const app = new BioinformaticsApp("dna");
const fastaSeqObj = app.setFastaSequences(fastaSequenceString);

// you can use console log to check if the object is setup correctly.
// console.log("Structure of BioinformaticsApp after create this object: ");
// console.log(app);
    
// console.log("Structure of FastaSeq: ");
// console.log(app.fastaSequenceObject);
    
// console.log("Structure of SeqMap");
// console.log(app.fastaSequenceObject.seqMap);
    
// check getAll sequence Id method
console.log(fastaSeqObj.getAllSequenceIds());


