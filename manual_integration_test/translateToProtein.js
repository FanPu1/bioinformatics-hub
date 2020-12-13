const BioinformaticsHub = require("./../index");
const bioinformaticsHub = new BioinformaticsHub();

const dnaSequences = ">seq1\nAAAAUTTGCNN\n>seq2\nxxxxxxactatgaattattttgagcataacggtgtattaatgaaatattttc";
let output = bioinformaticsHub.setFastaSequences(dnaSequences).getNucleotideSequenceAssistant().translateToProtein();
console.log(output);
