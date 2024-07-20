from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import logging


# Set up logging
logging.basicConfig(filename="event_log.txt", level=logging.INFO)


class EventData(BaseModel):
    type: str
    tag: str
    id: str
    className: str
    timestamp: datetime
    formData: dict = None


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/register-event")
async def capture_event(event_data: EventData):
    # anything that doesn't have id or class is skipped this should be on the app to prevent unnecessary calls
    # but here is just a failsafe to prevent useless data.

    if event_data.id == "" or event_data.className == "":
        return
    
    # Log the event data
    logging.info(event_data.model_dump_json())

    return {"status": "success", "data": event_data}
