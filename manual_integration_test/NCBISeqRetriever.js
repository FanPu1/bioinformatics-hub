/* eslint-disable no-unused-vars */

/**
 * Test the following work flow:
 * 1. user retreives DNA or protein sequence from NCBI and stored as string.
 * 2. this sequence is saved in BioinformaticsApp
 * 3. user can then use bioinformaticsApp to retrieve information of these sequeces and perform analysis.
 */
const {ncbiSequenceRetriever} = require("./../modules");
const retriever = ncbiSequenceRetriever;
const BioinformaticsApp = require("../index");

const nucleotidesIds = ["M65068.1"];
const proteinids = ["AAA49004.1","AAK64208.1","NP_033918.1","NP_033919.1"];

// test retrieve all protein Ids, happy flow
// retriever.retrieveProteinSequences(proteinids).then(console.log);

// test retireve a single DND Id, happy flow
// retriever.retrieveNucleotideSequences(nucleotidesIds).then(console.log);

// test when at least one id is valid, retriever returns the valid fasta sequences, invlid ids will be ignored
// nucleotidesIds.push("badId");
// retriever.retrieveNucleotideSequences(nucleotidesIds).then(console.log);
// proteinids.push("bad,bad");
// retriever.retrieveProteinSequences(proteinids).then(console.log);

// test when input id is undefined error is thrown
// retriever.retrieveProteinSequences().then(console.log);

// test when input id array is empty, expection is thrown
// retriever.retrieveNucleotideSequences([]).then(console.log);

// test user also include an api_key
// retriever.retrieveNucleotideSequences(nucleotidesIds, "FAKE API key").then(console.log);

// test async in a method
/*
const f = async () => {
  await retriever.retrieveNucleotideSequences(nucleotidesIds).then(console.log);
  console.log("this should come back later");
}
f(retriever);
*/

// test BioinformaticsAPP works with NCBIRetriever

async function getSequenceById() {
  const fastaString = await retriever.retrieveProteinSequences(proteinids);
  const app = new BioinformaticsApp();
  const output= app.setDataType("protein").setFastaSequences(fastaString).getSequenceById("NP_033919.1 protein S100-G [Mus musculus]");
  console.log(fastaString);
  console.log(output);
}

getSequenceById();

