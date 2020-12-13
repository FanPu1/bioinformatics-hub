const sequenceValidator = require("./../../util/SequenceValidator");
const FastaSeq = require("./../FastaSeq");

/**
 * A class contains all methods related with protein sequence analysis.
 */
class ProteinSequenceAssistant {
/**
   * The constructor of {NucleotideSequenceAssistant} class.
   * @param {FastaSeq} a fastaSequenceObject.
   */
  constructor(fastaSequenceObject) {
    if (!(fastaSequenceObject instanceof FastaSeq)) {
      throw new Error("FASTA sequence object is not setup properly.");
    }

    this.fastaSequenceObject = fastaSequenceObject;
  }

  /**
   * Check if the input protein sequences contain invalid characters. 
   * @returns a javascript object indicating whether each sequence is valid or not
   */
  containsInvalidCharacters() {
    const result = {};
    const sequenceMap = this.fastaSequenceObject.seqMap;

    sequenceMap.forEach((value, key)=>{
      result[key] = !sequenceValidator.isProteinSequenceValid(value.sequence);
    });

    return result;
  }

}

module.exports = ProteinSequenceAssistant;