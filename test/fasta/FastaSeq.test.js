const fs = require("fs");
const BioinformaticsApp = require("./../../index");
const DataType = require("../../src/constants/DataType");

// Below are three individule sequences extracted from fastaDNASequence1.txt manually.
const unnamedSequence1 = "TTTCCCAACAGGATCTCCCACCAGCCCAGCTTTTCTATATAGGCTCTGACCTCTGGTCATCCAAGTTGCAGGATGTCGATGACAGACTTGCTCAGCGCTGAGGACATCAAGAAGGCGATAGGAGCCTTTACTGCTGCAGACTCCTTCGACCACAAAAAGTTCTTCCAGATGGTGGGCCTGAAGAAAAAGAGTGCGGATGATGTGAAGAAGGTGTTCCACATTCTGGACAAAGACAAAAGTGGCTTCATTGAGGAGGATGAGCTGGGGTCCATTCTGAAGGGCTTCTCCTCAGATGCCAGAGACTTGTCTGCTAAGGAAACAAAGACGCTGATGGCTGCTGGAGACAAGGACGGGGACGGCAAGATTGGGGTTGAAGAATTCTCCACTCTGGTGGCCGAAAGCTAAGTGGCGCTGACTGCTTGGGTCTCCCACCTCTCCACCCCCCATGCCCCATCTCAGCCCTTCTCGCGGCCCTCCTGGGTTTCTGTTCAGTTTGTTTATGTTATTTTTTACTCCCCCATCCTTTATGGCCCTCGAATGACACCACTCTTCTGGAAAATGCTGGAGAAACAATAAAGGCTGTACCCATCGGACACCACCTGTAGGGAGGACCCAGGCCTGGTAGGTGTTGGTTTGGCAAGTTTTTCCGGACAGCAGTGGGGGTATAGTAGAAAAAGTGAGAGAGAGCGAAGGACCACGCCCTGATATTTCCTGCCTGCTTGGTACCGAGTGGTCACGTGGGCCACCTTGTTCAGTCTTTGTGCCTTTCCTACAAGGGGATGGGATGGCGCAGGGGATTTTAAAGATGCAGAAACTGCCTTTTAAAGAGCAGAACGGAAGGGGCTGAGTCCACAGGTGATTACTTTATGTCCCTGAGGAATAACTAGGTCGAAGGACTCAAATGACACTCTATCAATTGCTTTTGACTTTGCTGTGATAAAATTCCTGATAAGAGAAACTT";
const sampleSequence2 = "AAACTCCTCTTTGATTCTTCTAGCTGTTTCACTATTGGGCAACCAGACACCAGAATGAGTACTAAAAAGTCTCCTGAGGAACTGAAGAGGATTTTTGAAAAATATGCAGCCAAAGAAGGTGATCCAGACCAGTTGTCAAAGGATGAACTGAAGCTATTGATTCAGGCTGAATTCCCCAGTTTACTCAAAGGTCCAAACACCCTAGATGATCTCTTTCAAGAACTGGACAAGAATGGAGATGGAGAAGTTAGTTTTGAAGAATTCCAAGTATTAGTAAAAAAGATATCCCAGTGAAGGAGAAAACAAAATAGAACCCTGAGCACTGGAGGAAGAGCGCTGTGCTGTGGTCTTATCCTATGTGGAATCCCCCAAAGTCTCTGGTTTAATTCTTTGCAATTATAATAACCTGGCTGTGAGGTTCAGTTATTATTAATAAAGAAATTACTAGACATAC";
const unnamedSequence2 = "TTCGGCCGGC"; 

/**
 * Test {FastaSeq} contains the expected attributes initialized by {BioinformaticsApp}.
 */
test("test FastaSeq constructor and its attributes", () => {
  fs.readFile("./seeds/fastaDNASequence1.txt", (err, data) => {
    const fastaSequenceString = data.toString(); 
    const app = new BioinformaticsApp("dna");
    const fastaSeq = app.setFastaSequences(fastaSequenceString);
    
    // assert data type
    expect(fastaSeq.dataType).toBe(DataType.DNA);
    // assert the orginal fasta sequence saved in the BioinformaticsApp 
    expect(fastaSeq.fastaSequencesString).toBe(fastaSequenceString);
    // assert that fastaSequenceObject in BioinformaticsApp contains the expected object
    expect(app.fastaSequenceObject).toBe(fastaSeq);
    // assert {SeqMap} inside of {FastaSeq}
    const seqMap = fastaSeq.seqMap;
    expect(seqMap.size).toBe(3);
    expect(seqMap.has("Unnamed sequence 1")).toBe(true);
    expect(seqMap.has("Sample sequence 2")).toBe(true);
    expect(seqMap.has("Unnamed sequence 2")).toBe(true);
    // assert the first sequence in the fasta file
    expect(seqMap.get("Unnamed sequence 1")["sequence"]).toBe(unnamedSequence1);
    expect(seqMap.get("Unnamed sequence 1")["sequenceId"]).toBe("Unnamed sequence 1");
    // assert the sequence in the fasta file
    expect(seqMap.get("Sample sequence 2")["sequence"]).toBe(sampleSequence2);
    expect(seqMap.get("Sample sequence 2")["sequenceId"]).toBe("Sample sequence 2");
    // assert the third sequence in the fasta file
    expect(seqMap.get("Unnamed sequence 2")["sequence"]).toBe(unnamedSequence2);
    expect(seqMap.get("Unnamed sequence 2")["sequenceId"]).toBe("Unnamed sequence 2");
  });
});
