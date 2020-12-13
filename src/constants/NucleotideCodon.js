const nucleotideCodon = Object.freeze({
  GCT:"A", GCC:"A", GCA:"A", GCG:"A", GCN:"A",
  CGT:"R", CGC:"R", CGA:"R", CGG:"R", AGA:"R", AGG:"R",CGN:"R", MGR:"R",
  AAT:"N", AAC:"N", AAY:"N",
  GAT:"D", GAC:"D", GAY:"D",
  TGT:"C", TGC:"C", TGY:"C",
  CAA:"Q", CAG:"Q", CAR:"Q",
  GAA:"E", GAG:"E", GAR:"E",
  GGT:"G", GGC:"G", GGA:"G", GGG:"G", GGN:"G",
  CAT:"H", CAC:"H", CAY:"H",
  ATT:"I", ATC:"I", ATA:"I", ATH:"I",
  ATG:"M",
  TTA:"L", TTG:"L", CTT:"L", CTC:"L", CTA:"L", CTG:"L", YTR:"L", CTN:"L",
  AAA:"K", AAG:"K", AAR:"K",
  TTT:"F", TTC:"F", TTY:"F",
  CCT:"P", CCC:"P", CCA:"P", CCG:"P", CCN:"P",
  TCT:"S", TCC:"S", TCA:"S", TCG:"S", AGT:"S", AGC:"S", TCN:"S", AGY:"S",
  ACT:"T", ACC:"T", ACA:"T", ACG:"T", ACN:"T",
  TGG:"W",
  TAT:"Y", TAC:"Y", TAY:"Y",
  GTT:"V", GTC:"V", GTA:"V", GTG:"V", GTN:"V",
  TAA:"-", TGA:"-", TAG:"-", TAR:"-", TRA:"-",
  NNN:"X"
});

module.exports = nucleotideCodon;