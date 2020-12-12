const ReverseComplementAssistant = require("./../../../src/fasta/sequenceAssistant/ReverseComplementAssistant");
const validSequence="AAATTCG*-";
const invalidSequence = "AAATTC G*-";

test("test reverseSequence method returns expected values", ()=>{
  expect(ReverseComplementAssistant.reverseSequence(validSequence)).toEqual("-*GCTTAAA");
  expect(ReverseComplementAssistant.reverseSequence(invalidSequence)).toEqual("-*G CTTAAA");
});

test("test complementarySequence methods returns expected values", ()=>{
  expect(ReverseComplementAssistant.complementarySequence(validSequence)).toEqual("TTTAAGC*-");
});

test("test complementarySequence methods throws an error when input contains invalid letters", ()=>{
  expect(()=>{
    ReverseComplementAssistant.complementarySequence(invalidSequence);
  }).toThrow("The sequence contains invalid letters");
});

test("test reverseComplementarySequence methods returns expected values", ()=>{
  expect(ReverseComplementAssistant.reverseComplementarySequence(validSequence)).toEqual("-*CGAATTT");
});

test("test reverseComplementarySequence methods throws an error when input contains invalid letters", ()=>{
  expect(()=>{
    ReverseComplementAssistant.reverseComplementarySequence(invalidSequence);
  }).toThrow("The sequence contains invalid letters");
});