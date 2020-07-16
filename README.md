# Bioinformatics-Hub
This project is currently under development ...

## How to this this package?
### Basic usage example
To do ...
### Handle mulitple FASTA sequences
https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp
To do ...
### Handle invalid input
- invalid data type
- invalid fasta sequences
- invalid charactor
- numbers inside of a string

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

