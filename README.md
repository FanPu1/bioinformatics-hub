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

#### Sample sequences in this demo: 
```
>sequence_id_1
SLLKASSTLDNLFKELDKNGDGEVSYEEF
>sequence_id_2
DKDKD
```
#### Setup bioinformaticsHub object
Import "bioinformatics-hub" package and create a bioinformaticsHub object:
```
const BioinformaticsHub = require("bioinformatics-hub");
const bioInformaticsHub = new BioinformaticsHub("protein"); // input can be "DNA", "RNA", "protein", "pdb"
```
Save the sequences into bioinformaticsHub object:
```
const inputSequence = ">sequence_id_1\nSLLKASSTLDNLFKELDKNGDGEVSYEEF\n>sequence_id_2\r\n DKDKD";
bioInformaticsHub.setFastaSequences(inputSequence); 
```
Now, bioinformaticsHub setup is ready and user can use bioinformaticsHub to retrieve sequence Ids and sequences and perform sequence analysis, such as predicting motifs in these sequences.

#### Retrieve all sequence Ids of input sequence: 
```
const sequenceIdArray = bioInformaticsHub.getAllSequenceIds();
console.log(sequenceIdArray); // [ 'sequence_id_1', 'sequence_id_2' ]
```
#### Retrieve a specifc sequence by sequence Id:
```
const sequence1 = bioInformaticsHub.getSequenceById("sequence_id_1"); 
console.log(sequence1); // "SLLKASSTLDNLFKELDKNGDGEVSYEEFF"
const sequence2 = bioInformaticsHub.getSequenceById("sequence_id_2"); 
console.log(sequence2); // "DKDKD"
```
#### Retrive all sequences with Ids from the input sequence and return as a javascript object:
```
const sequencesWithIds = bioInformaticsHub.getAllSequencesWithIds(); 
console.log(sequencesWithIds); // outout is shown in the next line.
// { sequence_id_1: 'SLLKASSTLDNLFKELDKNGDGEVSYEEF', sequence_id_2: 'DKDKD' }
```
#### Read a single DNA or nucleotide sequence 

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

