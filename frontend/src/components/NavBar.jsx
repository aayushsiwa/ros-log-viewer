import React from "react";
import download from "../../public/download.svg";
import upload from "../../public/upload.svg";
import search from "../../public/search.svg";

function NavBar({ filter, onFilterChange, onUpload, onDownload }) {
    // Handle severity filter changes
    const handleSeverityChange = (e) => {
        onFilterChange({ ...filter, severity: e.target.value });
    };

    // Handle keyword input changes
    const handleKeywordChange = (e) => {
        onFilterChange({ ...filter, keyword: e.target.value });
    };

    return (
        <div className="h-20 shadow-sm w-full mb-4 p-4 flex justify-between items-center fixed z-10 bg-white top-0">
            {/* Title */}
            <div className="text-3xl font-bold">ROS Log Viewer</div>

            {/* Search and Filter Section */}
            <div className="relative flex items-center">
                {/* Severity Filter */}
                <select
                    value={filter.severity}
                    onChange={handleSeverityChange}
                    className="h-12 rounded-md bg-[#f2f2f2] p-2"
                >
                    <option value="">Severity</option>
                    <option value="INFO">INFO</option>
                    <option value="WARN">WARN</option>
                    <option value="ERROR">ERROR</option>
                    <option value="DEBUG">DEBUG</option>
                </select>

                {/* Search Input */}
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search logs"
                        value={filter.keyword}
                        onChange={handleKeywordChange}
                        className="w-96 h-12 bg-[#f2f2f2] pl-4 pr-12 rounded-md placeholder-[#5c5c5c] text-sm ms-2"
                    />
                    <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:scale-125 cursor-pointer">
                        <img src={search} alt="Search" />
                    </span>
                </div>
            </div>

            {/* Upload and Download Buttons */}
            <div className="flex gap-4 items-center">
                <button
                    onClick={onUpload}
                    className="flex gap-2 items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    Upload
                    <img src={upload} alt="Upload" />
                </button>

                <button
                    onClick={onDownload}
                    className="flex gap-2 items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                    Download
                    <img src={download} alt="Download" />
                </button>
            </div>
        </div>
    );
}

export default NavBar;
