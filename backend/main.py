from fastapi import FastAPI, File, UploadFile, Query
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import os
import re

app = FastAPI()

# Enable CORS (use specific origins in production for security)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure the 'data' directory exists
DATA_DIR = "./data"
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# Global list to temporarily store parsed logs
logs = []


# Function to parse a single log entry
def parse_log(log_entry: str):
    pattern = r"\[(.*?)\] \[(.*?)\] \[(.*?)\] (.*)"
    match = re.match(pattern, log_entry)
    if match:
        timestamp, severity, node_name, message = match.groups()
        return {
            "timestamp": timestamp,
            "severity": severity,
            "node_name": node_name,
            "message": message,
        }
    return None


# Route to upload and parse a log file
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    global logs
    file_location = os.path.join(DATA_DIR, file.filename)

    # Save the uploaded file to the 'data' directory
    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())

    # Parse the file and reset the logs list
    logs = []
    with open(file_location, "r") as f:
        for line in f:
            parsed_log = parse_log(line)
            if parsed_log:
                logs.append(parsed_log)

    return {"message": f"File '{file.filename}' uploaded and parsed successfully"}


# Route to fetch logs with optional filters
@app.get("/logs/")
def get_logs(
    severity: Optional[str] = Query(None, description="Filter logs by severity level"),
    keyword: Optional[str] = Query(
        None, description="Search logs by keyword in message"
    ),
):
    filtered_logs = logs

    # Apply severity filter
    if severity:
        filtered_logs = [log for log in filtered_logs if log["severity"] == severity]

    # Apply keyword search filter
    if keyword:
        filtered_logs = [
            log
            for log in filtered_logs
            if keyword.lower()
            in f"{log['timestamp']} {log['severity']} {log['node_name']} {log['message']}".lower()
        ]

    return JSONResponse(filtered_logs)


# Route to download filtered logs as a file
@app.get("/download/")
def download_logs(
    severity: Optional[str] = Query(None, description="Filter logs by severity level"),
    keyword: Optional[str] = Query(
        None, description="Search logs by keyword in message"
    ),
):
    filtered_logs = logs

    # Apply severity filter
    if severity:
        filtered_logs = [log for log in filtered_logs if log["severity"] == severity]

    # Apply keyword search filter
    if keyword:
        filtered_logs = [
            log for log in filtered_logs if keyword.lower() in log["message"].lower()
        ]

    # Generate a temporary file to store filtered logs
    download_file_path = os.path.join(DATA_DIR, "filtered_logs.txt")
    with open(download_file_path, "w") as f:
        for log in filtered_logs:
            log_line = f"[{log['timestamp']}] [{log['severity']}] [{log['node_name']}] {log['message']}\n"
            f.write(log_line)

    return FileResponse(
        path=download_file_path,
        media_type="text/plain",
        filename="filtered_logs.txt",
    )
