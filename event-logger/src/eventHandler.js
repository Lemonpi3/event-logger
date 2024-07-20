import axios from 'axios';

const API_EVENT_URL = "http://127.0.0.1:8000/register-event"
const API_SESSION_URL = "http://127.0.0.1:8000/session"

// modify this to filter out events on classes/ids
const DIS_ALLOWED_IDS = [];
const DIS_ALLOWED_CLASSES = ["App-header"];

// session time variables
let sessionStartTime = new Date();
let sessionEndTime = null;


const sendSessionData = async () => {
    const sessionDuration = sessionEndTime ? (sessionEndTime - sessionStartTime) / 1000 : null;
    const sessionData = {
        startTime: sessionStartTime.toISOString(),
        endTime: sessionEndTime ? sessionEndTime.toISOString() : null,
        durationSeconds: sessionDuration,
    };
  
    try {
        await axios.post(API_SESSION_URL, sessionData);
        console.log('Session data sent successfully:', sessionData);
    } catch (error) {
        console.error('Error sending session data:', error);
    }
};


const sendEvent = (eventData) => {
    axios.post(API_EVENT_URL, eventData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
        console.log('Event data sent successfully:', response);
        })
        .catch(error => {
        console.error('Error sending event data:', error);
        });
}



// <-- Handler Functions -->
// They all receive the event and target and  return an event data json with 
// type, tag, id, className, timestamp and any other niche from the type of object

// Also returns formData field as a json does not track fields named "password" 
const handleFormEvent = (event, target) => {
    event.preventDefault();

    const form = target.closest('form');
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
        if (key !== "password") {
            formObject[key] = value;
        }
    });

    const eventData = {
        type: event.type,
        tag: form.tagName,
        id: form.id,
        className: form.className,
        timestamp: new Date().toISOString(),
        formData: formObject,
    };

    return eventData
}


const handleButtonEvent = (event, target) => {
    const eventData = {
        type: event.type,
        tag: target.tagName,
        id: target.id,
        className: target.className,
        timestamp: new Date().toISOString(),
    };

    return eventData;
}
// <-- end of Handler Functions -->


// session time tracking

// start timer
window.addEventListener('load', () => {
    sessionStartTime = new Date();
});
  
// on exit page
window.addEventListener('beforeunload', () => {
    sessionEndTime = new Date();
    sendSessionData();
});


export const handleEvent = (event) => {
    const target = event.target;

    const inValidEvent = (target.id === "" && target.className === "") ||
                        DIS_ALLOWED_IDS.includes(target.id) ||
                        DIS_ALLOWED_CLASSES.includes(target.className);

    if (inValidEvent){
        return;
    }

    if (event.type === 'submit' && target.closest('form')) {
        const eventData = handleFormEvent(event, target);
        sendEvent(eventData);
    }

    if (event.type === "click") {
        const eventData = handleButtonEvent(event, target);
        sendEvent(eventData);
    }        
};