function SearchFilter({ classInfo }) {
  const { day, lectureName, lecturer, period, term } = classInfo;

  return (
    <div>
      <h1>{lectureName}</h1>
      <div>
        <p>{lecturer}</p>
        <p>
          {day}・{period}・{term}
        </p>
      </div>
    </div>
  );
}

export default SearchFilter;
