const axios = require("axios");

class NCBIRetriever {
  constructor () {
    this.baseUrl = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi";
    this.nucleotideDB = "nuccore";
    this.proteinDB = "protein";
  }

  async retrieveNucleotideSequences (ids, api_key) {
    const outputString = await this.retrieveNCBISequences(this.nucleotideDB, ids, api_key);
    return outputString;
  }

  async retrieveProteinSequences (ids, api_key) {
    const outputString = await this.retrieveNCBISequences(this.proteinDB, ids, api_key);
    return outputString;
  }

  validateIds(ids) {
    if (!Array.isArray(ids)) {
      throw new Error ("Input Ids are not in an array.");
    }
    if (ids.length === 0) {
      throw new Error ("No Ids. User should put at least one Id in the input array");
    } 
    const set = new Set(ids);
    if (set.size > 200) {
      throw new Error ("Too many Ids. The maxium number of ids should be less than 100.");
    }
  }

  async retrieveNCBISequences(db, ids, api_key) {
    this.validateIds(ids);
    const set = new Set(ids);
    const idString = Array.from(set).join(",");
    // http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=' + DNAId + '&rettype=fasta&retmode=text' + 'api_key=' + api_key
    let url = this.baseUrl + "?db=" + db + "&id=" + idString + "&rettype=fasta&retmode=text";
    if (api_key) {
      url = url + "api_key=" + api_key; 
    }

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error("Retrieve sequence failed: "+ error);
    }
  }
}

module.exports = NCBIRetriever;