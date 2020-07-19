const convertPatternToRegExp = require("../../util/patternConverter");

/**
 * A class contains all methods related with the output of sequence prediction.
 */
class PredictionAssistant {
  
  /**
   * The constructor of {PredictionaAssistant} class.
   * @param {FastaSeq} a fastaSequenceObject.
   */
  constructor(fastaSequenceObject) {
    this.fastaSequenceObject = fastaSequenceObject;
    this.patternsWithIds = null;
  }

  /**
   * Sets the pattern used for prediction. Pattern (motif) is string which is used to check if sequence (string) is matched. 
   * User should use the motif accroding to https://prosite.expasy.org/scanprosite/scanprosite_doc.html#mo_motifs
   * 
   * Pattern syntax
   * The standard IUPAC one letter code for the amino acids and nucleotide code.
   * - The symbol 'x' is used for a position where any amino acid is accepted.
   * - Ambiguities are indicated by listing the acceptable amino acids for a given position, between square brackets '[ ]'. For example: [ALT] stands for Ala or Leu or Thr.
   * - Ambiguities are also indicated by listing between a pair of curly brackets '{ }' the amino acids that are not accepted at a given position. For example: {AM} stands for all any amino acid except Ala and Met.
   * - Each element in a pattern is separated from its neighbor by a '-'.
   * - Repetition of an element of the pattern can be indicated by following that element with a numerical value or, if it is a gap ('x'), by a numerical range between parentheses.
   * - Examples:
   *  - x(3) corresponds to x-x-x
   *  - x(2,4) corresponds to x-x or x-x-x or x-x-x-x
   *  - A(3) corresponds to A-A-A
   * - When a pattern is restricted to either the N- or C-terminal of a sequence, that pattern respectively starts with a '<' symbol or ends with a '>' symbol.
   * - In some rare cases (e.g. PS00267 or PS00539), '>' can also occur inside square brackets for the C-terminal element. 'F-[GSTV]-P-R-L-[G>]' is equivalent to 'F-[GSTV]-P-R-L-G' or 'F-[GSTV]-P-R-L>'.
   * 
   * User can have the following input:
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
   * @param  {String}, {Arrary}, {Object} in above desciption
   * @returns {PredictionAssistant} object with patternMap being set.
   * @throws a exception if input is null, undefined, a blank string, or an empty string.
   */
  setPatterns(patterns){
    // check invalid input
    if (patterns === null || patterns === undefined) {
      throw new Error("The input patterns cannot be null or undefined.");
    }
    // convert input into a {PatternMap} object
    switch(typeof patterns){
    case "string":  // like example 1
      if(patterns.trim() === "") {
        throw new Error("The input patterns cannot be blank string or an empty string.");
      }
      this.patternsWithIds = this.translatePatternString(patterns);
      break;
    case "object":
      if(Array.isArray(patterns)) { // if input is an array with string element, like example 2
        this.patternsWithIds = this.translatePatternArray(patterns);
      } else { // treat as example 3.
        this.patternsWithIds = this.translatePatternObject(patterns);
      }
      break;
    default:
      throw new Error("The format of input patterns is not supported.");
    } 
    return this;
  }

  /**
   * Translates a string to a {PatternMap}.
   * input example: "[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]"
   * @param {Sting} stringPattern 
   * @returns a {PatternMap}.
   */
  translatePatternString(stringPattern) {
    const patternId = stringPattern; // patternId is same as input string
    const patternInfo= {
      "pattern": convertPatternToRegExp(stringPattern),
      "description": null,
      "url": null
    };
    const outputPatternMap = new Map();
    outputPatternMap.set(patternId, patternInfo);

    return outputPatternMap;
  }

  /**
   * Translates a JSON object containing keys and values into a {PatternMap}.
   * Input patern object example -> A JSON object containing a pattern and a pattern Id:
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
   * @param {Object} patternObject 
   */
  translatePatternObject(patternObject) {
    const keys = Object.keys(patternObject);
    const outputPatternMap = new Map();

    for (const key of keys) {
      const patternId = key;
      if (typeof patternObject[key] === "string") {
        const patternInfo = {
          "pattern": convertPatternToRegExp(patternObject[key]),
          "description": null,
          "url": null
        };
        outputPatternMap.set(patternId, patternInfo);
      } else if (typeof patternObject[key] === "object" && typeof patternObject[key].pattern === "string") {
        const value = patternObject[key];
        const patternInfo = {
          "pattern": convertPatternToRegExp(value.pattern),
          "description": value.description,
          "url": value.url
        };
        outputPatternMap.set(patternId, patternInfo);
      } else {
        throw new Error("The input pattern is not valid.");
      }
    }
    
    return outputPatternMap;
  }

  /**
   * Translates a arry of pattern strings (no key) into a {PatternMap}.
   * input example: ["[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]", "[DNS]-x-[DNS]-{FLIVWY}"]
   * @param {Array} patternArray 
   * @throws a error if input is not valid.
   */
  translatePatternArray(patternArray) {
    const outputPatternMap = new Map();
    const patternSet = new Set(patternArray);

    for (const patternString of patternSet) {
      if (typeof patternString !== "string") {
        throw new Error ("The input pattern is not valid.");
      }
      const patternId = patternString;
      const patternInfo = {
        "pattern": convertPatternToRegExp(patternString),
        "description": null,
        "url": null
      };
      outputPatternMap.set(patternId, patternInfo);
    }

    return outputPatternMap;
  }
}

module.exports = PredictionAssistant;