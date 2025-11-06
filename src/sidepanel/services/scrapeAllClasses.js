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

    for (const classInfo of classInfos) {
      try {
        // first attempt
        let syllabusSearchResults = await searchSyllabus({ classInfo, major });

        // retry without lecturer if 0 hits
        if (syllabusSearchResults.length === 0) {
          syllabusSearchResults = await searchSyllabus({ classInfo: { ...classInfo, lecturer: "" }, major });
        }

        const syllabusList = syllabusSearchResults.length
          ? syllabusSearchResults.map((searchResult, index) => {
              const subject = searchResult.querySelector(".col7")?.textContent.trim() || "";
              const syllabusID = searchResult.querySelector(".col8 a")?.getAttribute("href") || "";
              const campus =
                searchResult
                  .querySelector(`#CPH1_gvw_kensaku_lblJigen_${index} span`)
                  ?.textContent.replace(/[[\]]/g, "")
                  .trim() || "";
              const grade = searchResult.querySelector(".col9")?.textContent.trim() || "";
              const credits = searchResult.querySelector(".col6")?.textContent.trim() || "";
              const additionalInfo = searchResult.querySelector(".col10")?.textContent.trim() || "";
              return { subject, syllabusID, campus, grade, credits, additionalInfo };
            })
          : [{ syllabusID: null }];

        classes[dayLabel].push({
          classInfo,
          syllabuses: syllabusList,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  return classes;
}

export default scrapeAllClasses;
