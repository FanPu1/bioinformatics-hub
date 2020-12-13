const BioinformaticsApp = require("./../index");
const DataType = require("./../src/constants/DataType");
const FastaSeq = require("./../src/fasta/FastaSeq");
const PredictionAssistant = require("./../src/fasta/predictionAssistant/PredictionAssistant");
const ProteinSequenceAssistant = require("./../src/fasta/sequenceAssistant/ProteinSequenceAssistant");
const NucleotideSequenceAssistant = require("./../src/fasta/sequenceAssistant/NucleotideSequenceAssistant");

test ("test constructor", () => {
  let app = new BioinformaticsApp("DNA");
  expect(app.dataType).toBe(DataType.DNA);
  app = new BioinformaticsApp("RNA");
  expect(app.dataType).toBe(DataType.RNA);
  app = new BioinformaticsApp("Protein");
  expect(app.dataType).toBe(DataType.PROTEIN);
  app = new BioinformaticsApp("PDB");
  expect(app.dataType).toBe(DataType.PDB);
  app = new BioinformaticsApp();
  expect(app.dataType).toBe(null);
  app = new BioinformaticsApp("nucleotides");
  expect(app.dataType).toBe("nucleotides");
  app = new BioinformaticsApp("unknown");
  expect(app.dataType).toBe(DataType.UNKNOWN);
  app = new BioinformaticsApp("All");
  expect(app.dataType).toBe("all");
});

test("test setDataType", ()=>{
  const app = new BioinformaticsApp();
  expect(app.dataType).toBe(null);
  app.setDataType("dna");
  expect(app.dataType).toBe(DataType.DNA);
  app.setDataType("unknown");
  expect(app.dataType).toBe(DataType.UNKNOWN);
});

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

test ("test constructor with lowercase string input", () => {
  expect(()=>{
    new BioinformaticsApp("unknown string");
  }).toThrow("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', 'nucleotides','PDB', 'all', or 'unknown'.");
});

test ("test validateAndSetDataType method", () => {
  const app = new BioinformaticsApp("DNA");
  expect(app.validateAndSetDataType("DNA")).toBe(DataType.DNA);
  expect(app.validateAndSetDataType("rna")).toBe(DataType.RNA);
  expect(app.validateAndSetDataType("protein")).toBe(DataType.PROTEIN);
  expect(app.validateAndSetDataType("pdb")).toBe(DataType.PDB);
  expect(()=> {
    app.validateAndSetDataType("invalid String");
  }).toThrow("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', 'nucleotides','PDB', 'all', or 'unknown'.");
});

test ("test validateAndSetDataType method with invalid input", () => {
  const app = new BioinformaticsApp("DNA");
  expect(()=> {
    app.validateAndSetDataType("invalid String");
  }).toThrow("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', 'nucleotides','PDB', 'all', or 'unknown'.");
});

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

test ("test input string for setFastaSequences method is a blank string", ()=>{
  const app = new BioinformaticsApp("protein");
  const fastaSequencesString1 = ""; 
  const fastaSequencesString2 = "    ";
  const fastaSequencesString3 = " \n\r \t";
  expect (()=>{
    app.setFastaSequences(fastaSequencesString1);
  }).toThrow("The input FASTA sequence cannot be empty or blank.");
  expect (()=>{
    app.setFastaSequences(fastaSequencesString2);
  }).toThrow("The input FASTA sequence cannot be empty or blank.");
  expect (()=>{
    app.setFastaSequences(fastaSequencesString3);
  }).toThrow("The input FASTA sequence cannot be empty or blank.");
});

test("test getPredictionAssistant method", ()=>{
  const app = new BioinformaticsApp("protein");
  const expectedFastaSequenceObject = new FastaSeq(DataType.PROTEIN, "DKDGNGY");
  const expectedPredictionAssistant = new PredictionAssistant(expectedFastaSequenceObject);
  expect(()=>{
    app.getPredictionAssistant();
  }).toThrow("No FASTA sequence. call setFastaSequences(fastaString) first.");
  expect(app.setFastaSequences("DKDGNGY").getPredictionAssistant()).toEqual(expectedPredictionAssistant);
});

test("test getProteinSequenceAssistant method", ()=>{
  const app = new BioinformaticsApp("protein");
  const expectedFastaSequenceObject = new FastaSeq(DataType.PROTEIN, "DKDGNGY");
  const expectedAssistant = new ProteinSequenceAssistant(expectedFastaSequenceObject);
  expect(()=>{
    app.getProteinSequenceAssistant();
  }).toThrow("No FASTA sequence. call setFastaSequences(fastaString) first.");
  expect(app.setFastaSequences("DKDGNGY").getProteinSequenceAssistant()).toEqual(expectedAssistant);
});

test("test getNucleotideSequenceAssistant method", ()=>{
  const app = new BioinformaticsApp();
  const expectedFastaSequenceObject = new FastaSeq(null, "AAATTT");
  const expectedAssistant = new NucleotideSequenceAssistant(expectedFastaSequenceObject);
  expect(()=>{
    app.getNucleotideSequenceAssistant();
  }).toThrow("No FASTA sequence. call setFastaSequences(fastaString) first.");
  expect(app.setFastaSequences("AAATTT").getNucleotideSequenceAssistant()).toEqual(expectedAssistant);
});