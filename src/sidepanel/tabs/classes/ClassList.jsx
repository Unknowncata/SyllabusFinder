import ClassItem from "./ClassItem";

function ClassList({ dayLabel, classItems }) {
  return (
    <div>
      <h1>{dayLabel}</h1>
      <ul>
        {classItems?.map((classItem, i) => (
          <ClassItem key={i} classData={classItem} />
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
