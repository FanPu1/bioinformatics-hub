const PredictionAssistant = require("./../../../src/fasta/predictionAssistant/PredictionAssistant");
const FastaSeq = require("./../../../src/fasta/FastaSeq");

/**
 * Test constructor method.
 */
test("test constructor method", ()=>{
  let assistant = new PredictionAssistant();
  expect(assistant.fastaSequenceObject).toBe(undefined); 

  const fastaSequenceObject = new FastaSeq("DNA", "AAAAATTTTT");
  assistant = new PredictionAssistant(fastaSequenceObject);
  expect(assistant.fastaSequenceObject).toEqual(fastaSequenceObject);
  expect(assistant.fastaSequenceObject.size()).toBe(1);
  expect(assistant.fastaSequenceObject.getSequenceById("Unnamed sequence 1")).toBe("AAAAATTTTT");
});

/**
 * Test translatePatternString(string) method.
 */
test("test translatePatternString(string) method", ()=>{
  let assistant = new PredictionAssistant();
  let inputPatternString = "[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]";
  let expectedPatternId = "[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]";
  let expectedPattern = "[DNS]\\w[DNS][^FLIVWY][DNESTG][DNQGHRK][^GP][LIVMC][DENQSTAGC]\\w{2}[ED]";
  let expectedDescription = null;
  let expectedUrl = null;
  assistant.setPatterns(inputPatternString);
  const patternMap = assistant.patternsWithIds;
  expect(patternMap.keys().next().value).toEqual(expectedPatternId);
  expect(patternMap.get(expectedPatternId).pattern).toEqual(expectedPattern);
  expect(patternMap.get(expectedPatternId).description).toEqual(expectedDescription);
  expect(patternMap.get(expectedPatternId).url).toEqual(expectedUrl);

  assistant = new PredictionAssistant();
  inputPatternString = " ";
  expect(()=>{
    assistant.setPatterns(inputPatternString);
  }).toThrow("The input patterns cannot be blank string or an empty string.");

  assistant = new PredictionAssistant();
  inputPatternString = "";
  expect(()=>{
    assistant.setPatterns(inputPatternString);
  }).toThrow("The input patterns cannot be blank string or an empty string.");

  assistant = new PredictionAssistant();
  inputPatternString = null;
  expect(()=>{
    assistant.setPatterns(inputPatternString);
  }).toThrow("The input patterns cannot be null or undefined.");

  assistant = new PredictionAssistant();
  inputPatternString = undefined;
  expect(()=>{
    assistant.setPatterns(inputPatternString);
  }).toThrow("The input patterns cannot be null or undefined.");
});

/**
 * Test translatePatternArray(string) method.
 */
test("test translatePatternArray(string) method", ()=>{
  let assistant = new PredictionAssistant();
  let inputPatternArray = ["[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]", "<{AB}>"];
  let expectedPatternId1 = "[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]";
  let expectedPatternId2 = "<{AB}>";
  let expectedPattern1 = "[DNS]\\w[DNS][^FLIVWY][DNESTG][DNQGHRK][^GP][LIVMC][DENQSTAGC]\\w{2}[ED]";
  let expectedPattern2 = "^[^AB]$"; 
  let expectedDescription = null;
  let expectedUrl = null;
  assistant.setPatterns(inputPatternArray);
  let patternMap = assistant.patternsWithIds;
  expect(patternMap.size).toBe(2);
  expect(patternMap.get(expectedPatternId1).pattern).toEqual(expectedPattern1);
  expect(patternMap.get(expectedPatternId1).description).toEqual(expectedDescription);
  expect(patternMap.get(expectedPatternId1).url).toEqual(expectedUrl);
  expect(patternMap.get(expectedPatternId2).pattern).toEqual(expectedPattern2);
  expect(patternMap.get(expectedPatternId2).description).toEqual(expectedDescription);
  expect(patternMap.get(expectedPatternId2).url).toEqual(expectedUrl);

  assistant = new PredictionAssistant();
  inputPatternArray = ["[AB]-C" ,"" ];
  expect(()=>{
    assistant.setPatterns(inputPatternArray);
  }).toThrow("The input patterns cannot be blank string or an empty string.");

  assistant = new PredictionAssistant();
  inputPatternArray = ["[AB]-C" , null ];
  expect(()=>{
    assistant.setPatterns(inputPatternArray);
  }).toThrow("The input pattern is not valid.");

  assistant = new PredictionAssistant();
  inputPatternArray= ["[AB]-C" , 5 ];
  expect(()=>{
    assistant.setPatterns(inputPatternArray);
  }).toThrow("The input pattern is not valid.");

  assistant = new PredictionAssistant();
  inputPatternArray = ["[AB]-C" , {"id": "A-x-x"} ];
  expect(()=>{
    assistant.setPatterns(inputPatternArray);
  }).toThrow("The input pattern is not valid.");
});

/**
 * Test translatePatternObject(string) method.
 */
test("test translatePatternObject(string) method", ()=>{
  let assistant = new PredictionAssistant();
  let inputPatternObject = {
    "pattern1": {
      pattern: "[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]",
      description: "This is a description",
      url: "www.test.io"
    }, 
    12356: "<{AB}>"
  };
  let expectedPatternId1 = "pattern1";
  let expectedPatternId2 = "12356";
  let expectedPattern1 = "[DNS]\\w[DNS][^FLIVWY][DNESTG][DNQGHRK][^GP][LIVMC][DENQSTAGC]\\w{2}[ED]";
  let expectedPattern2 = "^[^AB]$"; 
  let expectedDescription = null;
  let expectedUrl = null;
  assistant.setPatterns(inputPatternObject);
  let patternMap = assistant.patternsWithIds;
  expect(patternMap.size).toBe(2);
  expect(patternMap.get(expectedPatternId1).pattern).toEqual(expectedPattern1);
  expect(patternMap.get(expectedPatternId1).description).toEqual("This is a description");
  expect(patternMap.get(expectedPatternId1).url).toEqual("www.test.io");
  expect(patternMap.get(expectedPatternId2).pattern).toEqual(expectedPattern2);
  expect(patternMap.get(expectedPatternId2).description).toEqual(expectedDescription);
  expect(patternMap.get(expectedPatternId2).url).toEqual(expectedUrl);
  
  assistant = new PredictionAssistant();
  inputPatternObject = {
    "pattern1": {
      pattern: null,
      description: "This is a description",
      url: "www.test.io"
    }, 
    "123": "<{AB}>"
  };
  expect(()=>{
    assistant.setPatterns(inputPatternObject);
  }).toThrow("The input pattern is not valid.");

  assistant = new PredictionAssistant();
  inputPatternObject = {
    "pattern1": {
      pattern: 556,
      description: "This is a description",
      url: "www.test.io"
    }, 
    "123": "<{AB}>"
  };
  expect(()=>{
    assistant.setPatterns(inputPatternObject);
  }).toThrow("The input pattern is not valid.");
});

/**
 * Test setPatterns(patterns) method throw error when input is invalid, null or undefined.
 */
test("test setPatterns(patterns) method throw error when input is invalid null or undefined.", ()=>{
  const assistant = new PredictionAssistant();
  const inputPatterns1 = 556;
  const inputPatterns2 = true;
  expect(()=>{
    assistant.setPatterns();
  }).toThrow("The input patterns cannot be null or undefined.");
  expect(()=>{
    assistant.setPatterns(null);
  }).toThrow("The input patterns cannot be null or undefined.");
  expect(()=>{
    assistant.setPatterns(inputPatterns1);
  }).toThrow("The format of input patterns is not supported.");
  expect(()=>{
    assistant.setPatterns(inputPatterns2);
  }).toThrow("The format of input patterns is not supported.");
});