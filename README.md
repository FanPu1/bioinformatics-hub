# Bioinformatics-Hub
Bioinformatics-Hub is an open source bioinformatics package for retrieving, processing and analyzing the sequences and structures of biomolecules, such as proteins, and nucleotides.
 
At current stage, this package can retrieve protein and nucleotide sequences from NCBI, analyzing protein and nucleotide sequnces, and predicting motifs in proteins and nucleotides. Sequences are primarily handled as a single string in [FASTA](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp) format or as a javascript object. 

We will add protein structure retrieval and analysis modules in the future.

## Outline
- Installation
- Handle user provieded sequences
  - Set/save sequence in BioinformaticsHub application
  - Get all sequence Ids
  - Get sequence by Id
  - Get all sequences with Ids as a key in to Javascript object
  - Handle invalid input, blanks, numbers, unsupported charactors.
- Use NCBI Seqeuence Retriever (NcbiSeqRetriver) module
  - Retrieve protein sequences from NCBI
  - Retrieve nucleotide sequences from NCBI
- Predict/Identify motifs in protein/nucleotides sequences
  - Pattern syntax
  - Predict motifs in user-provided sequences
  - Predict motifs in sequences in NCBI database
- Routine bioinformatics tools for protein/nucleotide sequences
  - TM (melting temperature) calculator (under development)
  - Reverse complement (under development)
  - Restriction sites detector (under development)
  - Scrumble sequence generator (under development)
  - Nucleotide to protein translator (under development)
- PDB module: retrieve and analyze protein structures (future task)
  - Retrieve protein structure from protein databank (future task)
  - Retrieve information from protein structure (future task)

## Installation
Running this package requires [nodeJS](https://nodejs.org/en/) environment. Run the below commend to install this package into your project.
```
npm install --save bioinformatics-hub
```
## Handle user-provided sequences
### Setup bioinformaticsHub object
##### Step 1: Import "bioinformatics-hub" package and create a bioinformaticsHub object.
```
const BioinformaticsHub = require("bioinformatics-hub");
const bioInformaticsHub = new BioinformaticsHub();
```

##### Step 2: Store user-provided sequences into bioinformaticsHub object. 
This application can store one sequence or mutiple sequences provided by user. The sequences should be provided as a single string in [FASTA format](https://en.wikipedia.org/wiki/FASTA_format).
However, if user wants to store only one squence for analysis, then the squence id (started with ">" in FASTA format) is optional.
This application will automatically provide a sequence Id as "Unnamed sequence 1", if the only sequence does not have a sequence Id.

Here is an example on how to store two sequences in to this application.
```
>sequence_id_1
SLLKASSTLDNLFKELDKNGDGEVSYEEF
>sequence_id_2
DKDKD
```
These two sequences can be stored in this application as shown below.
```
const inputSequence = ">sequence_id_1\nSLLKASSTLDNLFKELDKNGDGEVSYEEF\n>sequence_id_2\r\nDKDKD";

bioInformaticsHub.setFastaSequences(inputSequence); 
```
Now, the bioinformaticsHub setup is completed, and user can use bioinformaticsHub to retrieve sequence Ids , sequences, or retrieve these sequences as a javascript object. User can also use bioinformaticsHub to perform sequence analysis, such as predicting motifs in these sequences.

User can retrieve all sequence Ids of the stored sequences using the code below:
```
const sequenceIdArray = bioInformaticsHub.getAllSequenceIds();
console.log(sequenceIdArray); 
// Console output: [ 'sequence_id_1', 'sequence_id_2' ]
```

User can retrieve a specifc sequence by a sequence Id using the code below:
```
const sequence1 = bioInformaticsHub.getSequenceById("sequence_id_1"); 
console.log(sequence1); 
// Console output: SLLKASSTLDNLFKELDKNGDGEVSYEEFF

const sequence2 = bioInformaticsHub.getSequenceById("sequence_id_2"); 
console.log(sequence2); 
// console output: DKDKD
```

User can retrive all sequences with Ids as a javascript object using the code below:
```
const sequencesWithIds = bioInformaticsHub.getAllSequencesWithIds(); 
console.log(sequencesWithIds); 
```
console output:
``` 
{ 
  sequence_id_1: 'SLLKASSTLDNLFKELDKNGDGEVSYEEF', 
  sequence_id_2: 'DKDKD' 
}
```
## Use NCBI Seqeuence Retriever (NcbiSeqRetriver) module
To Dos

## Predict motifs in protein or nucleotide sequences
This application can predict motifs in one or mutiple sequences using user defined pattern. User should define one or multiple patterns based on the pattern [syntax rules](#pattern-syntax). 

### Pattern syntax
- The standard IUPAC one letter code for the amino acids (for example: "P" stands Proline) and nucleotides code (for example: "C" stands for "cytosine") should be used to define a patten.
- "[]" with listed aminoacids or nucleotides letters means that the listed letters are allowed in this position. Charactor "," in between letters are **optional**. For example: [A,T,C] or [ATC] stands for "A" or "T" or "C" are allowed in this position. 
- "{}" with listed amino acids or nucleotides letters means that the listed letters are NOT allowed in this position. Charactor "," in between letters are **optional**. For example: {DE} or {D,E} means "D" or "E" should not be allowed in this position.
- The wildcard "x" means that any amino acid or nucleotide in this position is accepted.
- Each element in a pattern could be separated from its neighbor by a '-'. This is **optional**. For example, [A,T]-x-{C,A}, [A,T]x{C,A}, [AT]-x-{CA}, and [AT]x{CA} are identical patterns. 
- Repetition of an element in multiple continuous positions can be represented by following that element with a "(number of repeats)" or a "(minimum repeates, maximium repeates)".
  - Examples:
  - A(3) stands for AAA
  - T(2,5) stands TT, TTT, TTTT, or TTTTT.
- User should add a "^" or "<" to indicate that the pattern must started with N-terminal (or 5' terminal).
- User should add a "$" or ">" to indicate that the pattern must ended with C-terminal (or 3' terminal).

### Predict a single motif in a single sequence
The sample sequence for prediction: 
```
>seq1
SLLKASSTLDNLFKELDKNGDGEVSYEEF
```

The sample pattern for prediction:
```
[D]-x-[DNS]-{FLIVWY}-[DNESTG]
```

### General workflow for prediction: 
1. import "bioinformatics-hub" package.
2. create bioinformaticsHub object.
3. store sequences in the bioinformaticsHub object.
4. retrieve PredictionAssistant object.
5. set one or mutiple patterns.
6. call predict() method and the prediction results will be returned.

The example shown below demostrates the prediction workflow for predicting one user-defined motif (named "patternId_1") in one protein sequence (named "seq1").
```
const BioinformaticsHub = require("bioinformatics-hub");

const bioInformaticsHub = new BioinformaticsHub();
bioInformaticsHub.setFastaSequences(">seq1\nSLLKASSTLDNLFKELDKNGDGEVSYEEF"); // store sequences here
                 .getPredictionAssistant()
                 .setPatterns({"patternId_1": "[D]-x-[DNS]-{FLIVWY}-[DNESTG]"}) // store pattern here
                 .predict();
```
Execution of above code will find all matches of the given pattern(patternId_1) in the given sequence(seq1). The expected output is shown below:
```
[
  { 
    sequenceId: 'seq1',
    sequence: 'SLLKASSTLDNLFKELDKNGDGEVSYEEF', 
    contained_motifs: [ 'patternId_1' ],    // Indicate which motifs are found in "seq1"
    motifs:
      { 
        patternId_1:     // the prediction result on "patternId_1"
          {
            pattern_signiture: '[D]-x-[DNS]-{FLIVWY}-[DNESTG]', 
            matched_sequences: 
              [ 
                { 
                  startIndex: 16, 
                  matched_sequence: 'DKNGD' 
                }
              ]
          }
      } 
  } 
]
```

## Handle comment lines, numbers, gaps, blanks, and comment lines in user-provided sequence string.
This application has build in functions to validate and clean up the input sequences. We handle each situation differently when `bioInformaticsHub.setFastaSequences(string);` method is called.
- Invalid input
  - The input string cannot be blank, empty, null or undefined.
  - Two sequences should not the identical sequence Id.
  - It is invalid if a sequence has a sequence id but sequence is blank. In the example shown below, sequence 1 is not valid as the sequence is blank.
  ```
  >sequence 1

  >sequence 2
  AAAATTTAAAATTT
  ```
  
- Invalid charactor
  
  Sequence Ids can contain any charactors. Sequences should only contain letters a-z, A-Z, "-" (gap) and * (termination). 

- Single sequence without a sequence Id

  A single sequence wihtout a sequence Id is a valid input sequence. This application will automatically add "Unamed sequence 1" as its sequence Id.

- The first sequence in multiple sequences do not have a sequence Id

  If the first sequence in multiple sequences do not have a sequence Id, this application will automatically add "Unnamed sequence 1" as its sequence Id.

- Numbers in sequences

  Numbers in sequences will be removed automatically.

- Blanks in sequences

  Blanks, such as \r\n,  in sequences will be removed automatically. Blank lines inside of a sequence will be removded as well.

- Comment lines

  Comment lines (started with ";") in a FASTA sequence will be removed automatically.

Based on above rules, "Sample sequence 3" and "Sample sequence 4" shown below will have the identical sequences when saved in BioinformaticsHub application.
```
>Sample sequence 3
; this is a comment line, will be removed by CommentLineRemover;
; Numbers and blanks in below sequence will also be removed 
AAACTCCTCTTTGATTCTTCTAG CTGTTTCACTATTGGGCAACCAGACACCAGAATGAGTACTAAAAAGT 12023423

CTCCTGAGGAACTGAAGAGGATTTTTG 55AAAAATATGCAGCCAAAGAAGGTGATCCAGACCAGTTGTCAAA

>Sample sequence 4
AAACTCCTCTTTGATTCTTCTAGCTGTTTCACTATTGGGCAACCAGACACCAGAATGAGTACTAAAAAGT
CTCCTGAGGAACTGAAGAGGATTTTTGAAAAATATGCAGCCAAAGAAGGTGATCCAGACCAGTTGTCAAA
```

## Version changes
- 1.2.0
  - Retrieve nucleotide or protein sequences in bacth by ACCESSION Ids from NCBI.
- 1.1.2
  - Update README.MD
- 1.1.1
  - Update README.MD 
- 1.1.0
  - Read multiple protein or nucleotide sequences.
  - Remove any numbers, blanks, and comment line (line start with ";") in each sequence.
  - Retrieve a specific sequence by squenceId.
  - Retrieve all sequence Ids.
  - Retrieve all sequences as javascript object indexed by sequence Ids.
  - Scan and predict protein/nucleotide motifs in multiple sequences provided by user in [FASTA](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp) format.

## For internal Bioinformatics-Hub developers
### High Level Design
![high level design](./design/image/high_level_design.png)
### Test
 [Jest](https://jestjs.io/docs/en/getting-started) is used to perfom all unit tests in this repository. Tests are written in the [test](./test) folder using the idential file structure in the .js files in the src folder. 
Use this command to run all the unit tests:
```
npm run test
``` 

**Note: Each commit in master branch must sure to have 0 test failure.**

### ESLint
We use [ESLint](https://eslint.org/docs/user-guide/getting-started) to enforce js format. ESLint rules is defined in [.eslintrc.json](./.eslintrc.json) file. 
Run this command to check js format issues: 
```
npm run lint
```
Run this command to check js format and auto-fix issues:
```
npm run lint-fix
```

