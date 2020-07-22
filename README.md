# Bioinformatics-Hub
This is an open source project used for protein and nucleotide analysis and prediction. At the current stage, this package can perform analysis and prediction based on mutiple protein or nucleotide sequences in [FASTA](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp) format. We will add pdb analysis in the future.

In version 1.x.x, this application can: 
- Read multiple protein or nucleotide sequences.
- Remove any numbers, blanks, and comment line (line start with ";") in each sequence.
- Retrieve a specific sequence by squenceId.
- Retrieve all sequence Ids.
- Retrieve all sequences as javascript object indexed by sequence Ids.
- Scan and predict protein/nucleotide motifs in multiple sequences provided by user in [FASTA](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp) format.

## How to use this package
### Installation
Running this package requires [nodeJS](https://nodejs.org/en/) environment. Run the below commend to install this package into your project.
```
npm install --save bioinformatics-hub
```
### Basic usage example

Sample sequences for this demo: 
```
>sequence_id_1
SLLKASSTLDNLFKELDKNGDGEVSYEEF
>sequence_id_2
DKDKD
```
This application can handle 1 sequence or mutiple sequences.
#### Setup bioinformaticsHub object
##### Step 1: import "bioinformatics-hub" package and create a bioinformaticsHub object.
```
const BioinformaticsHub = require("bioinformatics-hub");
const bioInformaticsHub = new BioinformaticsHub("protein"); // allowed input: "DNA", "RNA", "protein", "pdb".
```
##### Step 2: set the sequences into bioinformaticsHub object. 
These sequences should be stored in a string with FASTA format. This application do not have a specific requirement on how many charcters in each line. If you only have 1 squence, then the squence id (started with ">") is optional.
```
const inputSequence = ">sequence_id_1\nSLLKASSTLDNLFKELDKNGDGEVSYEEF\n>sequence_id_2\r\n DKDKD";
bioInformaticsHub.setFastaSequences(inputSequence); 
```
Now, bioinformaticsHub setup is completed and user can use bioinformaticsHub to retrieve sequence Ids and sequences. User can also use bioinformaticsHub perform sequence analysis, such as predicting motifs in these sequences.

##### Retrieve all sequence Ids of input sequence: 
```
const sequenceIdArray = bioInformaticsHub.getAllSequenceIds();
console.log(sequenceIdArray); 
// Console output: [ 'sequence_id_1', 'sequence_id_2' ]
```
##### Retrieve a specifc sequence by sequence Id:
```
const sequence1 = bioInformaticsHub.getSequenceById("sequence_id_1"); 
console.log(sequence1); 
// Console output: SLLKASSTLDNLFKELDKNGDGEVSYEEFF
const sequence2 = bioInformaticsHub.getSequenceById("sequence_id_2"); 
console.log(sequence2); 
// console output: DKDKD
```
##### Retrive all sequences with Ids from the input sequence and return as a javascript object:
```
const sequencesWithIds = bioInformaticsHub.getAllSequencesWithIds(); 
console.log(sequencesWithIds); 
// Console output: 
// { 
//    sequence_id_1: 'SLLKASSTLDNLFKELDKNGDGEVSYEEF', 
//    sequence_id_2: 'DKDKD' 
// }
```
### Predict motifs in protein or nucleotide sequences
This application can predict one or multiple user-defined motifs in one or mutiple sequences.
#### Predict a single motif in a single sequence
Sample sequence in this demo: 
```
>seq1
SLLKASSTLDNLFKELDKNGDGEVSYEEF
```
The detailed pattern syntax can be found [here](./#pattern-syntax). Sample pattern in this demo:
```
[D]-x-[DNS]-{FLIVWY}-[DNESTG]
```

##### General workflow for prediction: 
1. import "bioinformatics-hub" package.
2. create bioinformaticsHub object.
3. set sequences in bioinformaticsHub object.
4. retrieve PredictionAssistant object.
5. set patterns used for prediction.
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
Execution of above code will produce the output shown below:
```
[
  { 
    sequenceId: 'seq1', // sequence Id
    sequence: 'SLLKASSTLDNLFKELDKNGDGEVSYEEF',    // The sequence used for preditions
    contained_motifs: [ 'patternId_1' ],    // Indicate which motif is found in this sequence
    motifs:
      { 
        patternId_1:     // the prediction result for patternId_1
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
#### Pattern syntax
The standard IUPAC one letter code for the amino acids and nucleotide code.
- [ ] with listed aminoacids or nucleotides letter means the listed letters are allowed in this position. ","in between letters are **optional**. For example: [A,T,C] or [ATC] stands for "A" or "T" or "C". 
- { } with listed amino acids or nucleotides letter means the listed letters are NOT allowed in this position. ","in between letters are **optional**. For example: {DE} or {D,E} means "D" or "E" should not be allowed in this position. ","in between letters are optional.
- The symbol "x" means that this position can be any amino acid or nucleotide is accepted.
- Each element in a pattern can be separated from its neighbor by a '-'. This is **optional**. For example, [A,T]-x-{C,A}, [A,T]x{C,A}, [AT]-x-{CA}, and [AT]x{CA} are identical patterns. 
- Repetition of an element in multiple continous positions can be represented by following that element with "(number of repeats)" or a range of values using "(minimum repeates, maximium repeates)".
  - Examples:
  - A(3) corresponds to AAA
  - T(2,5) corresponds to TT, TTT, TTTT, or TTTTT.
- User should add a "^" or "<" to indicate that the pattern must started with N-terminal (or 5' terminal).
- User should add a "$" or ">" to indicate that the pattern must ended with C-terminal (or 3' terminal).

#### Single sequence example

### Handle mulitple FASTA sequences
To be updated ...

### Prediction protein/nucleotide motifs
To be updated


https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp
### Handle invalid input
- invalid data type
- invalid fasta sequences
- invalid charactor
- numbers inside of a string

## Version changes
- 1.0.x
  - in progress.
- 1.0.0
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

