import React, { useEffect } from "react";

const LogTable = ({ logs, filter, onFilterChange, fetchLogs }) => {
    const handleSeverityChange = (e) => {
        onFilterChange({ ...filter, severity: e.target.value });
        fetchLogs();
    };

    const handleKeywordChange = (e) => {
        onFilterChange({ ...filter, keyword: e.target.value });
        fetchLogs();
    };

    useEffect(() => {
        console.log("Logs updated:", logs);
        // console.log(logs[0]);
    }, [logs]);

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
                    {logs.map((log,idx) => (
                        // {{console.log(log)}}
                        <tr
                            key={idx}
                            style={
                                {
                                    backgroundColor:
                                    log.severity === 'ERROR' ? 'red' : log.severity === 'WARN' ? 'yellow' : 'transparent',
                                }
                            }
                        >
                            <td>{log.timestamp}</td>
                            <td>{log.severity}</td>{" "}
                            {/* Ensure 'log.level' matches the data */}
                            <td>{log.node_name}</td>{" "}
                            {/* Ensure 'log.node_name' matches the data */}
                            <td>{log.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogTable;
