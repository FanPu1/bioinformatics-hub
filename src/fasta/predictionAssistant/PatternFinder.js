/**
 * A light weighted class to predict an single pattern in a single sequence.
 */
class PatternFinder {
  /**
   * Checks if the input sequence contains input pattern.
   * @param {String} pattern, a pattern (signigure) in a motif.
   * @param {String} sequence, a protein or a nucleotide sequence
   * @retruns true if the sequence contains this pattern, false otherwise.
   */
  containPattern(pattern, sequence) {
    const regexp = new RegExp(pattern, "g");
    return regexp.test(sequence);
  }

  /**
   * Predicts and gets matched squences fragment from an input sequence using 
   * given pattern.
   * @param {String} pattern, a pattern (signigure) in a motif.
   * @param {String} sequence, a protein or a nucleotide sequence.
   * @returns {Array} of predicted results. 
   * Example of returns: [{starting_index: 23, sequence: "DKDGE"}, {starting_index: 55, sequence: "DSEKD"}]
   */
  getMatchedSequences(pattern, sequence) {
    const regexp = new RegExp(pattern, "g");
    const outputArray = [];
    let match;
    while ((match = regexp.exec(sequence)) != null) {
      outputArray.push({startIndex: match.index, matched_sequence: match[0]});
    }
    return outputArray;
  }
}

module.exports = PatternFinder;