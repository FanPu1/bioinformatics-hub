const fs = require("fs");
const BioinformaticsApp = require("./../index");

/**
 * Test the following workflow: 
 * 1. read fastaFile; 
 * 2. create a BioinformaticsApp;
 * 3. set up FASTA sequence, and then {FastaSeq} object is returned with expected structure.
 */
fs.readFile("./seeds/fastaDNASequence1.txt", (err, data) => { // read fasta sequence
  if (err) {
    console.log("Cannot read seeds fasta file");
  } else {
    // integration test start here
    const fastaSequenceString = data.toString(); 
    const app = new BioinformaticsApp("dna");
    const fastaSeqObj = app.setFastaSequences(fastaSequenceString).getFastaSequenceObject();
    let log;

    // you can use console log to check if the object is setup correctly.
    // console.log("Structure of BioinformaticsApp after create this object: ");
    // log = app;
    
    // console.log("Structure of FastaSeq: ");
    // log = app.fastaSequenceObject;
    
    // console.log("Structure of SeqMap");
    // log = app.fastaSequenceObject.seqMap;
    
    // check getAll sequence Id method
    // log = fastaSeqObj.getAllSequenceIds();

    // check size() method
    // log = fastaSeqObj.size();

    // check getSequenceById() method
    log = fastaSeqObj.getSequenceById("Unnamed sequence 1");
    //log = fastaSeqObj.getSequenceById("Unnamed sequence 2");
    //log = fastaSeqObj.getSequenceById("Sample sequence 2");

    // check getSequencesWithIds() method
    // log = fastaSeqObj.getAllSequencesWithIds();
    console.log(log);
  }
});

