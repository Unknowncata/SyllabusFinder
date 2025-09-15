// 教職課程科目 "611Z09"
const GENERAL_MAJOR_CODE = "611020"; // 青山スタンダード科目

async function fetchFaculties() {
  return new Promise((resolve, reject) =>
    fetch(chrome.runtime.getURL("faculties.json")).then((resp) => {
      if (!resp) {
        reject("Error fetching faculties.json");
      }

      resolve(resp.json());
    })
  );
}

async function getMajorCodeByLabel(label) {
  const faculties = await fetchFaculties();

  for (const faculty of faculties) {
    for (const major of faculty.majors) {
      if (major.label === label) {
        return [...major.code, GENERAL_MAJOR_CODE];
      }
    }
  }

  return null;
}

export default getMajorCodeByLabel;
