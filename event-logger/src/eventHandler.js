import axios from 'axios';

const API_EVENT_URL = "http://127.0.0.1:8000/register-event"

function sendEvent(eventData){
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

export const handleEvent = (event) => {
    const target = event.target;

    // Check if the target is a clickable component or form
    if (event.type === 'submit' && target.closest('form')) {
        event.preventDefault();

        const form = target.closest('form');
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
        formObject[key] = value;
        });

        const eventData = {
        type: event.type,
        tag: form.tagName,
        id: form.id,
        className: form.className,
        timestamp: new Date().toISOString(),
        formData: formObject,
        };

        sendEvent(eventData);
    }

    else{
        const eventData = {
        type: event.type,
        tag: target.tagName,
        id: target.id,
        className: target.className,
        timestamp: new Date().toISOString(),
        };

        if (event.type === 'submit') {
            event.preventDefault();

            // Convert form data to a plain object
            const formData = new FormData(target);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            eventData.formData = formObject;
        }

        sendEvent(eventData);
    }


        
};