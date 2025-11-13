import { useState } from "react";
import ClassList from "./ClassList.jsx";
import CollectedSyllabuses from "../collectedSyllabuses/CollectedSyllabuses.jsx";
import Button from "../../../components/Button.jsx";

function Classes({ classes }) {
  const [selectedClass, setSelectedClass] = useState({});

  if (!classes || Object.keys(classes).length === 0) {
    return <h1>CoursePowerにアクセスしてください</h1>;
  }

  if (Object.keys(selectedClass).length !== 0) {
    return <CollectedSyllabuses selectedClass={selectedClass} />;
  }

  return (
    <ul className="flex flex-col gap-5">
      {Object.entries(classes).map(([dayLabel, classItems], i) => (
        <ClassList dayLabel={dayLabel} classItems={classItems} setSelectedClass={setSelectedClass} key={i} />
      ))}
    </ul>
  );
}

export default Classes;
