import React, { useEffect, useState } from "react";
import axios from "axios";
import LogTable from "./components/LogTable";

function App() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/logs/");
      setLogs(response.data);
      console.log(response.data); // Correctly log the fetched data
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs(); // Fetch logs only once when the component is mounted
  }, []); // Empty dependency array ensures it runs only on mount

  return (
    <div>
      <h1>ROS Log Viewer</h1>
      {/* Render the logs using LogTable */}
      <LogTable logs={logs} filter={" "} />
    </div>
  );
}

export default App;
