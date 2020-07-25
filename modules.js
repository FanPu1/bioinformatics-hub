const ncbiSequenceRetriever = require("./src/ncbi/NcbiSeqRetriever");
const ncbiMotifScanner = require("./src/ncbi/MotifScanner");

const modules = {
  /** Retrieve mutiple sequences from NCBI. */
  ncbiSequenceRetriever: ncbiSequenceRetriever,
  /** Given an array of ACCESSION ids from NCBI protein or nuccore databases, predict/scan motifs in these sequences. */
  ncbiMotifScanner: ncbiMotifScanner
};

module.exports = modules;