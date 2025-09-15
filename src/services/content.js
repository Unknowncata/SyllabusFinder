import buildSyllabusSearchUrl from "./buildSyllabusSearchUrl.js";
import buildSyllabusUrl from "./buildSyllabusUrl.js";

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

async function getMajor() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("major", (result) => {
      if (!result) {
        reject("Error fetching major from local chrome storage");
      }

      resolve(result["major"]);
    });
  });
}

async function handleButtonClick(e, { courseCard, dayLabel }) {
  e.preventDefault();

  const major = await getMajor();

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
    major: major,
    term: term || "",
  };

  let syllabusSearchURL = await buildSyllabusSearchUrl(data);
  console.log(syllabusSearchURL);

  try {
    const link = await buildSyllabusUrl(syllabusSearchURL);
    if (link) {
      window.location.href = link;
      return;
    }

    const retryData = { ...data, lecturer: "" };
    syllabusSearchURL = await buildSyllabusSearchUrl(retryData);

    const retryLink = await buildSyllabusUrl(syllabusSearchURL);
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
  document.querySelectorAll(".weeklyCourseArea .dayBox").forEach((dayBox) => {
    const dayLabel = dayBox.querySelector(".cpLabel.orange")?.textContent.trim() || "";

    if (dayLabel === "その他" || dayLabel === "") {
      return;
    }

    dayBox.querySelectorAll(".courseCard").forEach((courseCard) => {
      const button = createButton();

      button.addEventListener("click", (e) => handleButtonClick(e, { courseCard, dayLabel }));
      courseCard.appendChild(button);
      courseCard.style.position = "relative";
    });
  });
})();
