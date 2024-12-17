import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadFile from "./components/UploadFile";
import LogTable from "./components/LogTable";

function App() {
    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState({ severity: "", keyword: "" }); // State for filtering

    const fetchLogs = async () => {
        try {
            const params = {};
            if (filter.severity) params.severity = filter.severity;
            if (filter.keyword) params.keyword = filter.keyword;

            const response = await axios.get("http://127.0.0.1:8000/logs/", { params });
            setLogs(response.data);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        }
    };

    useEffect(() => {
        fetchLogs(); // Fetch logs when the component mounts or filter changes
    }, [filter]);

    return (
        <div>
            <h1>ROS Log Viewer</h1>
            <UploadFile onUpload={fetchLogs}/>
            <LogTable
                logs={logs}
                filter={filter}
                onFilterChange={setFilter}
                fetchLogs={fetchLogs}
            />
        </div>
    );
}

export default App;
