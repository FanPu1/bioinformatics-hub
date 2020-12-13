const BioinformaticsHub = require("./../index");
const bioinformaticsHub = new BioinformaticsHub();

const proteinSequences = ">seq1\nDKD GNGY\n>seq2\nBBCKKK";
const output = bioinformaticsHub.setFastaSequences(proteinSequences).getProteinSequenceAssistant().containsInvalidCharacters();

console.log(output);

const dnaSequences = ">seq1\nAAAATTTAAAAA \n>seq2\nBBAATTCCGGTCA";
const output2 = bioinformaticsHub.setFastaSequences(dnaSequences).getNucleotideSequenceAssistant().containsInvalidCharacters();
console.log(output2);