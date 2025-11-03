import useChromeStorageState from "../majors/useChromeStorageState.jsx";
import ClassList from "./ClassList.jsx";

function Classes() {
  const [classes, setClasses] = useChromeStorageState("classes", {});

  if (!classes || Object.keys(classes).length === 0) {
    return <h1>CoursePowerにアクセスしてください</h1>;
  }

  return (
    <div>
      <h1>あなたの授業</h1>
      <ClassList classes={classes} setClasses={setClasses} />
    </div>
  );
}

export default Classes;
