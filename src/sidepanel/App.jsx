import { useState, useEffect } from "react";
import SyllabusList from "./features/SyllabusList.jsx";
import SearchFilter from "./features/SearchFilter.jsx";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleMessage = (message) => {
      if (message.type === "UPDATE_CLASSES") {
        setData(message.payload);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  if (data?.syllabusResults?.length === 0) {
    return <h1>該当する授業が見つかりませんでした</h1>;
  }

  return (
    <div>
      <h1>検索結果が複数見つかりました</h1>
      <div>
        <h3>検索フィルター:</h3>
        <SearchFilter searchFilter={data?.searchFilters} />
      </div>
      <div>
        <h2>見つかった授業 ({data?.syllabusResults?.length || 0}件):</h2>
        <SyllabusList syllabusResults={data?.syllabusResults} />
      </div>
    </div>
  );
}

export default App;
