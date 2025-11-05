function ClassItem({ classData, handleButtonClick }) {
  const { lectureName, lecturer, day, period, term, isOnline } = classData;
  const isLookingForSyllabus = classData.return(
    <div onClick={handleButtonClick}>
      <div>
        <p>{period}限</p>
        <p>(day[0])</p>
      </div>
      <div>
        <h2>{lectureName}</h2>
        <div>
          <div></div>
          {<div></div>}
        </div>
      </div>
    </div>
  );
}

export default ClassItem;
