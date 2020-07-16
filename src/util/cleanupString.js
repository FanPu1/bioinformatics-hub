/**
 * Remove numbers and blanks from the fasta sequence. If the sequence contains characters
 * other than A-Z, a-z, "*"", "-"", an exception will be throw.
 * FASTA sequence format: 
 * https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp
 * @param {String} sequence, a DNA/RNA or protein sequence to be clean up. 
 * @returns {String} a sequence after remove numbers. 
 * @throws Error if the sequence is empty after numbers and blanks are removed.
 * @throws Error if the sequence (after numbers and blanks are removed) contains characters
 * other than A-Z, a-z, "*", "-".
 */