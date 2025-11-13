import "../styles/index.css";
import { useEffect, useState } from "react";
import Classes from "./tabs/classes/classes/Classes";
import Majors from "./tabs/majors/Majors";
import Settings from "./tabs/settings/Settings";
import Nav from "./components/Nav";
import LoadingScreen from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("classes");
  const [classes, setClasses] = useState({});

  useEffect(() => {
    async function loadClasses() {
      const res = await chrome.storage.local.get("classes");
      setClasses(res.classes || {});
    }

    loadClasses();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (Object.keys(classes).length === 0) {
    return <Majors setIsLoading={setIsLoading} setClasses={setClasses} />;
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === "classes" && <Classes classes={classes} />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
}

export default App;
