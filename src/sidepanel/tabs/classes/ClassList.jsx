import ClassItem from "./ClassItem";
import searchSyllabus from "../../services/searchSyllabus";

async function handleButtonClick(e, { classData, setClasses, setCollectedSyllabuses }) {
  e.preventDefault();

  if (classData.link) {
    window.open(classData.link, "_blank", "noopener,noreferrer");
    alert("link already found");
    return;
  }

  try {
    // First attempt: with lecturer
    let { syllabusSearchDoc, syllabusSearchResults } = await searchSyllabus(classData);

    // Retry if nothing found (removing lecturer)
    if (syllabusSearchResults.length === 0) {
      console.warn("No syllabus found with lecturer. Retrying without lecturer...");
      classData = { ...classData, lecturer: "" };
      ({ syllabusSearchDoc, syllabusSearchResults } = await searchSyllabus(classData));
    }

    // Still nothing found
    if (syllabusSearchResults.length === 0) {
      alert("シラバスが見つかりませんでした。\nエラーだと思われる場合は、報告してもらえると今後の改善に役立ちます!");
      return;
    }

    // 1 syllabus search result
    if (syllabusSearchResults.length === 1) {
      const linkElement = syllabusSearchDoc.getElementById("CPH1_gvw_kensaku_lnkShousai_0");
      const link = `https://syllabus.aoyama.ac.jp/${linkElement.getAttribute("href")}`;

      const day = classData.day;

      setClasses((prevClasses) => {
        const updatedDayClasses = prevClasses[day].map((item) =>
          item.lectureName === classData.lectureName && item.lecturer === classData.lecturer ? { ...item, link } : item
        );
        return { ...prevClasses, [day]: updatedDayClasses };
      });
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }

    // 2+ syllabus search results
    const syllabusResults = syllabusSearchResults.map((searchResult, index) => {
      const periodElementArr = searchResult
        .querySelector(`#CPH1_gvw_kensaku_lblJigen_${index}`)
        .querySelectorAll("span");

      return {
        lectureName: searchResult.querySelector(".col3")?.textContent.trim() || "",
        lecturer: searchResult.querySelector(".col4")?.textContent.trim() || "",
        period: periodElementArr[1]?.textContent.at(-1) || "",
        term: periodElementArr[2]?.textContent.replace(/[（）]/g, "").trim() || "",
        isOnline: periodElementArr[1]?.textContent.at(-1) === "曜",
        day: `${periodElementArr[1]?.textContent.trim()[0]}曜日`,

        campus: periodElementArr[0]?.textContent.replace(/[[\]]/g, "").trim() || "",
        grade: searchResult.querySelector(".col9")?.textContent.trim() || "",
        additionalInfo: searchResult.querySelector(".col10")?.textContent.trim() || "",
        credits: searchResult.querySelector(".col6")?.textContent.trim() || "",
        faculty: searchResult.querySelector(".col7")?.textContent.trim() || "",
        syllabusID: searchResult.querySelector(".col8 a")?.getAttribute("href") || "",
      };
    });

    console.log(syllabusResults);

    setCollectedSyllabuses(syllabusResults);
  } catch (err) {
    console.error(err);
  }
}

function ClassList({ classes, setClasses, setCollectedSyllabuses }) {
  return (
    <ul>
      {Object.entries(classes).map(([dayLabel, classData], i) => (
        <li key={i}>
          <h4>{dayLabel}</h4>
          <ul>
            {classData.map((classData, j) => (
              <ClassItem
                key={j}
                classData={classData}
                handleButtonClick={(e) => handleButtonClick(e, { classData, setClasses, setCollectedSyllabuses })}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default ClassList;
