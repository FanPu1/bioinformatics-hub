const PatternFinder = require("./../../../src/fasta/predictionAssistant/PatternFinder");

const finder = new PatternFinder();
const pattern = "[DNS]\\w[DNS][^FLIVWY][DNESTG]";
const sequence = "DDDKEGGDDDKD";

/**
 * Test methods in {PatternFinder} class when there are pattern matches.
 */
test("test containPattern() function when there are pattern matches", ()=>{
  expect(finder.containPattern(pattern,sequence)).toEqual(true);
  expect(finder.getMatchedSequences(pattern,sequence).length).toEqual(2);
  expect(finder.getMatchedSequences(pattern,sequence)[0].startIndex).toEqual(0);
  expect(finder.getMatchedSequences(pattern,sequence)[0].matched_sequence).toEqual("DDDKE");
  expect(finder.getMatchedSequences(pattern,sequence)[1].startIndex).toEqual(7);
  expect(finder.getMatchedSequences(pattern,sequence)[1].matched_sequence).toEqual("DDDKD");
});

/**
 * Test methods in {PatternFinder} class when there are no pattern matches.
 */
test("test containPattern() function when there are no pattern matches", ()=>{
  expect(finder.containPattern(pattern,"")).toEqual(false);
  expect(finder.getMatchedSequences(pattern,"").length).toEqual(0);
  expect(finder.getMatchedSequences(pattern,"")).toEqual([]);
});