import ClassList from "./ClassList.jsx";

function Classes({ classes }) {
  if (!classes || Object.keys(classes).length === 0) {
    return <h1>CoursePowerにアクセスしてください</h1>;
  }

  return (
    <ul className="flex flex-col gap-5">
      {Object.entries(classes).map(([dayLabel, classItems], i) => (
        <ClassList dayLabel={dayLabel} classItems={classItems} key={i} />
      ))}
    </ul>
  );
}

export default Classes;
