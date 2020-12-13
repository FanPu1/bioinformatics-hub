const nucleotideCodon = require("./../../src/constants/nucleotideCodon");

test("test translate nucleotide codon to amino acid with nucleotideCodon object", ()=>{
  expect(nucleotideCodon["GCT"]).toBe("A");
  expect(nucleotideCodon["GCC"]).toBe("A");
  expect(nucleotideCodon["GCA"]).toBe("A");
  expect(nucleotideCodon["GCG"]).toBe("A");
  expect(nucleotideCodon["GCN"]).toBe("A");

  expect(nucleotideCodon["CGT"]).toBe("R");
  expect(nucleotideCodon["CGC"]).toBe("R");
  expect(nucleotideCodon["CGA"]).toBe("R");
  expect(nucleotideCodon["CGG"]).toBe("R");
  expect(nucleotideCodon["AGA"]).toBe("R");
  expect(nucleotideCodon["AGG"]).toBe("R");
  expect(nucleotideCodon["CGN"]).toBe("R");
  expect(nucleotideCodon["MGR"]).toBe("R");

  expect(nucleotideCodon["AAT"]).toBe("N");
  expect(nucleotideCodon["AAC"]).toBe("N");
  expect(nucleotideCodon["AAY"]).toBe("N");

  expect(nucleotideCodon["GAT"]).toBe("D");
  expect(nucleotideCodon["GAC"]).toBe("D");
  expect(nucleotideCodon["GAY"]).toBe("D");

  expect(nucleotideCodon["TGT"]).toBe("C");
  expect(nucleotideCodon["TGC"]).toBe("C");
  expect(nucleotideCodon["TGY"]).toBe("C");

  expect(nucleotideCodon["CAA"]).toBe("Q");
  expect(nucleotideCodon["CAG"]).toBe("Q");
  expect(nucleotideCodon["CAR"]).toBe("Q");

  expect(nucleotideCodon["GGT"]).toBe("G");
  expect(nucleotideCodon["GGC"]).toBe("G");
  expect(nucleotideCodon["GGA"]).toBe("G");
  expect(nucleotideCodon["GGG"]).toBe("G");
  expect(nucleotideCodon["GGN"]).toBe("G");

  expect(nucleotideCodon["CAT"]).toBe("H");
  expect(nucleotideCodon["CAC"]).toBe("H");
  expect(nucleotideCodon["CAY"]).toBe("H");

  expect(nucleotideCodon["ATT"]).toBe("I");
  expect(nucleotideCodon["ATC"]).toBe("I");
  expect(nucleotideCodon["ATA"]).toBe("I");
  expect(nucleotideCodon["ATH"]).toBe("I");

  expect(nucleotideCodon["ATG"]).toBe("M");

  expect(nucleotideCodon["TTA"]).toBe("L");
  expect(nucleotideCodon["TTG"]).toBe("L");
  expect(nucleotideCodon["CTT"]).toBe("L");
  expect(nucleotideCodon["CTC"]).toBe("L");
  expect(nucleotideCodon["CTA"]).toBe("L");
  expect(nucleotideCodon["CTG"]).toBe("L");
  expect(nucleotideCodon["YTR"]).toBe("L");
  expect(nucleotideCodon["CTN"]).toBe("L");

  expect(nucleotideCodon["AAA"]).toBe("K");
  expect(nucleotideCodon["AAG"]).toBe("K");
  expect(nucleotideCodon["AAR"]).toBe("K");

  expect(nucleotideCodon["TTT"]).toBe("F");
  expect(nucleotideCodon["TTC"]).toBe("F");
  expect(nucleotideCodon["TTY"]).toBe("F");

  expect(nucleotideCodon["CCT"]).toBe("P");
  expect(nucleotideCodon["CCC"]).toBe("P");
  expect(nucleotideCodon["CCA"]).toBe("P");
  expect(nucleotideCodon["CCG"]).toBe("P");
  expect(nucleotideCodon["CCN"]).toBe("P");

  expect(nucleotideCodon["TCT"]).toBe("S");
  expect(nucleotideCodon["TCC"]).toBe("S");
  expect(nucleotideCodon["TCA"]).toBe("S");
  expect(nucleotideCodon["TCG"]).toBe("S");
  expect(nucleotideCodon["AGT"]).toBe("S");
  expect(nucleotideCodon["AGC"]).toBe("S");
  expect(nucleotideCodon["TCN"]).toBe("S");
  expect(nucleotideCodon["AGY"]).toBe("S");

  expect(nucleotideCodon["ACT"]).toBe("T");
  expect(nucleotideCodon["ACC"]).toBe("T");
  expect(nucleotideCodon["ACA"]).toBe("T");
  expect(nucleotideCodon["ACG"]).toBe("T");
  expect(nucleotideCodon["ACN"]).toBe("T");

  expect(nucleotideCodon["TGG"]).toBe("W");

  expect(nucleotideCodon["TAT"]).toBe("Y");
  expect(nucleotideCodon["TAC"]).toBe("Y");
  expect(nucleotideCodon["TAY"]).toBe("Y");

  expect(nucleotideCodon["GTT"]).toBe("V");
  expect(nucleotideCodon["GTC"]).toBe("V");
  expect(nucleotideCodon["GTA"]).toBe("V");
  expect(nucleotideCodon["GTG"]).toBe("V");
  expect(nucleotideCodon["GTN"]).toBe("V");

  expect(nucleotideCodon["TAA"]).toBe("-");
  expect(nucleotideCodon["TGA"]).toBe("-");
  expect(nucleotideCodon["TAG"]).toBe("-");
  expect(nucleotideCodon["TAR"]).toBe("-");
  expect(nucleotideCodon["TRA"]).toBe("-");

  expect(nucleotideCodon["NNN"]).toBe("X");
  expect(nucleotideCodon["ASD"]).toBe(undefined);
});

test ("test the value of nucleotideCodon cannot be changed", ()=>{
  nucleotideCodon["NNN"] = "Y";
  expect(nucleotideCodon["NNN"]).toBe("X");
});