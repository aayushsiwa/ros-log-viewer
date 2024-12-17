import React, { useState } from "react";
import axios from "axios";

const UploadFile = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setUploadStatus("Uploading...");
            const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                setUploadStatus("File uploaded successfully!");
                onUpload(); // Trigger any action needed after successful upload
            }
        } catch (error) {
            console.error("Failed to upload file:", error);
            setUploadStatus("Failed to upload file. Please try again.");
        }
    };

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
      handleUpload()
  };


    return (
        <div>
            <input type="file" id="fileInput" onChange={handleFileChange} className="hidden"/>
            {/* <button  onClick={handleUpload}>Upload</button> */}
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadFile;
