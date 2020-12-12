const NucleotideSequenceAssistant = require("./../../../src/fasta/sequenceAssistant/NucleotideSequenceAssistant");
const FastaSeq = require("./../../../src/fasta/FastaSeq");

/**
 * Test constructor method.
 */
test("test constructor method", ()=>{
  let assistant = new NucleotideSequenceAssistant();
  expect(assistant.fastaSequenceObject).toBe(undefined); 

  const fastaSequenceObject = new FastaSeq("DNA", "AAAAATTTTT");
  assistant = new NucleotideSequenceAssistant(fastaSequenceObject);
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

  expect(()=>{
    const invalidFastaSequenceObject = "not an object";
    assistant = new NucleotideSequenceAssistant(invalidFastaSequenceObject);
    assistant.containsInvalidCharacters();
  }).toThrow("FASTA sequence is not setup properly.");
});