/**
 * A helper class to validate if a single nucleotide sequence string or protein sequence string contains 
 * invalid characters.
 */
class SequenceValidator {
  
  /**
   * Check if the given nucleotide sequence contains at least one invalid characters as nucleotide codon.
   * @param {String} sequence. A nucleotide sequence string containing only a-z, A-Z, * and - characters.
   * @returns true if all the characters in this sequence are valid, false otherwise.
   */
  static isNucleotideSequenceValid (sequence) {
    const validCharacters = new Set(["A", "U", "T", "C", "G", "-", "*", "N"]);

    for (let character of sequence.toUpperCase()) {
      if (!validCharacters.has(character)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if the given protein sequence contains at least one invalid characters as protein codon.
   * @param {String} sequence. A nucleotide sequence string containing only a-z, A-Z, * and - characters.
   * @returns true if all the characters in this sequence are valid, false otherwise.
   */
  static isProteinSequenceValid (sequence) {
    const validCharacters = new Set(["G", "A", "L", "M", "F", "W", "K", "Q", "E", "S",
      "P", "V", "I", "C", "Y", "H", "R", "N", "D", "T", "-", "*"]);

    for (let character of sequence) {
      if (!validCharacters.has(character.toUpperCase())) {
        return false;
      }
    }

    return true;
  }
}

module.exports = SequenceValidator;