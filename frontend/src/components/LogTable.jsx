import React from "react";
import axios from "axios";

const LogTable = ({ logs, filter, onFilterChange, fetchLogs }) => {
    const handleSeverityChange = (e) => {
        onFilterChange({ ...filter, severity: e.target.value });
    };

    const handleKeywordChange = (e) => {
        onFilterChange({ ...filter, keyword: e.target.value });
    };

    const handleDownload = async () => {
        try {
            const params = {};
            if (filter.severity) params.severity = filter.severity;
            if (filter.keyword) params.keyword = filter.keyword;

            const response = await axios.get(
                "http://127.0.0.1:8000/download/",
                {
                    params,
                    responseType: "blob", // Receive response as a file
                }
            );

            // Create a link to trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "filtered_logs.txt");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading logs:", error);
            alert("Failed to download logs.");
        }
    };

    return (
        <div className="mt-24">
            {/* <h2>Filter Logs</h2>
            <div>
                <label>Severity: </label>
                <select value={filter.severity} onChange={handleSeverityChange}>
                    <option value="">All</option>
                    <option value="INFO">INFO</option>
                    <option value="WARN">WARN</option>
                    <option value="ERROR">ERROR</option>
                    <option value="DEBUG">DEBUG</option>
                </select>

                <label> Keyword: </label>
                <input
                    type="text"
                    value={filter.keyword}
                    onChange={handleKeywordChange}
                    placeholder="Search messages..."
                />
                <button onClick={fetchLogs}>Apply Filter</button>
                <button onClick={handleDownload}>Download Filtered Logs</button>
            </div> */}

            {/* <h2>Logs</h2> */}
            <table 
            border="1" cellPadding="4"
            className="w-full px-1"
            >
                <thead>
                    <tr>
                        <th className="text-left">Timestamp</th>
                        <th className="text-left">Severity</th>
                        <th className="text-left">Node</th>
                        <th className="text-left">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.length > 0 ? (
                        logs.map((log, idx) => (
                            <tr
                                key={idx}
                                style={{
                                    backgroundColor:
                                        log.severity === "ERROR"
                                            ? "red"
                                            : log.severity === "WARN"
                                            ? "yellow"
                                            : "transparent",
                                }}
                                className="pl-8"
                            >
                                <td className="text-left">{log.timestamp}</td>
                                <td className="text-left">{log.severity}</td>
                                <td className="text-left">{log.node_name}</td>
                                <td className="text-left">{log.message}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No logs to display</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LogTable;
