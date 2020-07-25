const convertPatternToRegExp = require("../../util/patternConverter");
const PatternFinder = require("./PatternFinder");

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
   * @param  {String}, {Arrary}, {Object} in above description
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
      "originalPattern": stringPattern,
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
          "originalPattern": patternObject[key],
          "description": null,
          "url": null
        };
        outputPatternMap.set(patternId, patternInfo);
      } else if (typeof patternObject[key] === "object" && typeof patternObject[key].pattern === "string") {
        const value = patternObject[key];
        const patternInfo = {
          "pattern": convertPatternToRegExp(value.pattern),
          "originalPattern": value.pattern,
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
   * Translates an arry of pattern strings (no key) into a {PatternMap}.
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
        "originalPattern": patternString,
        "description": null,
        "url": null
      };
      outputPatternMap.set(patternId, patternInfo);
    }

    return outputPatternMap;
  }

  /**
   * Predict/find the motifs based on pattern search for the input FASTA sequences.
   * Read instructions on https://github.com/accliu/Nerds_pockets/projects/1 on
   * how to use this method correctly.
   * @returns the prediction results along with the fasta sequence Ids, fasta sequences,
   * pattern(motif) name, pattern signiture, and prediction result. Example:
   * [
   *    {
   *        sequenceId: "fake sequence Id 1",
   *        sequence: "DKSKKDKDKDDSKSDKSDKSDK......",
   *        contained_motifs: ["ef-hand"]
   *        motifs: 
   *        {
   *            "ef-hand": 
   *            {
   *                pattern_signiture: "[D]-x-[D,E]-x-[D,E]",
   *                matched_sequences: [{starting_index: 23, sequence: "DKDGE"}, {starting_index: 55, sequence: "DSEKD"}]
   *            },
   *            "zink-finger": 
   *            {
   *                pattern_signiture: "[C]-x-[C]-x-[C]",
   *                matched_sequences: [],
   *                discription: "description of zink finger",
   *                url: "www.fakeurl.com"
   *            } 
   *        }
   *    }, 
   *    {
   *        sequenceId: "fake sequence Id 2",
   *        sequence: "PPPPPPPIIIIKKKDRGD",
   *        contained_motifs: []
   *        motifs: 
   *        {
   *            "ef-hand": 
   *            {
   *                pattern_signiture: "[D]-x-[D,E]-x-[D,E]",
   *                matched_sequences: []
   *            },
   *            "zink-fingure": 
   *            {
   *                pattern_signiture: "[C]-x-[C]-x-[C]",
   *                matched_sequences: []
   *            } 
   *        }
   *    }, 
   * ]
   * @throws error if FASTA sequence is fastaSequenceObject or patternsWithIds in {PredictionAssistant} object is null or not defined.
   */
  predict(){
    if (!this.fastaSequenceObject) {throw new Error("FASTA sequence is not setup properly.");}
    if (!this.patternsWithIds) {throw new Error("Motif (pattern) is not setup properly");}
    const predictionResultArray = [];

    // retrive FASTA sequences Ids from fastaSequenceObject and stored in an array.
    const fastaSeqIdArray = this.fastaSequenceObject.getAllSequenceIds();
    // retrive Pattern Ids from {PatternMap} stored in patternsWithIds.
    const patternIdArray = [...this.patternsWithIds.keys()];
    if (fastaSeqIdArray.length && patternIdArray.length) {
      // loop through each sequence Ids 
      for (let sequenceId of fastaSeqIdArray){
        // extract sequence by sequenceId
        const sequence = this.fastaSequenceObject.getSequenceById(sequenceId);
        const predictionResult = {};
        // store sequenceId and sequence into predictionResult object 
        predictionResult.sequenceId = sequenceId;
        predictionResult.sequence = sequence;
        predictionResult.contained_motifs = [];
        predictionResult.motifs = {};

        // loop through patternIds and predict the presence of each motif against sequence. 
        for (let patternId of patternIdArray) {
          //retrieve motif pattern (signiture), desription, and reference url
          const pattern = this.patternsWithIds.get(patternId).pattern;
          const originalPattern = this.patternsWithIds.get(patternId).originalPattern;
          const description = this.patternsWithIds.get(patternId).description;
          const url = this.patternsWithIds.get(patternId).url;
          // save patternId key and pattern signiture into predictionResult.motifs
          predictionResult.motifs[patternId] = {};
          predictionResult.motifs[patternId].pattern_signiture = originalPattern;
          predictionResult.motifs[patternId].matched_sequences = [];
          // if desciption and url are not null or defined, save these information as part of 
          // motif information as well.
          if (description != null || description != undefined) {
            predictionResult.motifs[patternId].description = description;
          }
          if (url !== null || description != undefined) {
            predictionResult.motifs[patternId].url = url;
          }
          // scan this pattern (motif signiture) against sequence, 
          // if there is pattern match, then push the pattern id to predictionResult.contained_motifs array.
          const finder = new PatternFinder();
          if(finder.containPattern(pattern, sequence)) {
            predictionResult.contained_motifs.push(patternId);
            // also add prediction results to predictionResult.motifs[patternId].matched_sequences. 
            predictionResult.motifs[patternId].matched_sequences = finder.getMatchedSequences(pattern, sequence);
          }
        }
        predictionResultArray.push(predictionResult);
      }
    }
    return predictionResultArray;
  }
}
module.exports = PredictionAssistant;