class CommentLineRemover {
  /**
   * Removes the comment line in a string representative of a FASTA sequence file.
   * Fasta file with comment line example:
   * >sequenceId
   * ;this is a comment line
   * ATATATATATATATATATATGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGCCCCCCCCCCCCCCC
   * @param {String} fastaSequences, the string representative of a FASTA sequence file possibly contains sequences Ids, sequences, and comment line.
   * @returns the {string} representative of a FASTA sequence file after all comment lines are removed. 
   */
  removeCommentLine (fastaSequences){
    const lineArray = fastaSequences.split(/\r?\n/);
    const lineArrayNoComments = [];
    for (let line of lineArray) {
      line = line.trim();
      if (line.charAt(0) !== ";") {
        lineArrayNoComments.push(line);
      }
    }
    return lineArrayNoComments.join("\n");
  }
}

module.exports = CommentLineRemover;