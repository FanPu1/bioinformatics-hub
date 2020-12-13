const ProteinSequenceAssistant = require("../../../src/fasta/sequenceAssistant/ProteinSequenceAssistant");
const FastaSeq = require("../../../src/fasta/FastaSeq");

test("test constructor method", ()=>{  
  expect(()=>{
    new ProteinSequenceAssistant();
  }).toThrow("FASTA sequence object is not setup properly.");

  const fastaSequenceObject = new FastaSeq("Protein", "DKDGNGY");
  const assistant = new ProteinSequenceAssistant(fastaSequenceObject);
  expect(assistant.fastaSequenceObject).toEqual(fastaSequenceObject);
  expect(assistant.fastaSequenceObject.size()).toBe(1);
  expect(assistant.fastaSequenceObject.getSequenceById("Unnamed sequence 1")).toBe("DKDGNGY");
});

test("Test containsInvalidCharacters() method", ()=>{
  const fastaSeqString = ">seq1 \n BBBCGGCG \n >seq2 \n XASSSDSFA";
  const fastaSequenceObject = new FastaSeq("DNA", fastaSeqString);
  assistant = new ProteinSequenceAssistant(fastaSequenceObject);
  const expected = {
    "seq1" : true, 
    "seq2": false
  };
  expect(assistant.containsInvalidCharacters()).toEqual(expected);
});