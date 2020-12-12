const NucleotideSequenceAssistant = require("./../../../src/fasta/sequenceAssistant/NucleotideSequenceAssistant");
const FastaSeq = require("./../../../src/fasta/FastaSeq");

/**
 * Test constructor method.
 */
test("test constructor method", ()=>{  
  expect(()=>{
    new NucleotideSequenceAssistant();
  }).toThrow("FASTA sequence is not setup properly.");

  const fastaSequenceObject = new FastaSeq("DNA", "AAAAATTTTT");
  let assistant = new NucleotideSequenceAssistant(fastaSequenceObject);
  expect(assistant.fastaSequenceObject).toEqual(fastaSequenceObject);
  expect(assistant.fastaSequenceObject.size()).toBe(1);
  expect(assistant.fastaSequenceObject.getSequenceById("Unnamed sequence 1")).toBe("AAAAATTTTT");
});

/**
 * Test containsInvalidCharacters() method
 */
test("Test containsInvalidCharacters() method", ()=>{
  const fastaSeqString = ">seq1 \n AAAATTTTaCgGtc \n >seq2 \n XASSSDSFA";
  const fastaSequenceObject = new FastaSeq("DNA", fastaSeqString);
  assistant = new NucleotideSequenceAssistant(fastaSequenceObject);
  const expected = {
    "seq1" : false, 
    "seq2": true
  };
  expect(assistant.containsInvalidCharacters()).toEqual(expected);
});

/**
 * Test getReverseSequences() method
 */
test("Test getReverseSequences() method", ()=>{
  const fastaSeqString = ">seq1 \n ATTCG*- \n >seq2 \n XATTCG*-";
  const fastaSequenceObject = new FastaSeq("DNA", fastaSeqString);
  const assistant = new NucleotideSequenceAssistant(fastaSequenceObject);
  const expected = {
    "seq1" : "-*GCTTA", 
    "seq2": "-*GCTTAX"
  };
  expect(assistant.getReverseSequences()).toEqual(expected);
});

/**
 * Test getComplementarySequences() method
 */
test("Test getComplementarySequences() method", ()=>{
  const fastaSeqString = ">seq1 \n ATTCG*- \n >seq2 \n TTTCAG";
  const fastaSequenceObject = new FastaSeq("DNA", fastaSeqString);
  let assistant = new NucleotideSequenceAssistant(fastaSequenceObject);
  const expected = {
    "seq1" : "TAAGC*-", 
    "seq2": "AAAGTC"
  };
  expect(assistant.getComplementarySequences()).toEqual(expected);

  const fastaSeqString2 = ">seq1 \n ATTCG*- \n >seq2 \n XTTTCAG";
  const fastaSequenceObject2 = new FastaSeq("DNA", fastaSeqString2);
  assistant = new NucleotideSequenceAssistant(fastaSequenceObject2);

  expect(()=>{
    assistant.getComplementarySequences();
  }).toThrow("the sequence: [seq2] contains invalid letters.");
});

/**
 * Test getReverseComplementarySequences() method
 */
test("Test getReverseComplementarySequences() method", ()=>{
  const fastaSeqString = ">seq1 \n ATTCG*- \n >seq2 \n TTTCAG";
  const fastaSequenceObject = new FastaSeq("DNA", fastaSeqString);
  let assistant = new NucleotideSequenceAssistant(fastaSequenceObject);
  const expected = {
    "seq1" : "-*CGAAT",
    "seq2": "CTGAAA"
  };
  expect(assistant.getReverseComplementarySequences()).toEqual(expected);

  const fastaSeqString2 = ">seq1 \n ATTCG*- \n >seq2 \n XTTTCAG";
  const fastaSequenceObject2 = new FastaSeq("DNA", fastaSeqString2);
  assistant = new NucleotideSequenceAssistant(fastaSequenceObject2);

  expect(()=>{
    assistant.getReverseComplementarySequences();
  }).toThrow("the sequence: [seq2] contains invalid letters.");
});