class FastaSeq {
  /**
   * Constructor for FastaSeq class. 
   * @param {DataType} dataType, the type of the input data (can be DNA, RNA, Protein or PDB).
   * @param {string} fastaSequecnesString, fasta sequences string.
   */
  constructor(datatype, fastaSequecnesString) {
    this.dataType = datatype;
    this.fastaSequencesString = fastaSequecnesString;
    this.seqMap = this.covertSeqToMap();
    this.seqAssistant = null;
    this.PredictionAssistant = null;
  }

  /**
   * Converts the {String} fasta sequence into a {Map}.
   * @return {Map} a map represtive of fasta sequences.
   */
  covertSeqToMap() {
    // Step 1: store each indivalue fasta sequence in to a fasta sequence unit array (fastaUnitArray). 
    const seqMap = new Map();
    // split String by ">", and keep >
    const fastaUnitArray = this.fastaSequencesString.trim().split(/(?=>)/g);
    // prepare index for unnamed sequences
    let unnamedSeqIndex = 1;

    // Step 2: loop through each fasta sequence unit and split key (sequence Id) and value (DNA or protein sequence)
    for (const index in fastaUnitArray) {
      // split each line and store each line in to an array
      const lineArray = fastaUnitArray[index].split(/\r?\n/);
      
      let sequenceId;
      let sequence = "";
      // First line must start with ">" followed by sequence Id. Otherwize this fasta sequence unit 
      // do not have an id, and we want to give a id called "Unnamed sequence " + unnamedSeqIndex;
      if (lineArray[0].trim().charAt(0) === ">" && lineArray[0].trim().length > 1) { // key is available
        sequenceId = lineArray[0].trim().substring(1);     
      } else { // key is not available
        sequenceId = "Unnamed sequence " + unnamedSeqIndex;
        unnamedSeqIndex++;
        if(lineArray[0].trim().charAt(0) !== ">") {
          sequence = sequence + lineArray[0].replace(/\s/g, ""); // the sequence start from the first line, so append it
        }
      }
      
      // now create the sequence from fasta unit
      for (let i = 1; i<lineArray.length; i++){
        sequence = sequence + lineArray[i].replace(/\s/g, "");
      }

      // Step 3: store sequenceId and sequence into a {sequenceId} object.
      const seqMapElement = {
        sequenceId: sequenceId,
        sequence: sequence,
        outputMap: new Map(),
      };
      seqMap.set(sequenceId, seqMapElement);
    }
    // once for loop finish, return seqMap
    return seqMap;
  }

  /**
   * Gets all sequence Ids from the input FASTA string (file).
   * @returns {Array} an array of sequence Ids.
   */
  getAllSequenceIds() {
    const sequenceIds = [];
    for (const key of this.seqMap.keys()) sequenceIds.push(key);
    return sequenceIds;
  }

  /**
   * Returns {Integer} the number of individual sequences saved into the FastaSeq object.
   */
  size() {
    return this.getAllSequenceIds().length;
  }
}

module.exports = FastaSeq;