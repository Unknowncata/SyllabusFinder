import buildSyllabusSearchUrl from "./buildSyllabusSearchUrl";
import fetchSyllabusSearchDoc from "./fetchSyllabusSearchDoc";

async function searchSyllabus({ classInfo, major }) {
  const syllabusSearchURL = await buildSyllabusSearchUrl({ ...classInfo, major });
  console.log("Searching:", syllabusSearchURL);

  const syllabusSearchDoc = await fetchSyllabusSearchDoc(syllabusSearchURL);
  const syllabusSearchResults = [...syllabusSearchDoc.querySelectorAll("#CPH1_gvw_kensaku tbody tr")];

  return syllabusSearchResults;
}

export default searchSyllabus;
