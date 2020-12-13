const DataType = require("./constants/DataType");
const FastaSeq = require("./fasta/FastaSeq");
const PredictionAssistant = require("./fasta/predictionAssistant/PredictionAssistant");
const NucleotideSequenceAssistant = require("./fasta/sequenceAssistant/NucleotideSequenceAssistant");
const ProteinSequenceAssistant = require("./fasta/sequenceAssistant/ProteinSequenceAssistant");

class BioinformaticsApp {
  
  /**
   * The constructor for {BioinformaticsApp}.
   * @param {string} dataType, the string repressing the input data type.
   *  must be "DNA", "RNA", "protein", or "pdb".
   */
  constructor (dataType) {
    this.dataType = this.validateAndSetDataType(dataType);
    this.fastaSequenceObject = null;
  }

  /**
   * A public method to setup dataType attributes in BioinformaticsApp object. The input dataType
   * will be validated first. If the input dataType is valid, then this method will set the dataType
   * attribute in BioinformaticsApp object.
   * @param {string} dataType, the string repressing the type of the input data.
   *  must be "DNA", "RNA", "protein", "nucleotides", "PDB", "all", or "unknown".
   * @returns {BioinformaticsApp} object with the dataType being set.
   * @throws error if input dataType is not valid.
   */
  setDataType (dataType) {
    this.dataType = this.validateAndSetDataType(dataType);
    return this;
  }

  /**
   * a private method to validate and set input data type. If input data type is valid, then 
   * return the data type string in {DataType} constant.
   * This is a helper function to validate and set dataType in the constructor in this class.
   * @param {string} dataType, the string repressing the type of the input data.
   *  must be "DNA", "RNA", "protein", "nucleotides", "PDB", "all", or "unknown".
   * @returns {string} data type string in {DataType} object.
   * @throws error if input dataType is not valid.
   */
  validateAndSetDataType(dataType) {
    if (dataType === null || dataType === undefined) {
      return null;
    } 
    switch (dataType.toUpperCase()){
    case "DNA":
      return DataType.DNA;
    case "RNA":
      return DataType.RNA;
    case "PROTEIN":
      return DataType.PROTEIN;
    case "PDB":
      return DataType.PDB;
    case "NUCLEOTIDES":
      return DataType.NUCLEOTIDES;
    case "ALL":
      return DataType.ALL;
    case "UNKNOWN":
      return DataType.UNKNOWN;
    default:
      throw new Error("Invalid dataType. dataType must be 'DNA', 'RNA', 'protein', 'nucleotides','PDB', 'all', or 'unknown'.");
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
    const trimmedFastaSeq = fastaSequencesString.trim();
    if (trimmedFastaSeq.length === 0) {
      throw new Error ("The input FASTA sequence cannot be empty or blank.");
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
   * Retrieves a {PredictionAssistant} object with {FastaSeq} being set.
   * @returns a {PredictionAssistant} object with {FastaSeq} being set.
   * @throws an error if {FastaSeq} in {BioinformaticsApp} object is null.
   */
  getPredictionAssistant(){
    if (!this.fastaSequenceObject) {
      throw new Error ("No FASTA sequence. call setFastaSequences(fastaString) first.");
    }
    return new PredictionAssistant(this.fastaSequenceObject);
  }

  /**
   * Retrieves a {NucleotideSequenceAssistant} object with {FastaSeq} being set.
   * @returns a {NucleotideSequenceAssistant} object with {FastaSeq} being set. 
   * @throws an error if {FastaSeq} in {BioinformaticsApp} object is null.
   */
  getNucleotideSequenceAssistant(){
    if (!this.fastaSequenceObject) {
      throw new Error ("No FASTA sequence. call setFastaSequences(fastaString) first.");
    }
    return new NucleotideSequenceAssistant(this.fastaSequenceObject);
  }

  /**
   * Retrieves a {ProteinSequenceAssistant} object with {FastaSeq} being set.
   * @returns a {ProteinSequenceAssistant} object with {FastaSeq} being set.
   * @throws an error if {FastaSeq} in {BioinformaticsApp} object is null.
   */
  getProteinSequenceAssistant(){
    if (!this.fastaSequenceObject) {
      throw new Error ("No FASTA sequence. call setFastaSequences(fastaString) first.");
    }
    return new ProteinSequenceAssistant(this.fastaSequenceObject);
  }

  /**
   * Gets all sequence Ids from the input FASTA string (file).
   * @returns {Array} an array of sequence Ids.
   */
  getAllSequenceIds() {
    return this.fastaSequenceObject.getAllSequenceIds();
  }

  /**
   * Gets a specific FASTA sequence by its sequence Id.
   * @param {String} sequenceId, the sequence Id to query.
   * @returns {String} Fasta sequence (could be a empty string if fasta sequence only have title).
   * @throws An Error if the sequenceId is not valid.
   */
  getSequenceById(sequenceId) {
    return this.fastaSequenceObject.getSequenceById(sequenceId);
  }

  /**
   * Gets an object contains all sequences and their their sequences Ids. 
   * For example: {"seqId1": "ATCGATC", "sequenceId3": "CCAAT", "unnamedSeqId": "AAAAG"}
   * @returns {Object} contains all sequences indexed by its Id.
   */
  getAllSequencesWithIds(){
    return this.fastaSequenceObject.getAllSequencesWithIds();
  }
}

module.exports = BioinformaticsApp;