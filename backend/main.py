from fastapi import FastAPI, File, UploadFile, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import re
from typing import List, Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Parse log file
def parse_log(log_entry: str):
    import re
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

# Temporary storage for logs
with open("./data/fake_ros_logs.log","r") as f:
    content=f.readlines();
    logs=[]
    for i in content:
      logs.append(parse_log(i))
      

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    global logs
    content = await file.readlines()
    logs = parse_log(content.decode('utf-8'))
    return {"message": "File uploaded and parsed successfully"}

@app.get("/logs/")
def get_logs(
    severity: Optional[str] = Query(None),
    keyword: Optional[str] = Query(None),
):
    global logs
    filtered_logs = logs
    if severity:
        filtered_logs = [log for log in logs if log["level"] == severity]
    if keyword:
        filtered_logs = [log for log in filtered_logs if keyword in log["message"]]
    return JSONResponse(filtered_logs)
