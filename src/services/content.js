import buildSyllabusUrl from "./buildSyllabusUrl.js";
import fetchSyllabus from "./syllabusFinder.js";

const MAJOR = "情報テクノロジー学科";

function createButton() {
  const button = document.createElement("button");
  button.innerText = "Syllabus";
  button.style.margin = "5px";
  button.style.padding = "3px 8px";
  button.style.fontSize = "12px";
  button.style.cursor = "pointer";
  button.style.position = "absolute";

  return button;
}

async function handleButtonClick(e, { courseCard, dayLabel }) {
  e.preventDefault();

  const periodTermText = courseCard.querySelector(".courseCardInfo")?.textContent.trim() || "";
  const [period, term] = periodTermText.split(/\s+/);

  const lectureName = courseCard.querySelector(".courseCardName")?.textContent.trim() || "";
  const lecturerRaw = courseCard.querySelector(".courseCardUser");
  const lecturer = [...lecturerRaw.childNodes][0].textContent || "";

  const data = {
    lectureName,
    lecturer: lecturer.replace(/["ほか"]/g, "").trim(),
    day: dayLabel,
    period: period || "",
    major: MAJOR,
    term: term || "",
  };

  let syllabusSearchURL = buildSyllabusUrl(data);

  try {
    const link = await fetchSyllabus(syllabusSearchURL);
    if (link) {
      window.location.href = link;
      return;
    }

    const retryData = { ...data, lecturer: "" };
    syllabusSearchURL = buildSyllabusUrl(retryData);

    const retryLink = await fetchSyllabus(syllabusSearchURL);
    if (retryLink) {
      window.location.href = retryLink;
      return;
    }

    // If still not found
    alert("No syllabus found :(");
  } catch (err) {
    alert("Error fetching syllabus:", err);
  }
}

(function () {
  // Goes through every week days
  document.querySelectorAll(".weeklyCourseArea .dayBox").forEach((dayBox) => {
    const dayLabel = dayBox.querySelector(".cpLabel.orange")?.textContent.trim() || "";

    if (dayLabel === "その他" || dayLabel === "") {
      return;
    }

    // Goes through every lecture from given days
    dayBox.querySelectorAll(".courseCard").forEach((courseCard) => {
      const button = createButton();

      button.addEventListener("click", (e) => handleButtonClick(e, { courseCard, dayLabel }));
      courseCard.appendChild(button);
      courseCard.style.position = "relative";
    });
  });
})();
