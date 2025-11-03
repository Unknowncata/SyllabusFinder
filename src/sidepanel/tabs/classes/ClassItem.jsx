import searchSyllabus from "../../services/searchSyllabus";

async function handleButtonClick(e, { classData, setClasses }) {
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

    // 2+ syllabus search results CHECK
    // const syllabusResults = syllabusSearchResults.map((searchResult) => ({
    //   period: searchResult.querySelector(".col2")?.textContent.trim() || "",
    //   subject: searchResult.querySelector(".col3")?.textContent.trim() || "",
    //   teacher: searchResult.querySelector(".col4")?.textContent.trim() || "",
    //   credits: searchResult.querySelector(".col6")?.textContent.trim() || "",
    //   faculty: searchResult.querySelector(".col7")?.textContent.trim() || "",
    //   syllabusID: searchResult.querySelector(".col8 a")?.getAttribute("href") || "",
    // }));

    // await chrome.runtime.sendMessage({
    //   type: "UPDATE_CLASSES",
    //   payload: {
    //     searchFilters,
    //     syllabusResults,
    //   },
    // });

    alert("more than 2 found");
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}

function ClassItem({ classData, setClasses }) {
  const { lectureName, lecturer, period, term, isOnline } = classData;

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:cursor-pointer"
      onClick={(e) => handleButtonClick(e, { classData, setClasses })}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{lectureName}</h2>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Lecturer:</span> {lecturer}
        </p>
        <p>
          <span className="font-medium">Period:</span> {period}
        </p>
        <p>
          <span className="font-medium">Term:</span> {term}
        </p>
        <p>
          <span className="font-medium">Mode:</span>{" "}
          <span className={isOnline ? "text-green-600" : "text-blue-600"}>{isOnline ? "Online" : "In-person"}</span>
        </p>
      </div>
    </div>
  );
}

export default ClassItem;
