const sequenceValidator = require("./../../util/SequenceValidator");
const FastaSeq = require("./../FastaSeq");
const ReverseComplementAssistant = require("./ReverseComplementAssistant");

/**
 * A class contains all methods related with nucleotide sequence analysis.
 */
class NucleotideSequenceAssistant {
  
  /**
   * The constructor of {NucleotideSequenceAssistant} class.
   * @param {FastaSeq} a fastaSequenceObject.
   */
  constructor(fastaSequenceObject) {
    if (!(fastaSequenceObject instanceof FastaSeq)) {
      throw new Error("FASTA sequence is not setup properly.");
    }

    this.fastaSequenceObject = fastaSequenceObject;
  }

  /**
   * Check if the input nucleotide sequences contains invalid characters. 
   * Valid characters are: A, T, C, G, U, *, _
   * @returns a javascript object indicating whether each sequence is valid or not
   */
  containsInvalidCharacters() {
    const result = {};
    const sequenceMap = this.fastaSequenceObject.seqMap;

    sequenceMap.forEach((value, key)=>{
      result[key] = !sequenceValidator.isNucleotideSequenceValid(value.sequence);
    });

    return result;
  }

  /**
   * Get the reversed sequences.
   * @returns a javascript object using sequence Ids as keys and reversed sequences as values.
   */
  getReverseSequences() {
    const result = {};
    const sequenceMap = this.fastaSequenceObject.seqMap; 

    sequenceMap.forEach((value, key)=>{
      result[key] = ReverseComplementAssistant.reverseSequence(value.sequence);
    });

    return result;
  }

  /**
   * Get the complementary sequences.
   * @returns a javascript object using sequence Id as keys and complementary sequences as values.
   * @throws an error if any of the sequence contains invalid letters. 
   *  Valid letters: A, U, T, C, G, *, -, a, u, t, c, g. 
   */
  getComplementarySequences() {
    const result = {};
    const sequenceMap = this.fastaSequenceObject.seqMap; 

    sequenceMap.forEach((value, key)=>{
      if (!sequenceValidator.isNucleotideSequenceValid(value.sequence)) {
        throw new Error ( "the sequence: [" + key + "] contains invalid letters.");
      }

      result[key] = ReverseComplementAssistant.complementarySequence(value.sequence);
    });

    return result;
  }

  /**
   * Get the reversed complementary sequences.
   * @returns a javascript object using sequence Id as keys and reverse complementary sequences as values.
   * @throws an error if any of the sequence contains invalid letters. 
   *  Valid letters: A, U, T, C, G, *, -, a, u, t, c, g. 
   */
  getReverseComplementarySequences() {
    const result = {};
    const sequenceMap = this.fastaSequenceObject.seqMap; 

    sequenceMap.forEach((value, key)=>{
      if (!sequenceValidator.isNucleotideSequenceValid(value.sequence)) {
        throw new Error ( "the sequence: [" + key + "] contains invalid letters.");
      }

      result[key] = ReverseComplementAssistant.reverseComplementarySequence(value.sequence);
    });

    return result;
  }
}

module.exports = NucleotideSequenceAssistant;