const Translator = require("./../../src/util/Translator");

const dnaSequence = "xxxxxxactatgaattattttgagcataacggtgtattaatgaaatattttccattcctagcgtcaatattgactattgtttttacagcttggaaaatgggtaaatcaacttttaaaataacaaaatctgtcgctgggtctggatttaaagttgtgcgtgttgttattgttactactttcaattgcataatgaagacatttggctcaaagactgaaattgtttcggatgacagaattgatgcgctagctactaaaatacttactgagattgatagacaggtaaaagttattgaacaactaacaaaaagggaattagaacaagtgaaacttctagctgacatttatgaaatgctaaagttcaaaaaagatgaaatcgatatgtcattcgagacaaataaaaaagcatatgaacgatggattcaggatccatatcaaccaactcgagcagtgtcgttagattaatggtccatatctacgttgtccttggaggcgtagaatggcgggtgggnnnnaccatcggacctgcatgagttaagnnnnn";
const frame1_5prime = "XXTMNYFEHNGVLMKYFPFLASILTIVFTAWKMGKSTFKITKSVAGSGFKVVRVVIVTTFNCIMKTFGSKTEIVSDDRIDALATKILTEIDRQVKVIEQLTKRELEQVKLLADIYEMLKFKKDEIDMSFETNKKAYERWIQDPYQPTRAVSLD-WSISTLSLEA-NGGWXXPSDLHELXX";
const frame2_5prime = "XXL-IILSITVY--NIFHS-RQY-LLFLQLGKWVNQLLK-QNLSLGLDLKLCVLLLLLLSIA--RHLAQRLKLFRMTELMR-LLKYLLRLIDR-KLLNN-QKGN-NK-NF-LTFMKC-SSKKMKSICHSRQIKKHMNDGFRIHINQLEQCR-INGPYLRCPWRRRMAGGXXHRTCMS-XX";
const frame3_5prime = "XXYELF-A-RCINEIFSIPSVNIDYCFYSLENG-INF-NNKICRWVWI-SCACCYCYYFQLHNEDIWLKD-NCFG-QN-CASY-NTY-D--TGKSY-TTNKKGIRTSETSS-HL-NAKVQKR-NRYVIRDK-KSI-TMDSGSISTNSSSVVRLMVHIYVVLGGVEWRVGXTIGPA-VKX";
const frame1_3prime = "XXLTHAGPMVXPTRHSTPPRTT-IWTINLTTLLELVDMDPESIVHMLFYLSRMTYRFHLF-TLAFHKCQLEVSLVLIPFLLVVQ-LLPVYQSQ-VF--LAHQFCHPKQFQSLSQMSSLCN-K--Q-QHAQL-IQTQRQILLF-KLIYPFSKL-KQ-SILTLGMENISLIHRYAQNNS-XX";
const frame2_3prime = "XX-LMQVRWXXPPAILRLQGQRRYGPLI-RHCSSWLIWILNPSFICFFICLE-HIDFIFFEL-HFINVS-KFHLF-FPFC-LFNNFYLSINLSKYFSS-RINSVIRNNFSL-AKCLHYAIESSNNNNTHNFKSRPSDRFCYFKS-FTHFPSCKNNSQY-R-EWKIFH-YTVMLKIIHSXX";
const frame3_3prime = "XLNSCRSDGXXHPPFYASKDNVDMDH-SNDTARVG-YGS-IHRSYAFLFVSNDISISSFLNFSIS-MSARSFTCSNSLFVSCSITFTCLSISVSILVASASILSSETISVFEPNVFIMQLKVVTITTRTTLNPDPATDFVILKVDLPIFQAVKTIVNIDARNGKYFINTPLCSK-FIXX";

test("test translateToProtein method", ()=>{
  const actualOutput = Translator.translateToProtein(dnaSequence);

  expect(actualOutput["5' to 3' Frame 1"]).toEqual(frame1_5prime);
  expect(actualOutput["5' to 3' Frame 2"]).toEqual(frame2_5prime);
  expect(actualOutput["5' to 3' Frame 3"]).toEqual(frame3_5prime);

  expect(actualOutput["3' to 5' Frame 1"]).toEqual(frame1_3prime);
  expect(actualOutput["3' to 5' Frame 2"]).toEqual(frame2_3prime);
  expect(actualOutput["3' to 5' Frame 3"]).toEqual(frame3_3prime);
});