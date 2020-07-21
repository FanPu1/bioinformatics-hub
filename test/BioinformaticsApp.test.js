const BioinformaticsApp = require("./../index");
const DataType = require("./../src/constants/DataType");
const FastaSeq = require("./../src/fasta/FastaSeq");
const PredictionAssistant = require("./../src/fasta/predictionAssistant/PredictionAssistant");

/**
 * Test constructor method can set dataType attributes properly
 */
test ("test constructor", () => {
  let app = new BioinformaticsApp("DNA");
  expect(app.dataType).toBe(DataType.DNA);
  app = new BioinformaticsApp("RNA");
  expect(app.dataType).toBe(DataType.RNA);
  app = new BioinformaticsApp("Protein");
  expect(app.dataType).toBe(DataType.PROTEIN);
  app = new BioinformaticsApp("PDB");
  expect(app.dataType).toBe(DataType.PDB);
});

/**
 * Test constructor method can set dataType attributes properly, when input is a lowercase string
 */
test ("test constructor with lowercase string input", () => {
  let app = new BioinformaticsApp("dna");
  expect(app.dataType).toBe(DataType.DNA);
  app = new BioinformaticsApp("Rna");
  expect(app.dataType).toBe(DataType.RNA);
  app = new BioinformaticsApp("protein");
  expect(app.dataType).toBe(DataType.PROTEIN);
  app = new BioinformaticsApp("pdb");
  expect(app.dataType).toBe(DataType.PDB);
});

/**
 * Test constructor method throw error when input data type string is invalid.
 */
test ("test constructor with lowercase string input", () => {
  expect(()=>{
    new BioinformaticsApp("unknown string");
  }).toThrow("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', or 'PDB'.");
});

/**
 * Test validateAndSetDataType method return expected {string} of data type.
 */
test ("test validateAndSetDataType method", () => {
  const app = new BioinformaticsApp("DNA");
  expect(app.validateAndSetDataType("DNA")).toBe(DataType.DNA);
  expect(app.validateAndSetDataType("rna")).toBe(DataType.RNA);
  expect(app.validateAndSetDataType("protein")).toBe(DataType.PROTEIN);
  expect(app.validateAndSetDataType("pdb")).toBe(DataType.PDB);
  expect(()=> {
    app.validateAndSetDataType("invalid String");
  }).toThrow("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', or 'PDB'.");
});

/**
 * Test validateAndSetDataType method throw error when input data type String is invalid.
 */
test ("test validateAndSetDataType method with invalid input", () => {
  const app = new BioinformaticsApp("DNA");
  expect(()=> {
    app.validateAndSetDataType("invalid String");
  }).toThrow("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', or 'PDB'.");
});

/**
 * Test that setFastaSequences returns expected object.
 */
test("test setFastaSequences returns expected object", () => {
  const app = new BioinformaticsApp("protein");
  const fastaSequencesString = ">fake sequence1 \nDKDGNGY\nDKDGNGY >sequence2\nGGGGNGY"; 
  app.setFastaSequences(fastaSequencesString);
  expect(app.dataType).toBe(DataType.PROTEIN);
  expect(app.getFastaSequenceObject().fastaSequencesString).toBe(fastaSequencesString);
  expect(app.getAllSequenceIds()).toEqual(["fake sequence1","sequence2"]);
  expect(app.getSequenceById("fake sequence1")).toEqual("DKDGNGYDKDGNGY");
  expect(app.getAllSequencesWithIds()["fake sequence1"]).toEqual("DKDGNGYDKDGNGY");
  expect(app.getAllSequencesWithIds()["sequence2"]).toEqual("GGGGNGY");
});

/**
 * test that an error is throw when the input string in setFastaSequences() method is a 
 * null or undefined.
 */
test ("test input string for setFastaSequences method is a null or undefined", ()=>{
  const app = new BioinformaticsApp("dna");
  const fastaSequencesString1 = null; 
  const fastaSequencesString2 = undefined;
  let fastaSequencesString3;
  expect (() => {
    app.setFastaSequences(fastaSequencesString1);
  }).toThrow("The input FASTA sequence cannot be null or undefined.");
  expect (()=>{
    app.setFastaSequences(fastaSequencesString2);
  }).toThrow("The input FASTA sequence cannot be null or undefined.");
  expect (()=>{
    app.setFastaSequences(fastaSequencesString3);
  }).toThrow("The input FASTA sequence cannot be null or undefined.");
});

/**
 * test that an error is throw when the input string in setFastaSequences() method is a 
 * blank or empty string.
 */
test ("test input string for setFastaSequences method is a blank string", ()=>{
  const app = new BioinformaticsApp("protein");
  const fastaSequencesString1 = ""; 
  const fastaSequencesString2 = "    ";
  const fastaSequencesString3 = " \n\r \t";
  expect (()=>{
    app.setFastaSequences(fastaSequencesString1);
  }).toThrow("The input FASTA sequence cannot be emtyp or blank.");
  expect (()=>{
    app.setFastaSequences(fastaSequencesString2);
  }).toThrow("The input FASTA sequence cannot be emtyp or blank.");
  expect (()=>{
    app.setFastaSequences(fastaSequencesString3);
  }).toThrow("The input FASTA sequence cannot be emtyp or blank.");
});

/**
 * Test different conditions in getPreditionAssistant method.
 */
test("test getPredictionAssistant method", ()=>{
  const app = new BioinformaticsApp("protein");
  const expectedFastaSequenceObject = new FastaSeq(DataType.PROTEIN, "DKDGNGY");
  const expectedPredictionAssistant = new PredictionAssistant(expectedFastaSequenceObject);
  expect(()=>{
    app.getPredictionAssistant();
  }).toThrow("No FASTA sequence. call setFastaSequences(fastaString) first.");
  expect(app.setFastaSequences("DKDGNGY").getPredictionAssistant()).toEqual(expectedPredictionAssistant);
});