import ClassItem from "./ClassItem";

function ClassList({ dayLabel, classItems }) {
  return (
    <div>
      <h1 className="text-sm text-gray-800 border-b border-gray-400 mb-3">{dayLabel}</h1>
      <ul className="flex flex-col gap-2">
        {classItems?.map((classItem, i) => (
          <ClassItem key={i} classData={classItem} />
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
