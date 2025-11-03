function ClassItem({ classData, handleButtonClick }) {
  const { lectureName, lecturer, day = null, period, term, isOnline } = classData;

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:cursor-pointer"
      onClick={handleButtonClick}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{lectureName}</h2>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Lecturer:</span> {lecturer}
        </p>
        <p>
          <span className="font-medium">Period:</span> {period}
        </p>
        {day && (
          <p>
            <span className="font-medium">Day:</span> {day}
          </p>
        )}
        <p>
          <span className="font-medium">Term:</span> {term}
        </p>
        <p>
          <span className="font-medium">Mode:</span>{" "}
          <span className={isOnline ? "text-green-600" : "text-blue-600"}>{isOnline ? "Online" : "In-person"}</span>
        </p>
      </div>
    </div>
  );
}

export default ClassItem;
