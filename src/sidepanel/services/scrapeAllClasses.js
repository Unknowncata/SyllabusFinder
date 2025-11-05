import searchSyllabus from "./searchSyllabus";

async function scrapeAllClasses(major) {
  const classInfo = await chrome.storage.local.get("classInfo");
  if (Object.keys(classInfo.classInfo).length === 0) {
    console.error("No classinfo found in storage");
    return {};
  }

  const classes = {};

  // looping every day
  for (const [dayLabel, classInfos] of Object.entries(classInfo.classInfo)) {
    classes[dayLabel] = [];

    for (let classInfo of classInfos) {
      try {
        // first attempt
        let syllabusSearchResults = await searchSyllabus({ classInfo, major });

        // retry without lecturer if 0 hits
        if (syllabusSearchResults.length === 0) {
          classInfo = { ...classInfo, lecturer: "" };
          syllabusSearchResults = await searchSyllabus({ classInfo, major });
        }

        // 0 hit
        if (syllabusSearchResults.length === 0) {
          console.log("No results for:", classInfo.lectureName);
          classes[dayLabel].push({ ...classInfo, syllabusID: null });
          continue;
        }

        // 1+ hit(s)
        console.log("Results found for:", classInfo.lectureName);
        syllabusSearchResults.forEach((searchResult, index) => {
          const campus =
            searchResult
              .querySelector(`#CPH1_gvw_kensaku_lblJigen_${index} span`)
              ?.textContent.replace(/[[\]]/g, "")
              .trim() || "";
          const subject = searchResult.querySelector(".col3")?.textContent.trim() || "";
          const syllabusID = searchResult.querySelector(".col8 a")?.getAttribute("href") || "";
          const grade = searchResult.querySelector(".col9")?.textContent.trim() || "";
          const credits = searchResult.querySelector(".col6")?.textContent.trim() || "";
          const additionalInfo = searchResult.querySelector(".col10")?.textContent.trim() || "";

          classes[dayLabel].push({
            ...classInfo,
            subject,
            syllabusID,
            campus,
            grade,
            credits,
            additionalInfo,
          });
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  return classes;
}

export default scrapeAllClasses;
