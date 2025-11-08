import { FaRegUser, FaRegCreditCard, FaPencil } from "react-icons/fa6";
import { FaSchool, FaRegCommentDots } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";

function Syllabus({ syllabus }) {
  const { day, lectureName, lecturer, period, subject, isOnline } = syllabus.classInfo;
  const { additionalInfo, campus, credits, grade, syllabusID } = syllabus.syllabus;

  return (
    <div
      className={`relative flex items-center gap-3 rounded-2xl py-3.5 px-1.5 shadow-sm h-32 $"hover:cursor-pointer hover:transform hover:translate-x-1 hover:-translate-y-1 duration-300`}
      onClick={() => window.open(`https://aoyama-syllabus-link/${syllabusID}`, "_blank", "noopener, noreferrer")}
    >
      <div>
        <p>{isOnline ? "*" : period}</p>
        <p>({day[0]})</p>
      </div>

      <div className="pl-3 h-full flex flex-col justify-center flex-grow border-gray-200 border-l-2">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">{lectureName || "講師未定"}</h3>

        <div className="mt-1 flex flex-col text-sm text-gray-600 space-x-4">
          <span className="flex items-center gap-1.5">
            <FaRegUser />
            {lecturer || "情報なし"}
          </span>
          <span className="flex items-center gap-1.5">
            <FaPencil />
            {subject || "情報なし"}
          </span>
          <span className="flex items-center gap-1.5">
            <IoPeopleOutline />
            {grade || "情報なし"}
          </span>
          <span className="flex items-center gap-1.5">
            <FaRegCreditCard />
            {credits || "情報なし"}
          </span>
          <span className="flex items-center gap-1.5">
            <FaSchool />
            {campus || "情報なし"}
          </span>
          <span className="flex items-center gap-1.5">
            <FaRegCommentDots />
            {additionalInfo || "情報なし"}
          </span>
        </div>

        <a
          href={`https://aoyama-syllabus-link/${syllabusID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-sm text-blue-600 font-medium"
        >
          シラバスを見る →
        </a>
      </div>
    </div>
  );
}

export default Syllabus;
