# Bioinformatics-Hub
This is an open source project used for protein and nucleotide analysis and prediction. At the current stage, this package can perform analysis and prediction based on mutiple protein or nucleotide sequences in [FASTA](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp) format. We will add pdb analysis in the future.

In version 1.1.x, this application can: 
- [Read multiple protein or nucleotide sequences as a single string](#step-2-set-up-the-sequences-into-bioinformaticshub-object),
- [Remove any numbers, blanks, and comment line (line start with ";") in each sequence](#handle-comment-line-numbers-gaps-blanks-and-comment-lines),
- [Retrieve a specific sequence by squenceId](#retrieve-a-specifc-sequence-by-sequence-id),
- [Retrieve all sequence Ids](#retrieve-all-sequence-ids-of-input-sequence),
- [Retrieve all sequences as javascript object indexed by sequence Ids](#retrive-all-sequences-with-ids-from-the-input-sequence-and-return-as-a-javascript-object),
- [Scan and predict user-defined protein/nucleotide motifs in multiple sequences](#predict-motifs-in-protein-or-nucleotide-sequences).

## Installation
Running this package requires [nodeJS](https://nodejs.org/en/) environment. Run the below commend to install this package into your project.
```
npm install --save bioinformatics-hub
```
## Basic usage examples

Sample sequences for this demo: 
```
>sequence_id_1
SLLKASSTLDNLFKELDKNGDGEVSYEEF
>sequence_id_2
DKDKD
```
This application can handle one sequence or mutiple sequences.
### Setup bioinformaticsHub object
##### Step 1: Import "bioinformatics-hub" package and create a bioinformaticsHub object.
```
const BioinformaticsHub = require("bioinformatics-hub");
const bioInformaticsHub = new BioinformaticsHub("protein"); // allowed input: "DNA", "RNA", "protein", "pdb".
```
##### Step 2: Set up the sequences into bioinformaticsHub object. 
These sequences should be stored in a string with FASTA format. This application do not have a specific requirement on how many charcters in each line. 

If you want to add one squence for analysis, then the squence id (started with ">" in FASTA format) is optional. If the only sequence does not have a sequence Id, then this application will automatically add sequence Id as "Unnamed sequence 1".

You acan set up the input sequences as shown below.
```
const inputSequence = ">sequence_id_1\nSLLKASSTLDNLFKELDKNGDGEVSYEEF\n>sequence_id_2\r\n DKDKD";

bioInformaticsHub.setFastaSequences(inputSequence); 
```
Now, the bioinformaticsHub setup is completed, and user can use bioinformaticsHub to retrieve sequence Ids and sequences. User can also use bioinformaticsHub to perform sequence analysis, such as predicting motifs in these sequences.

### Retrieve all sequence Ids of input sequence: 
```
const sequenceIdArray = bioInformaticsHub.getAllSequenceIds();
console.log(sequenceIdArray); 
// Console output: [ 'sequence_id_1', 'sequence_id_2' ]
```
### Retrieve a specifc sequence by sequence Id:
```
const sequence1 = bioInformaticsHub.getSequenceById("sequence_id_1"); 
console.log(sequence1); 
// Console output: SLLKASSTLDNLFKELDKNGDGEVSYEEFF

const sequence2 = bioInformaticsHub.getSequenceById("sequence_id_2"); 
console.log(sequence2); 
// console output: DKDKD
```
### Retrive all sequences with Ids from the input sequence and return as a javascript object:
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
## Predict motifs in protein or nucleotide sequences
This application can predict one or multiple user-defined motifs in one or mutiple sequences. User should define one or multiple patterns using the pattern syntax shown below. 

### Pattern syntax
- Use the standard IUPAC one letter code for the amino acids (for example: "P" stands Proline) and nucleotides code (for example: "C" stands for "cytosine").
- "[ ]" with listed aminoacids or nucleotides letters means that the listed letters are allowed in this position. ","in between letters are **optional**. For example: [A,T,C] or [ATC] stands for "A" or "T" or "C" are allowed in this position. 
- "{ }" with listed amino acids or nucleotides letters means the listed letters are NOT allowed in this position. ","in between letters are **optional**. For example: {DE} or {D,E} means "D" or "E" should not be allowed in this position.
- The wildcard "x" means that any amino acid or nucleotide in this position is accepted.
- Each element in a pattern could be separated from its neighbor by a '-'. This is **optional**. For example, [A,T]-x-{C,A}, [A,T]x{C,A}, [AT]-x-{CA}, and [AT]x{CA} are identical patterns. 
- Repetition of an element in multiple continuous positions can be represented by following that element with a "(number of repeats)" or a "(minimum repeates, maximium repeates)".
  - Examples:
  - A(3) stands for AAA
  - T(2,5) stands TT, TTT, TTTT, or TTTTT.
- User should add a "^" or "<" to indicate that the pattern must started with N-terminal (or 5' terminal).
- User should add a "$" or ">" to indicate that the pattern must ended with C-terminal (or 3' terminal).

### Predict a single motif in a single sequence
The sample sequence in this demo: 
```
>seq1
SLLKASSTLDNLFKELDKNGDGEVSYEEF
```
The detailed pattern syntax can be found [here](#pattern-syntax). The sample pattern in this demo:
```
[D]-x-[DNS]-{FLIVWY}-[DNESTG]
```

### General workflow for prediction: 
1. import "bioinformatics-hub" package.
2. create bioinformaticsHub object.
3. set sequences (one or multiple sequences in FASTA format) in bioinformaticsHub object.
4. retrieve PredictionAssistant object.
5. set one or mutiple patterns used for prediction.
6. call predict() method and the prediction results will be returned.

The example shown below demostrates the prediction workflow for predicting one user-defined motif (named "patternId_1") in one protein sequence (named "seq1").
```
const BioinformaticsHub = require("bioinformatics-hub");

const bioInformaticsHub = new BioinformaticsHub("protein") //Can be "DNA", "RNA", "Protein"
bioInformaticsHub.setFastaSequences(">seq1\nSLLKASSTLDNLFKELDKNGDGEVSYEEF");
                 .getPredictionAssistant()
                 .setPatterns({"patternId_1": "[D]-x-[DNS]-{FLIVWY}-[DNESTG]"})
                 .predict();
```
Execution of above code will check if the given sequence(seq1) match the given pattern(patternId_1), and produce the output as shown below:
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

### Accepted input patteren format
To be updated ... for bioInformaticsHub.setPatterns(......) method

## Handle comment line, numbers, gaps, blanks, and comment lines.
This application has build in functions to validate and clean up the input sequences in `bioInformaticsHub.setFastaSequences(string);` method. 
- Invalid input

  The input string cannot be blank, empty, null or undefined. It is invalid if a sequence has a sequence id but sequence is blank. In the example shown below, sequence 1 is not valid as the sequence is blank.
  ```
  >sequence 1

  >sequence 2
  AAAATTTAAAATTT
  ```
  It is invalid to have two sequences with the identical sequence Id.

- Invalid charactor
  
  The sequence Id can contain any charactors. The sequence should only contain letters a-z, A-Z, "-" (gap) and * (termination). 

- Single sequence without a sequence Id

  A single sequence wihtout a sequence Id is a valid input sequence. This application will automatically add "Unamed sequence 1" as its sequence Id.

- The first sequence in multiple sequences do not have a sequence Id

  If the first sequence in multiple sequences do not have a sequence Id, this application will automatically add "Unamed sequence 1" as its sequence Id.

- Numbers in sequences

  Numbers in sequences will be removed automatically.

- Blanks in sequences
  Blanks, such as \r\n, \n in sequences will be removed automatically. Blank lines inside of a sequence will be removded.

- Comment lines

  Comment lines (started with ";") in a FASTA sequence will be removed automatically.

Based on above rules, "Sample sequence 3" and "Sample sequence 4" shown below will have identical sequence when saved in BioinformaticsHub application.
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

