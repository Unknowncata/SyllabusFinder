function ClassItem({ classData }) {
  const { isOnline, lectureName, lecturer, period } = classData.classInfo;
  const { subject, syllabusID } = classData.syllabuses[0];

  const isCompromised = classData.syllabuses.length > 1;

  return (
    <div
      className={`flex items-center rounded-2xl p-4 mb-3 bg-white shadow-sm hover:cursor-pointer hover:transform hover:-translate-y-1 duration-300 ${
        isCompromised ? "border-2 border-yellow-400" : "border border-gray-200"
      }`}
    >
      <div className="w-12 flex-shrink-0 text-center text-gray-500 font-semibold">{isOnline ? "*" : period}</div>

      <div className="ml-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">{lectureName}</h3>

        <div className="mt-1 flex flex-col items-center text-sm text-gray-600 space-x-4">
          <span className="flex items-center">
            {/* <User size={16} className="mr-1" /> */}
            {lecturer || "講師未定"}
          </span>
          {!isCompromised && (
            <span className="flex items-center">
              {/* <Pencil size={16} className="mr-1" /> */}
              {subject || "情報なし"}
            </span>
          )}
        </div>

        {isCompromised ? (
          <a className="mt-2 text-sm text-blue-600 hover:underline font-medium">クラスを選択する</a>
        ) : (
          <a
            href={syllabusID ? `https://aoyama-syllabus-link/${syllabusID}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm border-yellow-400 hover:underline font-medium"
          >
            シラバスを見る →
          </a>
        )}
      </div>
    </div>
  );
}

export default ClassItem;
