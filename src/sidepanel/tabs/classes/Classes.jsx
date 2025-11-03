import { useState } from "react";
import useChromeStorageState from "../majors/useChromeStorageState.jsx";
import ClassList from "./ClassList.jsx";
import CollectedSyllabuses from "./CollectedSyllabuses.jsx";

function Classes() {
  const [classes, setClasses] = useChromeStorageState("classes", {});
  const [collectedSyllabuses, setCollectedSyllabuses] = useState([]);

  if (!classes || Object.keys(classes).length === 0) {
    return <h1>CoursePowerにアクセスしてください</h1>;
  }

  return collectedSyllabuses.length > 0 ? (
    <CollectedSyllabuses collectedSyllabuses={collectedSyllabuses} />
  ) : (
    <div>
      <h1>あなたの授業</h1>
      <ClassList classes={classes} setClasses={setClasses} setCollectedSyllabuses={setCollectedSyllabuses} />
    </div>
  );
}

export default Classes;
