const BioinformaticsHub = require("./../../index");
const ncbiSequenceRetriever = require("./NcbiSeqRetriever");

/**
 * Given an array of ACCESSION ids from NCBI protein or nuccore databases, predict/scan
 * motifs in these sequences.
 */
class MotifScanner {
  /**
   * Given an array of ACCESSION ids from NCBI protein database, predict/scan motifs in these sequences.
   * @param {Array} ncbiAccessIdArray, an array of NCBI protein ACCESSION Ids. Example: ["CAA44792.1", "EEB16923.1" ]
   * @param {Object} patterns, the sequence pattern of motifs. Patterns can have the following input:
   * 1. A pattern string without pattern Id. Example 1: "[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]"
   * 2. An array of strings, and each element in this array is a pattern used to prediction. Element in this array cannot be repeat. Example 2:
   *        ["[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]", "[DNS]-x-[DNS]-{FLIVWY}"]
   * 3. A JSON object containing a pattern and a pattern Id. Example 3: 
   *        {"patternId_1": "[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]"}
   *        OR
   *        {
   *          "patternId_1": {
   *            "pattern": "[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]",
   *            "description": "This is a desciption of this pattern, what is used for, where it is come from",
   *            "url":"www.reference_url.io"
   *          }, 
   *          "patternId_2": "[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]"
   *        }
   * @param {*} apiKey, the optional apikey. Read more about apiKey from https://www.npmjs.com/package/bioinformatics-hub#optional-api-key
   * @returns {object} prediction results.
   * @throws an error if the format or the content of ncbiAccessIdArray or patterns is not valid.
   */
  async scanProteinMotifsWithNcbiIds (ncbiAccessIdArray, patterns = "all", apiKey = undefined) {
    if (patterns === "all") { // this default value will throw an exception, will be updated in the future.
      throw new Error ("patterns must be defined.");
    }
    // retrieve sequences from NCBI
    const fastaSequenceString = await ncbiSequenceRetriever.retrieveProteinSequences(ncbiAccessIdArray, "FASTA", apiKey);

    // predict motifs from retreived sequences
    const bioinformaticsHub = new BioinformaticsHub();
    return bioinformaticsHub.setFastaSequences(fastaSequenceString).getPredictionAssistant().setPatterns(patterns).predict();
  }

  /**
   * Given an array of ACCESSION ids from NCBI nucleotide database, predict/scan motifs in these sequences.
   * @param {Array} ncbiAccessIdArray, an array of NCBI protein ACCESSION Ids. Example: [NM_009788.4 ]
   * @param {Object} patterns, the sequence pattern of motifs. Patterns can have the following input:
   * 1. A pattern string without pattern Id. Example 1: "[AT]-x-[CA]-{T}-[AC]"
   * 2. An array of strings, and each element in this array is a pattern used to prediction. Element in this array cannot be repeat. Example 2:
   *        ["[AT]-x-[CA]-{T}-[AC]", "[AT]-x-[CA]-{T}-[AC]-{A}"]
   * 3. A JSON object containing a pattern and a pattern Id. Example 3: 
   *        {"patternId_1": "[AT]-x-[CA]-{T}-[AC]"}
   *        OR
   *        {
   *          "patternId_1": {
   *            "pattern": "[AT]-x-[CA]-{T}-[AC]",
   *            "description": "This is a desciption of this pattern, what is used for, where it is come from",
   *            "url":"www.reference_url.io"
   *          }, 
   *          "patternId_2": "[AT]-x-[CA]-{T}-[AC]-{A}"
   *        }
   * @param {*} apiKey, the optional apikey. Read more about apiKey from https://www.npmjs.com/package/bioinformatics-hub#optional-api-key
   * @returns {object} prediction results.
   * @throws an error if the format or the content of ncbiAccessIdArray or patterns is not valid.
   */
  async scanNucleotideMotifsWithNcbiIds (ncbiAccessIdArray, patterns = "all", apiKey = undefined) {
    if (patterns === "all") { // this default value will throw an exception, will be updated in the future.
      throw new Error ("patterns must be defined.");
    }
    // retrieve sequences from NCBI
    const fastaSequenceString = await ncbiSequenceRetriever.retrieveNucleotideSequences(ncbiAccessIdArray, "FASTA", apiKey);

    // predict motifs from retreived sequences
    const bioinformaticsHub = new BioinformaticsHub();
    return bioinformaticsHub.setFastaSequences(fastaSequenceString).getPredictionAssistant().setPatterns(patterns).predict();
  }
}

module.exports = new MotifScanner();