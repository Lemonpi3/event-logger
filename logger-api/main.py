# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up logging
logging.basicConfig(filename="event_log.txt", level=logging.INFO)

class EventData(BaseModel):
    type: str
    tag: str
    id: str
    className: str
    timestamp: datetime
    formData: dict = None

@app.post("/register-event")
async def capture_event(event_data: EventData):
    # Log the event data
    logging.info(event_data.model_dump_json())
    print(event_data)
    # For simplicity, just return the received data
    return {"status": "success", "data": event_data}
