const BioinformaticsHub = require("./../index");
const bioinformaticsHub = new BioinformaticsHub();

const dnaSequences = ">seq1\nAAAAUTTGCNN";
let output = bioinformaticsHub.setFastaSequences(dnaSequences).getNucleotideSequenceAssistant().getReverseSequences();
console.log(output);
output = bioinformaticsHub.getNucleotideSequenceAssistant().getComplementarySequences();
console.log(output);
output = bioinformaticsHub.getNucleotideSequenceAssistant().getReverseComplementarySequences();
console.log(output);