import React from "react";

const LogTable = ({ logs, filter, onFilterChange }) => {
    const handleSeverityChange = (e) => {
        onFilterChange({ ...filter, severity: e.target.value });
    };

    const handleKeywordChange = (e) => {
        onFilterChange({ ...filter, keyword: e.target.value });
    };

    return (
        <div>
            <div>
                <label>Severity:</label>
                <select value={filter.severity} onChange={handleSeverityChange}>
                    <option value="">All</option>
                    <option value="INFO">INFO</option>
                    <option value="WARN">WARN</option>
                    <option value="ERROR">ERROR</option>
                    <option value="DEBUG">DEBUG</option>
                </select>

                <label>Search:</label>
                <input
                    type="text"
                    value={filter.keyword}
                    onChange={handleKeywordChange}
                    placeholder="Search logs..."
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Level</th>
                        <th>Node</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, idx) => (
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
                        >
                            <td>{log.timestamp}</td>
                            <td>{log.severity}</td>
                            <td>{log.node_name}</td>
                            <td>{log.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogTable;
