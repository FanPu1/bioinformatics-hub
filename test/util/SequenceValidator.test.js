const sequenceValidator = require ("../../src/util/SequenceValidator");

/**
 * Test isNucleotideSequenceValid() returns exepcted value
 */
test("test isNucleotideSequenceValid() method", ()=> {
  const validSequence = "ATUCGATCG*-";
  const invalidSequence = "FPATUCGATCG*-";
  expect(sequenceValidator.isNucleotideSequenceValid(validSequence)).toBe(true);
  expect(sequenceValidator.isNucleotideSequenceValid(invalidSequence)).toBe(false);
});

/**
 * Test isNucleotideSequenceValid() returns exepcted value
 */
test("test isProteinSequenceValid() method", ()=> {
  const validSequence = "DGNGYIDENELDALLKDLCEKNKQDLDINNITTYKKNIMALSDGGKLYRTDLALILCAGDNC*-";
  const invalidSequence = "DGNGYIDENELDALLKDLCEKNKQDLDINNITTYKKNIMALSDGGKLYRTDLALILCAGDNZ*-";
  expect(sequenceValidator.isProteinSequenceValid(validSequence)).toBe(true);
  expect(sequenceValidator.isProteinSequenceValid(invalidSequence)).toBe(false);
});