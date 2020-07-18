const DataType = require("./constants/DataType");
const FastaSeq = require("./fasta/FastaSeq");
const PredictionAssistant = require("./fasta/predictionAssistant/PredictionAssistant");

class BioinformaticsApp {
  
  /**
   * The constructor for {BioinformaticsApp}.
   * @param {string} dataType, the string represtive of the input data type.
   *  must be "DNA", "RNA", "protein", or "pdb".
   */
  constructor (dataType) {
    this.dataType = this.validateAndSetDataType(dataType);
    this.fastaSequenceObject = null;
  }

  /**
   * Validates input data type. If valid, return the data type string in {DataType} constant.
   * This is a helper function to validate and set dataType in the constructor in this class.
   * @param {string} dataType, the string represtive of the type of the input data.
   *  must be "DNA", "RNA", "protein", or "pdb".
   * @returns {string} data type string in {DataType} object.
   * @throws error if input dataType is not valid.
   */
  validateAndSetDataType(dataType) {
    switch (dataType.toUpperCase()){
    case "DNA":
      return DataType.DNA;
    case "RNA":
      return DataType.RNA;
    case "PROTEIN":
      return DataType.PROTEIN;
    case "PDB":
      return DataType.PDB;
    default:
      throw new Error("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', or 'PDB'.");
    }
  }

  /**
   * Sets the {FastaSeq} fastaSequenceObject attribute for {BioinformaticsApp}.
   * @param {string} fastaSequencesString 
   * @returns The {BioinformaticsApp} object.
   */
  setFastaSequences(fastaSequencesString) {
    // check if string is null, empty or blank
    if (fastaSequencesString === null || fastaSequencesString === undefined) {
      throw new Error ("The input FASTA sequence cannot be null or undefined.");
    }
    const trimedFastaSeq = fastaSequencesString.trim();
    if (trimedFastaSeq.length === 0) {
      throw new Error ("The input FASTA sequence cannot be emtyp or blank.");
    }
    const fastaSeq = new FastaSeq(this.dataType, fastaSequencesString);
    this.fastaSequenceObject = fastaSeq;
    return this;
  }

  /**
   * Gets the fastaSequenceObject in this class.
   */
  getFastaSequenceObject(){
    return this.fastaSequenceObject;
  }

  /**
   * Retrives a {PredictionAssistant} object with {FastaSeq} being set. 
   * @throws an error if {FastaSeq} in {BioinformaticsApp} object is null.
   */
  getPredictionAssistant(){
    if (!this.fastaSequenceObject) {
      throw new Error ("No FASTA sequence. call setFastaSequences(fastaString) first.");
    }
    return new PredictionAssistant(this.fastaSequenceObject);
  }
}

module.exports = BioinformaticsApp;