import ClassItem from "./ClassItem";
import searchSyllabus from "../../services/searchSyllabus";

async function handleButtonClick(e, { classData, setClasses, setCollectedSyllabuses }) {
  e.preventDefault();

  if (classData.link) {
    window.open(classData.link, "_blank", "noopener,noreferrer");
    alert("link already found");
    return;
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
