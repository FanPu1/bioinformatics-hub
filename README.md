# Bioinformatics-Hub
Bioinformatics-Hub is an open source bioinformatics package for retrieving, processing and analyzing the sequences and structures of biomolecules, such as proteins, and nucleotides.
 
At current stage, this package can retrieve protein and nucleotide sequences from NCBI, analyze protein and nucleotide sequences, and predict motifs in proteins and nucleotides. Sequences are primarily handled as a single string in [FASTA](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp) format or as a javascript object. 

We will add protein structure retrieval and analysis modules in the future.

## Bioinformatics-Hub demo site
This website is created using Bioinformatics-Hub package: https://bioinformatics-hub.vercel.app/

## Outline
- [Installation](#installation)
- [Handle user provided sequences](#handle-user-provided-sequences)
  - [Setup bioinformaticsHub object](#setup-bioinformaticshub-object)
  - [Set/store sequences in BioinformaticsHub application](#step-2-store-user-provided-sequences-into-bioinformaticshub-object)
  - Get all sequence Ids
  - Get sequence by Id
  - Get all sequences with Ids as a key in to Javascript object
  - [Handle invalid input, blanks, numbers, unsupported characters in user-provided sequences](#handle-comment-lines-numbers-gaps-blanks-and-comment-lines-in-user-provided-sequence-string)
- [Use NCBI Sequence Retriever (ncbiSeqRetriever) module](#use-ncbi-sequence-retriever-ncbiseqretriever-module)
  - [Retrieve protein sequences from NCBI](#fetch-protein-sequences-from-ncbi)
  - [Retrieve nucleotide sequences from NCBI](#fetch-nucleotide-sequences)
- [Predict/scan motifs in protein/nucleotides sequences](#predict-motifs-in-protein-or-nucleotide-sequences-with-user-provided-sequences)
  - [Pattern syntax](#pattern-syntax)
  - [Predict motifs in user-provided sequences](#predict-motifs-in-protein-or-nucleotide-sequences-with-user-provided-sequences)
  - [Predict motifs in sequences with given NCBI ACCESSION Ids](#predict-motifs-in-protein-or-nucleotide-sequences-based-on-ncbi-accession-ids)
- [Routine bioinformatics tools for protein/nucleotide sequences](#routine-bioinformatics-tools-for-proteinnucleotide-sequences)
  - [Check if the nucleotide or protein sequences contains invalid characters](#check-if-the-nucleotide-or-protein-sequences-contains-invalid-characters)
  - [Get reverse complementary sequences](#get-reverse-complementary-sequences)
  - Restriction sites detector (under development)
  - [Translate DNA/RNA sequences to protein sequences](#translate-dnarna-sequences-to-protein-sequences)
- PDB module: retrieve and analyze protein structures (future task)
  - Retrieve protein structure from protein data bank (future task)
  - Retrieve information from protein structure (future task)

## Installation
Running this package requires [nodeJS](https://nodejs.org/en/) environment. Run the below commend to install this package into your javascript project.
```
npm install --save bioinformatics-hub  
```
## Handle user-provided sequences
### Setup bioinformaticsHub object
* Step 1: Import "bioinformatics-hub" package and create a bioinformaticsHub object.
  ```js
  const BioinformaticsHub = require("bioinformatics-hub");
  const bioInformaticsHub = new BioinformaticsHub();
  ```

* Step 2: Store user-provided sequences into bioinformaticsHub object. 

  This application can store one sequence or multiple sequences provided by user. The sequences should be provided as a single string in [FASTA format](https://en.wikipedia.org/wiki/FASTA_format).
  However, if user wants to store only one sequence for analysis, then the sequence id (started with ">" in FASTA format) is optional.
  This application will automatically provide a sequence Id as "Unnamed sequence 1", if the only sequence does not have a sequence Id.

  Here is an example on how to store two sequences in to this application.
  ```
  >sequence_id_1
  SLLKASSTLDNLFKELDKNGDGEVSYEEF
  >sequence_id_2
  DKDKD
  ```
  These two sequences can be stored in this application as shown below.
  ```js
  const inputSequence = ">sequence_id_1\nSLLKASSTLDNLFKELDKNGDGEVSYEEF\n>sequence_id_2\r\nDKDKD";

  bioInformaticsHub.setFastaSequences(inputSequence); 
  ```
  Now, the bioinformaticsHub setup is completed, and user can use bioinformaticsHub to retrieve sequence Ids , sequences, or retrieve these sequences as a javascript object. User can also use bioinformaticsHub to perform sequence analysis, such as predicting motifs in these sequences.

  * Retrieve all sequence Ids of the stored sequences using the code below:
    ```js
    const sequenceIdArray = bioInformaticsHub.getAllSequenceIds();
    console.log(sequenceIdArray); 
    // Console output: [ 'sequence_id_1', 'sequence_id_2' ]
    ```

  * Retrieve a specific sequence by a sequence Id using the code below:
    ```js
    const sequence1 = bioInformaticsHub.getSequenceById("sequence_id_1"); 
    console.log(sequence1); 
    // Console output: SLLKASSTLDNLFKELDKNGDGEVSYEEFF

    const sequence2 = bioInformaticsHub.getSequenceById("sequence_id_2"); 
    console.log(sequence2); 
    // console output: DKDKD
    ```

  * Retrieve all sequences with Ids as a javascript object using the code below:
    ```js
    const sequencesWithIds = bioInformaticsHub.getAllSequencesWithIds(); 
    console.log(sequencesWithIds); 
    ```
    console output:
    ```js
    { 
      sequence_id_1: 'SLLKASSTLDNLFKELDKNGDGEVSYEEF', 
      sequence_id_2: 'DKDKD' 
    }
    ```
## Use NCBI Sequence Retriever (ncbiSeqRetriever) module
NCBI Sequence Retriever (ncbiRetriever module) is a light-weighted javascript module to fetch nucleotide or protein sequences from NCBI databases. This module is a simplified wrapper for [EFetch utility of NCBI E-utilities API](https://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.EFetch). 

NCBI Sequence Retriever module can fetch up to **100** protein sequences or up to **10 short** nucleotide sequences in one sequence retrieve call. We strongly recommend that the length of each nucleotide sequence for query should be less than *100,000* bp.

The retrieved sequences can be returned as a string in FASTA format, or be returned as a javascript object.

NCBI Sequence Retriever is also a stand alone npm package, named ["ncbi-sequence-retriever"](https://www.npmjs.com/package/ncbi-sequence-retriever).

### Fetch **protein** sequences from NCBI
Here are examples to fetch multiple protein sequences from [NCBI protein database](https://www.ncbi.nlm.nih.gov/protein/) with user-provided ACCESSION Ids.

* Return a string representative of sequences in FASTA format 
  ```js
  const {ncbiSequenceRetriever} = require ("bioinformatics-hub/modules");

  const proteinIds = ["AAA49004.1","AAK64208.1"];  // add up to 100 accession Ids in this array
  ncbiSequenceRetriever.retrieveProteinSequences(proteinIds).then((sequences)=>{
    console.log(sequences);
  });
  ```
  The output from above code: 
  ```js
  >AAA49004.1 parvalbumin, partial [Gallus gallus]
  FIEEDELKFVLKGFTPDGRDLSDKETKALLAAGDKDGDGKIGVEK

  >AAK64208.1 calbindin D9k [Mus musculus]
  MCAEKSPAEMKSIFQKYAAKEGDPDQLSKEELKLLIQSEFPSLLKASSTLDNLFKELDKNGDGEVSYEEF
  EAFFKKLSQ
  ```
* Return sequences as a javascript object
  ```js
  const {ncbiSequenceRetriever} = require ("bioinformatics-hub/modules");

  const proteinIds = ["AAA49004.1","AAK64208.1"];  // add up to 100 accession Ids in this array
  ncbiSequenceRetriever.retrieveProteinSequences(proteinIds, "JSON").then((sequences)=>{
    console.log(sequences);
  });
  ```
  The output from above code: 
  ```js
  { 'AAA49004.1 parvalbumin, partial [Gallus gallus]': 
      'FIEEDELKFVLKGFTPDGRDLSDKETKALLAAGDKDGDGKIGVEK',
    'AAK64208.1 calbindin D9k [Mus musculus]':
      'MCAEKSPAEMKSIFQKYAAKEGDPDQLSKEELKLLIQSEFPSLLKASSTLDNLFKELDKNGDGEVSYEEFEAFFKKLSQ' 
  }
  ```

### Fetch **nucleotide** sequences
Here are examples to fetch one mRNA sequence from [NCBI nucleotide database](https://www.ncbi.nlm.nih.gov/nuccore/) with user-provided ACCESSION Ids:

* Return a string representative of sequences in FASTA format 
  ```js
  const {ncbiSequenceRetriever} = require ("bioinformatics-hub/modules");

  const nucleotidesIds = ["M65068.1"];  // add up to 10 accession Ids in this array
  ncbiSequenceRetriever.retrieveNucleotideSequences(nucleotidesIds).then((sequences)=>{
    console.log(sequences);
  });
  ```
  The output from above code: 
  ```
  >M65068.1 Chicken parvalbumin mRNA, partial cds
  TTTATTGAGGAGGATGAGCTAAAGTTTGTACTGAAGGGCTTTACCCCAGATGGCAGAGACCTATCAGACA
  AAGAGACAAAGGCTCTTCTGGCTGCTGGAGATAAGGACGGTGATGGCAAAATCGGCGTGGAAAAA
  ```
* Return sequences as a javascript object
  ```js
  const {ncbiSequenceRetriever} = require ("bioinformatics-hub/modules");

  const nucleotidesIds = ["M65068.1"];  // add up to 10 accession Ids in this array
  ncbiSequenceRetriever.retrieveNucleotideSequences(nucleotidesIds, "JSON").then((sequences)=>{
    console.log(sequences);
  });
  ```
  The output from above code: 
  ```js
  {
    'M65068.1 Chicken parvalbumin mRNA, partial cds': 
      'TTTATTGAGGAGGATGAGCTAAAGTTTGTACTGAAGGGCTTTACCCCAGATGGCAGAGACCTATCAGACAAAGAGACAAAGGCTCTTCTGGCTGCTGGAGATAAGGACGGTGATGGCAAAATCGGCGTGGAAAAA' 
  }
  ```
### Optional API key
`retrieveNucleotideSequences()` and `retrieveProteinSequences()` methods in `ncbiSequenceRetriever` can take a string API key as the third input parameter. This is *optional*. This parameter is set to be undefined by default. Adding an valid API key as the third input parameter to these methods can increase the number of sequence retrieve calls from 3 calls per second to 10 calls per second from one Ip address.

*On December 1, 2018, NCBI will begin enforcing the use of API keys that will offer enhanced levels of supported access to the E-utilities. After that date, any site (IP address) posting more than 3 requests per second to the E-utilities without an API key will receive an error message. By including an API key, a site can post up to 10 requests per second by default.* More rules about API key can be found in this link: https://www.ncbi.nlm.nih.gov/books/NBK25497/#chapter2.Coming_in_December_2018_API_Key

Sample code with API key as the third input argument:
```js
const {ncbiSequenceRetriever} = require ("bioinformatics-hub/modules");

const nucleotidesIds = ["M65068.1"];  
const apiKey = "fake_api_key";  // if you have a valid API key, set up in this line.
ncbiSequenceRetriever.retrieveNucleotideSequences(nucleotidesIds, "JSON", apiKey).then((sequences)=>{
  console.log(sequences);
});
```

## Predict motifs in protein or nucleotide sequences with user-provided sequences
This application can predict motifs in one or multiple sequences using user defined pattern. User should define one or multiple patterns based on the pattern [syntax rules](#pattern-syntax). 

### Pattern syntax
- The standard IUPAC one letter code for the amino acids (for example: "P" stands Proline) and nucleotides code (for example: "C" stands for "cytosine") should be used to define a patten.
- "[]" with listed amino acids or nucleotides letters means that the listed letters are allowed in this position. Character "," in between letters are **optional**. For example: [A,T,C] or [ATC] stands for "A" or "T" or "C" are allowed in this position. 
- "{}" with listed amino acids or nucleotides letters means that the listed letters are NOT allowed in this position. Character "," in between letters are **optional**. For example: {DE} or {D,E} means "D" or "E" should not be allowed in this position.
- The wildcard "x" means that any amino acid or nucleotide in this position is accepted.
- Each element in a pattern could be separated from its neighbor by a '-'. This is **optional**. For example, [A,T]-x-{C,A}, [A,T]x{C,A}, [AT]-x-{CA}, and [AT]x{CA} are identical patterns. 
- Repetition of an element in multiple continuous positions can be represented by following that element with a "(number of repeats)" or a "(minimum repeats, maximum repeats)".
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
5. set one or multiple patterns.
6. call predict() method and the prediction results will be returned.

The example shown below demonstrates the prediction workflow for predicting one user-defined motif (named "patternId_1") in one protein sequence (named "seq1").
```js
const BioinformaticsHub = require("bioinformatics-hub");

const bioInformaticsHub = new BioinformaticsHub();
bioInformaticsHub.setFastaSequences(">seq1\nSLLKASSTLDNLFKELDKNGDGEVSYEEF") // store sequences here
                 .getPredictionAssistant()
                 .setPatterns({"patternId_1": "[D]-x-[DNS]-{FLIVWY}-[DNESTG]"}) // store pattern here
                 .predict();
```
Execution of above code will find all matches of the given pattern(patternId_1) in the given sequence(seq1). The expected output is shown below:
```js
[
  { 
    sequenceId: 'seq1',
    sequence: 'SLLKASSTLDNLFKELDKNGDGEVSYEEF', 
    contained_motifs: [ 'patternId_1' ],    // Indicate which motifs are found in "seq1"
    motifs:
      { 
        patternId_1:     // the prediction result on "patternId_1"
          {
            pattern_signature: '[D]-x-[DNS]-{FLIVWY}-[DNESTG]', 
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
### Predict motifs in protein or nucleotide sequences based on NCBI ACCESSION ids
The ncbiMotifScanner module in BioinformaticsHub can predict/scan motifs on sequences if user provides the NCBI ACCESSION ids and patterns.
* Scan/predict protein sequences based on NCBI accession ids
  ```js
  const {ncbiMotifScanner} = require("bioinformatics-hub/modules");

  const sequenceIdArray = ["CAA44792.1", "EEB16923.1"];
  const patterns = {
    "EF-Hand": "[DNS]x[DNS]{FLIVWY}[DNESTG][DNQGHRK]{GP}[LIVMC][DENQSTAGC]x(2)[ED]",
    "zinc finger": "[C]x(2,5)[C]x(12,13)[H]x(2,5)[H]"
  };

  ncbiMotifScanner.scanProteinMotifsWithNcbiIds(sequenceIdArray, patterns).then((value) =>{
    // print the whole output object
    console.log(value);
  });
  ```

* Scan/predict nucleotide sequences based on NCBI accession ids
  ```js
  const {ncbiMotifScanner} = require("bioinformatics-hub/modules");

  const sequenceIdArray = ["NM_009788.4"];
  const patterns = {
    "pattern_1": "[A,T]x[C,G]x{A}[G]x(2,5)[C,G]"
  };

  ncbiMotifScanner.scanNucleotideMotifsWithNcbiIds(sequenceIdArray, patterns).then((value) =>{
    // print the whole output object
    console.log(value);
  });
  ```

### Optional API key
`ncbiMotifScanner.scanProteinMotifsWithNcbiIds()` and `ncbiMotifScanner.scanNucleotideMotifsWithNcbiIds()` methods can take the third input parameter, apiKey. You can read more about API key in [NCBI Sequence Retriever](#optional-api-key) session.

## Handle comment lines, numbers, gaps, blanks, and comment lines in user-provided sequence string.
This application has build in functions to validate and clean up the input sequences. We handle each situation differently when `bioInformaticsHub.setFastaSequences(string);` method is called.
- Invalid input
  - The input string cannot be blank, empty, null or undefined.
  - Two sequences should not the identical sequence Id.
  - Sequence Ids can contain any characters. Sequences should only contain letters a-z, A-Z, "-" (optional, stands for gap) and * (optional, stands for termination). 
  - It is invalid if a sequence has a sequence id but sequence is blank. In the example shown below, sequence 1 is not valid as the sequence is blank.
  ```
  >sequence 1

  >sequence 2
  AAAATTTAAAATTT
  ```

- Single sequence without a sequence Id

  A single sequence without a sequence Id is a valid input sequence. This application will automatically add "Unnamed sequence 1" as its sequence Id.

- The first sequence in multiple sequences do not have a sequence Id

  If the first sequence in multiple sequences do not have a sequence Id, this application will automatically add "Unnamed sequence 1" as its sequence Id.

- Numbers in sequences

  Numbers in sequences will be removed automatically.

- Blanks in sequences

  Blanks, such as \r\n,  in sequences will be removed automatically. Blank lines inside of a sequence will be removed as well.

- Comment lines

  Comment lines (started with ";") in a FASTA sequence will be removed automatically.

Based on above rules, "Sample sequence 3" and "Sample sequence 4" shown below will have the identical sequences when saved in BioinformaticsHub application.
```js
>Sample sequence 3
; this is a comment line, will be removed by CommentLineRemover;
; Numbers and blanks in below sequence will also be removed 
AAACTCCTCTTTGATTCTTCTAG CTGTTTCACTATTGGGCAACCAGACACCAGAATGAGTACTAAAAAGT 12023423

CTCCTGAGGAACTGAAGAGGATTTTTG 55AAAAATATGCAGCCAAAGAAGGTGATCCAGACCAGTTGTCAAA

>Sample sequence 4
AAACTCCTCTTTGATTCTTCTAGCTGTTTCACTATTGGGCAACCAGACACCAGAATGAGTACTAAAAAGT
CTCCTGAGGAACTGAAGAGGATTTTTGAAAAATATGCAGCCAAAGAAGGTGATCCAGACCAGTTGTCAAA
```

## Routine bioinformatics tools for protein/nucleotide sequences
Bioinformatics-hub contains a few methods (tools) which can be used for the routine sequence manipulation and analysis.
### Check if the nucleotide or protein sequences contains invalid characters
Here is a demo on how to use Bioinformatics-hub to check if the input protein sequences or nucleotide sequences contain invalid letters.

Valid letters in protein sequence include "*", "-", "X", and all single letter symbol of amino acids. Letters can be upper case or lower case.

Valid letters in protein sequence include "*", "-", "X", "N", "A", "T", "C", "G", and "U". Letters can be upper case or lower case.
- Check if **protein** sequences contains invalid letters
  ```js
  // input FASTA sequences
  >seq1
  DKD GNGY
  >seq2
  BBCKKK
  ```
  ```js
  const BioinformaticsHub = require("bioinformatics-hub");
  const bioinformaticsHub = new BioinformaticsHub();

  const proteinSequences = ">seq1\nDKD GNGY\n>seq2\nBBCKKK";
  const output = bioinformaticsHub.setFastaSequences(proteinSequences)
                                  .getProteinSequenceAssistant()
                                  .containsInvalidCharacters();
  console.log(output);
  // console output: { seq1: false, seq2: true }
  ```
- Check if **nucleotide** sequences contains invalid letters
  ```js
  // input sequences in FASTA format
  >seq1
  AAAATTTAAAAA
  >seq2
  BBAATTCCGGTCA
  ```
  ```js
  const BioinformaticsHub = require("bioinformatics-hub");
  const bioinformaticsHub = new BioinformaticsHub();

  const dnaSequences = ">seq1\nAAAATTTAAAAA \n>seq2\nBBAATTCCGGTCA";
  const output = bioinformaticsHub.setFastaSequences(dnaSequences)
                                  .getNucleotideSequenceAssistant()
                                  .containsInvalidCharacters();
  console.log(output);
  // console output: { seq1: false, seq2: true }
  ```

### Get reverse complementary sequences
Bioinformatics-hub has methods to get reverse, complementary, and reverse complementary sequences from multiple input sequences in FASTA format. An error will throw when get complementary, reverse-complementary sequences if any of the input sequences contains invalid letters. Only the following letters are considered as valid letters for a nucleotide sequence: "*", "-", "X", "N", "A", "T", "C", "G", and "U". Letters can be upper case or lower case. 
```js
// input sequence in FASTA format
>seq1
AAAAUTTGCNN
```
```js
const BioinformaticsHub = require("bioinformatics-hub");
const bioinformaticsHub = new BioinformaticsHub();

const dnaSequences = ">seq1\nAAAAUTTGCNN";

let output = bioinformaticsHub.setFastaSequences(dnaSequences) // same sequence only need to set once
                              .getNucleotideSequenceAssistant()
                              .getReverseSequences();
console.log(output);
// console output: { seq1: 'NNCGTTUAAAA' }

output = bioinformaticsHub.getNucleotideSequenceAssistant()
                          .getComplementarySequences();
console.log(output);
// console output: { seq1: 'TTTTAAACGNN' }

output = bioinformaticsHub.getNucleotideSequenceAssistant()
                          .getReverseComplementarySequences();
console.log(output);
// console output: { seq1: 'NNGCAAATTTT' }
```

### Translate DNA/RNA sequences to protein sequences
Bioinformatics-hub can be used to get used to translate multiple DNA/RNA sequences into protein sequences. Each nucleotide sequence will produce 6 proteins sequences. Three protein sequences are translated from 5' terminal and three protein sequences are translated from 3' terminal (reverse complementary sequence). An error will throw when using translateToProtein() method if any of the input sequences contains invalid letters. Only the following letters are considered as valid letters for a nucleotide sequence: "*", "-", "X", "N", "A", "T", "C", "G", and "U". Letters can be upper case or lower case.
```js
// input sequences in FASTA format
>seq1
AAAAUTTGCNN
>seq2
xxxxxxactatgaattattttgagcataacggtgtattaatgaaatattttc
```
```js
const BioinformaticsHub = require("bioinformatics-hub");
const bioinformaticsHub = new BioinformaticsHub();

const dnaSequences = ">seq1\nAAAAUTTGCNN\n>seq2\nxxxxxxactatgaattattttgagcataacggtgtattaatgaaatattttc";
let output = bioinformaticsHub.setFastaSequences(dnaSequences)
                              .getNucleotideSequenceAssistant()
                              .translateToProtein();
console.log(output);
// console output:
{ seq1:
   { '5\' to 3\' Frame 1': 'KIC',
     '5\' to 3\' Frame 2': 'KFA',
     '5\' to 3\' Frame 3': 'NLX',
     '3\' to 5\' Frame 1': 'XQI',
     '3\' to 5\' Frame 2': 'XKF',
     '3\' to 5\' Frame 3': 'ANF' },
  seq2:
   { '5\' to 3\' Frame 1': 'XXTMNYFEHNGVLMKYF',
     '5\' to 3\' Frame 2': 'XXL-IILSITVY--NIF',
     '5\' to 3\' Frame 3': 'XXYELF-A-RCINEIF',
     '3\' to 5\' Frame 1': 'ENISLIHRYAQNNS-XX',
     '3\' to 5\' Frame 2': 'KIFH-YTVMLKIIHSXX',
     '3\' to 5\' Frame 3': 'KYFINTPLCSK-FIXX' } }
```

## Version changes
- 1.4.1
  - Bug fix.
  - Update README.md
  - **New feature:** Added method to translate nucleotide sequences to protein sequences. 
  - **New feature:** Check if nucleotide or protein sequences contain invalid characters.
  - **New feature:** get reverse, complementary, and reverse complementary sequences.
- 1.3.4
  - Fixed a bug related with making request using http instead of https by update ncbi-sequence-retriever version.
- 1.3.3
  - Fixed a bug related with an error when using react by updating ncbi-sequence-retriever version.
- 1.3.2
  - Fixed a bug related with an error when using react.
- 1.3.1
  - bug fix.
- 1.3.0
  - **New Feature:** Given an array of ACCESSION ids from NCBI protein or nucleotide databases, ncbiMotifScanner module can predict/sca motifs in these sequences.
- 1.2.0
  - **New feature:** Retrieve nucleotide or protein sequences in batch by ACCESSION Ids from NCBI.
- 1.1.2
  - Updated README.MD
- 1.1.1
  - Updated README.MD
- 1.1.0
  - Read multiple protein or nucleotide sequences.
  - Remove any numbers, blanks, and comment line (line start with ";") in each sequence.
  - Retrieve a specific sequence by sequenceId.
  - Retrieve all sequence Ids.
  - Retrieve all sequences as javascript object indexed by sequence Ids.
  - Scan and predict protein/nucleotide motifs in multiple sequences provided by user in [FASTA](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp) format.

## For internal Bioinformatics-Hub developers
### Test
 [Jest](https://jestjs.io/docs/en/getting-started) is used to perform all unit tests in this repository. Tests are written in the [test](./test) folder using the identical file structure in the .js files in the src folder. 
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

