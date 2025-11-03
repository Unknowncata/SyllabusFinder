import ClassItem from "./ClassItem";

function ClassList({ classes, setClasses }) {
  return (
    <ul>
      {Object.entries(classes).map(([dayLabel, classData], i) => (
        <li key={i}>
          <h4>{dayLabel}</h4>
          <ul>
            {classData.map((classItem, j) => (
              <ClassItem key={j} classData={classItem} setClasses={setClasses} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default ClassList;
