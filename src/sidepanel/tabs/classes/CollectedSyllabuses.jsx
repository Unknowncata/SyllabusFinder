import ClassItem from "./ClassItem";

function CollectedSyllabuses({ collectedSyllabuses }) {
  return (
    <div>
      <h1>{collectedSyllabuses.length}件のシラバスが見つかりました</h1>
      <ul>
        {collectedSyllabuses.map((syllabus, index) => (
          <ClassItem key={index} classData={syllabus} handleButtonClick={() => {}} />
        ))}
      </ul>
    </div>
  );
}

export default CollectedSyllabuses;
