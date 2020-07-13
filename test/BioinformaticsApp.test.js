const BioinformaticsApp = require("./../index");
const DataType = require("../src/constants/DataType");

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
 * Test constructor method throw error when input string is invalid.
 */
test ("test constructor with lowercase string input", () => {
  expect(()=>{
    new BioinformaticsApp("unknown string");
  }).toThrow("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', or 'PDB'.");
});

/**
 * Test validateAndSetDataType method return expected {string} of datatype.
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
 * Test validateAndSetDataType method throw error when input String is invalid.
 */
test ("test validateAndSetDataType method with invalid input", () => {
  const app = new BioinformaticsApp("DNA");
  expect(()=> {
    app.validateAndSetDataType("invalid String");
  }).toThrow("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', or 'PDB'.");
});

/**
 * Test that setFastaSequences returns expected {FastaSeq} object
 */
test("test setFastaSequences returns expected object", () => {
  const app = new BioinformaticsApp("protein");
  const fastaSequencesString = ">fake sequence1 \nDKDGNGY\nDKDGNGY >sequence2\nGGGGNGY"; 
  const fastaSeq = app.setFastaSequences(fastaSequencesString);
  expect(fastaSeq.dataType).toBe(DataType.PROTEIN);
  expect(fastaSeq.fastaSequencesString).toBe(fastaSequencesString );
});