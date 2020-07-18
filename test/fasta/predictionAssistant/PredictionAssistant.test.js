const PredictionAssistant = require("./../../../src/fasta/predictionAssistant/PredictionAssistant");
const FastaSeq = require("./../../../src/fasta/FastaSeq");

/**
 * Test constructor method.
 */
test("test constructor method", ()=>{
  let assistant = new PredictionAssistant();
  expect(assistant.fastaSequenceObject).toBe(undefined); 

  const fastaSequenceObject = new FastaSeq("DNA", "AAAAATTTTT");
  assistant = new PredictionAssistant(fastaSequenceObject);
  expect(assistant.fastaSequenceObject).toEqual(fastaSequenceObject);
  expect(assistant.fastaSequenceObject.size()).toBe(1);
  expect(assistant.fastaSequenceObject.getSequenceById("Unnamed sequence 1")).toBe("AAAAATTTTT");
});