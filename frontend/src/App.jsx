import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadFile from "./components/UploadFile";
import LogTable from "./components/LogTable";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState({ severity: "", keyword: "" });

    const fetchLogs = async () => {
        try {
            const params = {};
            if (filter.severity) params.severity = filter.severity;
            if (filter.keyword) params.keyword = filter.keyword;

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/logs/`, {
                params,
            });
            setLogs(response.data);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        }
    };

    const handleUpload = () => {
        document.getElementById("fileInput").click(); // Trigger file input click
    };

    const handleDownload = async () => {
        try {
            const params = {};
            if (filter.severity) params.severity = filter.severity;
            if (filter.keyword) params.keyword = filter.keyword;

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/download/`,
                {
                    params,
                    responseType: "blob",
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "filtered_logs.txt");
            document.body.appendChild(link);
            link.click();
            link.remove();

            alert("Filtered logs downloaded successfully!");
        } catch (error) {
            console.error("Failed to download logs:", error);
            alert("Failed to download logs. Please try again.");
        }
    };

    useEffect(() => {
        fetchLogs();
        console.log(import.meta.env.VITE_API_URL) 

    }, [filter]);

    return (
        <>
            {/* <h1>ROS Log Viewer</h1> */}
            <NavBar
                filter={filter}
                onFilterChange={setFilter}
                // onUpload={handleUpload}
                onUpload={fetchLogs}
                onDownload={handleDownload}
            />
            {/* <UploadFile onUpload={fetchLogs} /> */}
            <LogTable
                logs={logs}
                // filter={filter}
                // onFilterChange={setFilter}
                // fetchLogs={fetchLogs}
            />
        </>
    );
}

export default App;
