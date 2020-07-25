const ncbiSequenceRetriever = require ("./src/ncbi/NcbiSeqRetriever");

const modules = {
  /** Retrieve mutiple sequences from NCBI. */
  ncbiSequenceRetriever: ncbiSequenceRetriever,
  /** Scan/predict motifs from sequences in NCBI protein or nuncore databases. */
  ncbiMotifScanner: "To Do"
};

module.exports = modules;