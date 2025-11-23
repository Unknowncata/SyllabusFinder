import { useState } from "react";
import ClassList from "./ClassList.jsx";
import CollectedSyllabuses from "../collectedSyllabuses/CollectedSyllabuses.jsx";

const week = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

function Classes({ classes }) {
    const [selectedClass, setSelectedClass] = useState({});

    if (!classes || Object.keys(classes).length === 0) {
        return <h1>CoursePowerの講義一覧にアクセスしてください</h1>;
    }

    if (Object.keys(selectedClass).length !== 0) {
        return <CollectedSyllabuses selectedClass={selectedClass} setSelectedClass={setSelectedClass} />;
    }

    return (
        <ul className="flex flex-col gap-5">
            {Object.keys(classes)
                .sort((a, b) => {
                    return week.indexOf(a) - week.indexOf(b);
                })
                .map((dayLabel, i) => (
                    <ClassList
                        dayLabel={dayLabel}
                        classItems={classes[dayLabel]}
                        setSelectedClass={setSelectedClass}
                        key={i}
                    />
                ))}
        </ul>
    );
}

export default Classes;
