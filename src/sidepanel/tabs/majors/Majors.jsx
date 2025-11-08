import { useState } from "react";
import faculties from "../../../../public/faculties.json";
import scrapeAllClasses from "../../services/scrapeAllClasses";
import FacultyElement from "./FacultyElement";

async function submitButton(selectedMajor, setClasses) {
  await chrome.storage.local.set({ selectedMajor });

  const classes = await scrapeAllClasses(selectedMajor);
  await chrome.storage.local.set({ classes });

  setClasses(classes);

  alert("everything seems good to go");
}

function Majors({ setClasses }) {
  const [selectedMajor, setSelectedMajor] = useState("major", null);

  return (
    <div className="h-48 rounded-lg px-5 py-4">
      <div className="mb-3">
        <h1 className="text-2xl">Syllabus Finder</h1>
        <p className="text-base">
          あなたの学科: <span>{selectedMajor || "未選択"}</span>
        </p>
      </div>

      <ul className="flex flex-col gap-5">
        {faculties.map((faculty, index) => (
          <FacultyElement
            faculty={faculty}
            isLast={index === faculties.length - 1}
            selectedMajor={selectedMajor}
            setSelectedMajor={setSelectedMajor}
            key={index}
          />
        ))}
      </ul>
      {selectedMajor && (
        <button onClick={() => submitButton(selectedMajor, setClasses)}>{selectedMajor}に決定する</button>
      )}
    </div>
  );
}

export default Majors;
