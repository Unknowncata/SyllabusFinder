import ClassList from "./ClassList.jsx";

function Classes({ classes }) {
  if (!classes || Object.keys(classes).length === 0) {
    return <h1>CoursePowerにアクセスしてください</h1>;
  }

  return (
    <div>
      <h1>あなたの授業</h1>
      {Object.entries(classes).map(([dayLabel, classItems], i) => (
        <ClassList dayLabel={dayLabel} classItems={classItems} key={i} />
      ))}
      <ClassList classes={classes} />
    </div>
  );
}

export default Classes;
