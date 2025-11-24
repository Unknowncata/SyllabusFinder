import { FaRegUser } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import InfoField from "../../../components/InfoField";

function handleClick(isCompromised, classData, setSelectedClass) {
    const { syllabusID } = classData.syllabuses[0];
    const link = `https://syllabus.aoyama.ac.jp/${syllabusID}`;

    if (!isCompromised) {
        window.open(link, "_blank", "noopener, noreferrer");
        return;
    }

    setSelectedClass(classData);
}

function ClassItem({ classData, setSelectedClass }) {
    const { isOnline, lectureName, lecturer, period } = classData.classInfo;
    const { subject, syllabusID } = classData.syllabuses[0];

    const isCompromised = classData.syllabuses.length > 1;
    const doesExist = syllabusID;

    return (
        <div
            className={`relative flex items-center gap-3 rounded-2xl py-3.5 px-1.5 shadow-sm h-32 ${
                doesExist &&
                "hover:cursor-pointer hover:transform hover:translate-x-1 hover:-translate-y-1 duration-300"
            }`}
            onClick={() => doesExist && handleClick(isCompromised, classData, setSelectedClass)}
        >
            {!syllabusID && <div className="absolute top-0 left-0 w-full h-full z-10 bg-gray-900/30 rounded-2xl"></div>}

            <div className="w-12 text-base flex-shrink-0 text-center text-gray-500">{isOnline ? "*" : period}</div>

            <div className="pl-3 h-full flex flex-col justify-center flex-grow border-gray-200 border-l-2">
                <h3 className="text-lg font-semibold text-gray-800 leading-tight">{lectureName || "講師未定"}</h3>

                <div className="mt-1 flex flex-col text-sm text-gray-600 space-x-4">
                    <InfoField Icon={FaRegUser}>{lecturer}</InfoField>
                    {doesExist && <InfoField Icon={LuPencilLine}>{subject}</InfoField>}
                </div>

                {doesExist && <ExternalLink isCompromised={isCompromised} />}
            </div>

            {isCompromised && <div className="ml-auto">→</div>}
        </div>
    );
}

function ExternalLink({ isCompromised }) {
    return isCompromised ? (
        <a className="text-yellow-400 mt-2 text-sm font-medium">クラスを選択する</a>
    ) : (
        <p target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-blue-600 font-medium">
            シラバスを見る →
        </p>
    );
}

export default ClassItem;
