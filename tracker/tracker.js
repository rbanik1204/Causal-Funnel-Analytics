const API_URL = 'https://causal-funnel-analytics-1-wxnm.onrender.com/api/events';
const SESSION_KEY = "causalfunnel_session_id";
function getSessionID() {
    let sessionID = sessionStorage.getItem(SESSION_KEY);
    if (!sessionID) {
        sessionID = `sess_${crypto.randomUUID()}`;
        sessionStorage.setItem(SESSION_KEY, sessionID);
    }
    return sessionID
}
async function trackEvent(eventType, extraData = {}) {
    const payload = {
        session_id: getSessionID(),
        event_type: eventType,
        page_url: API_URL,
        timestamp: new Date().toISOString(),
        ...extraData
    }
    console.log("Payload:", payload);
    console.log("Serialized payload:", JSON.stringify(payload));
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) console.log("Event tracking failed:", response.status)
    } catch (error) {
        console.error("Unable to send tracking event:", error);
    }
}

//Track page views
trackEvent('page_view')
//Track Clicks
document.getElementById('test-button').addEventListener('click', (event) => {
    trackEvent("click", {
        coordinates: {
            x: event.clientX,
            y: event.clientY,
        }
    })
})