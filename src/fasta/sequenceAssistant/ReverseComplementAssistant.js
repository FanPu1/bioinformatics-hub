const SequenceValidator = require("./../../util/SequenceValidator");

/**
 * A class provides simple static methods to convert a nucleotide sequences to be its reverse, complementary, 
 * or reverse complementary sequence.
 */
class ReverseComplementAssistant {
  /**
   * Reverse a single sequence. 
   * Example: 
   *  input: AAATT 
   *  output: TTAAA
   * @param {String} sequence 
   * @returns a reversed sequence
   */
  static reverseSequence(sequence) {
    return sequence.split("").reverse().join("");
  }

  /**
   * Returns a complementary sequence of a nucleotide sequence. If the sequence contains a character other than 
   * a, t, u, c, g, A, T, U, C, G, N, n, -, or *, then an error will be thrown. blanks and change line character will be 
   * treated as invalid letters.
   * Example: 
   *  input: AAATTG
   *  output: TTTAAC
   * @param {String} a valid nucleotide sequence.
   * @returns a complementary nucleotide sequence.
   * @throws an error if the sequence contains invalid characters.
   */
  static complementarySequence (sequence) {
    if (!SequenceValidator.isNucleotideSequenceValid(sequence)) {
      throw new Error ("The sequence contains invalid letters");
    }

    const complementaryDictionary = {
      "a": "t",
      "A": "T",
      "t": "a",
      "T": "A",
      "u": "a",
      "U": "A",
      "c": "g",
      "C": "G",
      "g": "c",
      "G": "C"
    };

    let outputString = "";
    for (let char of sequence) {
      if (complementaryDictionary[char] == undefined) {
        outputString += char; 
      } else {
        outputString += complementaryDictionary[char];
      }
    }

    return outputString;
  }

  /**
   * Returns a reverse complementary sequence of a nucleotide sequence. If the sequence contains a character other than 
   * a, t, u, c, g, A, T, U, C, G, N, n, -, or *, then an error will be thrown. blanks and change line character will be 
   * treated as invalid letters.
   * Example: 
   *  input: AAATTG
   *  output: CAATTT
   * @param {String} a valid nucleotide sequence.
   * @returns a reverse complementary nucleotide sequence.
   * @throws an error if the sequence contains invalid characters.
   */
  static reverseComplementarySequence (sequence) {
    return this.reverseSequence(this.complementarySequence(sequence));
  }
}

module.exports = ReverseComplementAssistant;