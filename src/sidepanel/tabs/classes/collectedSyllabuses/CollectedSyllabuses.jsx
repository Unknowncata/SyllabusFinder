import SearchFilter from "./SearchFilter";
import Syllabus from "./Syllabus";

function CollectedSyllabuses({ selectedClass }) {
  return (
    <div>
      <SearchFilter classInfo={selectedClass?.classInfo} />

      <h1>{selectedClass.syllabuses?.length}件のシラバスが見つかりました</h1>
      <ul>
        {selectedClass.syllabuses.map((syllabus) => (
          <Syllabus syllabus={{ classInfo: selectedClass.classInfo, syllabus: syllabus }} />
        ))}
      </ul>
    </div>
  );
}

export default CollectedSyllabuses;
