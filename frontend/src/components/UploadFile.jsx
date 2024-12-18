import React, { useState } from "react";
import upload from "../../public/upload.svg";
import axios from "axios";

const UploadFile = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("Upload");

    const handleUpload = async () => {
        if (!selectedFile) {
            // setUploadStatus("Select");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setUploadStatus("Uploading...");
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/upload/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                setUploadStatus("Uploaded");
                onUpload(); // Trigger any action needed after successful upload
            }
        } catch (error) {
            console.error("Failed to upload file:", error);
            setUploadStatus("Failed");
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        handleUpload();
    };

    return (
        <div className="flex items-center">
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className="bg-blue-400 p-1 rounded-md me-1 text-blue-100"
            />
            <button
                onClick={handleUpload}
                className="flex justify-between gap-2 items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-36"
            >
                {uploadStatus && <p>{uploadStatus}</p>}
                <img src={upload} alt="Upload" />
            </button>
        </div>
    );
};

export default UploadFile;
