const sequenceValidator = require("./../../util/SequenceValidator");

/**
 * A class contains all methods related with nucleotide sequence analysis.
 */
class NucleotideSequenceAssistant {
  
  /**
   * The constructor of {NucleotideSequenceAssistant} class.
   * @param {FastaSeq} a fastaSequenceObject.
   */
  constructor(fastaSequenceObject) {
    this.fastaSequenceObject = fastaSequenceObject;
    this.patternsWithIds = null;
  }

  /**
   * Check if the input nucleotide sequences contains invalid characters. 
   * Valid characters are: A, T, C, G, U, *, _
   */
  containsInvalidChacters() {
    if (!this.fastaSequenceObject) {
      throw new Error("FASTA sequence is not setup properly.");
    }

    const result = {};
    const sequenceMap = this.fastaSequenceObject.seqMap; 
    sequenceMap.forEach((value, key)=>{
      result[key] = !sequenceValidator.isNucleotideSequenceValid(value.sequence);
    });

    return result;
  }
}

module.exports = NucleotideSequenceAssistant;