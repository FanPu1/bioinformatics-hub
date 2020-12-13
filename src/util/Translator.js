const cleanupSequence = require("./cleanupString");
const ReverseComplementAssistant = require("./../fasta/sequenceAssistant/ReverseComplementAssistant");
const nucleotideCodonToProtein = require("./../constants/nucleotideCodon");

/**
 * Translate a single nucleotide sequence (DNA or RNA sequence) to protein sequence.
 */
class Translator {
  /**
   * Translate a single nucleotide sequence to 6 different protein sequences.
   * @param {String} nucleotideSequence, a valid nucleotide sequence.
   * @returns a javascript object containing6 different translated protein sequences.
   * @throws a error if the input sequence containing invalid characters.
   */
  static translateToProtein(nucleotideSequence) {
    // remove space numbers in this sequence, then convert to upper case, and then replace U to T.
    const cleanSequence = cleanupSequence(nucleotideSequence).toUpperCase().replace(/U/gi, "T");
    // get reverse complementary sequence
    const reverseComplementarySequence = ReverseComplementAssistant.reverseComplementarySequence(cleanSequence);

    const result = {
      "5' to 3' Frame 1": "",
      "5' to 3' Frame 2": "",
      "5' to 3' Frame 3": "",
      "3' to 5' Frame 1": "",
      "3' to 5' Frame 2": "",
      "3' to 5' Frame 3": "",
    };

    for (let i = 0; i < cleanSequence.length - 2; i = i + 3){
      let codon = cleanSequence.substring(i, i + 3);
      if (codon.length === 3) {
        result["5' to 3' Frame 1"] += nucleotideCodonToProtein[codon] === undefined? "X" : nucleotideCodonToProtein[codon];
      }
      
      codon = cleanSequence.substring(i + 1, i + 4);
      if (codon.length === 3) {
        result["5' to 3' Frame 2"] += nucleotideCodonToProtein[codon] === undefined? "X" : nucleotideCodonToProtein[codon];
      }

      codon = cleanSequence.substring(i + 2, i + 5);
      if (codon.length === 3) {
        result["5' to 3' Frame 3"] += nucleotideCodonToProtein[codon] === undefined? "X" : nucleotideCodonToProtein[codon];
      }

      codon = reverseComplementarySequence.substring(i, i + 3);
      if (codon.length === 3) {
        result["3' to 5' Frame 1"] += nucleotideCodonToProtein[codon] === undefined? "X" : nucleotideCodonToProtein[codon];
      }

      codon = reverseComplementarySequence.substring(i + 1, i + 4);
      if (codon.length === 3) {
        result["3' to 5' Frame 2"] += nucleotideCodonToProtein[codon] === undefined? "X" : nucleotideCodonToProtein[codon];
      }

      codon = reverseComplementarySequence.substring(i + 2, i + 5);
      if (codon.length === 3) {
        result["3' to 5' Frame 3"] += nucleotideCodonToProtein[codon] === undefined? "X" : nucleotideCodonToProtein[codon];
      }
    }

    return result;
  }
}

module.exports = Translator;