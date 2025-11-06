import "../styles/index.css";
import { useEffect, useState } from "react";
import Classes from "./tabs/classes/classes";
import Majors from "./tabs/majors/Majors";
import Settings from "./tabs/settings/Settings";

function App() {
  const [activeTab, setActiveTab] = useState("classes"); // classes || settings
  const [classes, setClasses] = useState({});

  useEffect(() => {
    async function loadClasses() {
      const res = await chrome.storage.local.get("classes");
      setClasses(res.classes || {});
    }

    loadClasses();
  }, []);

  if (Object.keys(classes).length === 0) {
    return <Majors />;
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("classes")}
          className={`flex-1 py-2 font-medium hover:cursor-pointer ${
            activeTab === "classes" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          クラス
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex-1 py-2 font-medium hover:cursor-pointer ${
            activeTab === "settings" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          設定
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === "classes" && <Classes classes={classes} />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
}

export default App;
