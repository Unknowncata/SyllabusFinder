/**
 * Gets the first syllabus URL that was found from the given URL
 *
 * @param {*} searchUrl must build from buildSyllabusUrl
 * @returns the link to the first syllabus that was found (if not found, null)
 */
function fetchSyllabus(url) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: "FETCH_SYLLABUS", url }, (response) => {
      if (response?.error) {
        return reject(response.error);
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(response.html, "text/html");
      const linkElement = doc.getElementById("CPH1_gvw_kensaku_lnkShousai_0");

      if (!linkElement) {
        return resolve(null);
      }

      resolve(`https://syllabus.aoyama.ac.jp/${linkElement.getAttribute("href")}`);
    });
  });
}

export default fetchSyllabus;
