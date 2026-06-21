def classify_request(message: str):

    message = message.lower()

    if "medical" in message or "ambulance" in message or "injured" in message:
        return {
            "category": "medical",
            "priority": "critical"
        }

    elif "food" in message or "hungry" in message:
        return {
            "category": "food",
            "priority": "high"
        }

    elif "water" in message or "drinking water" in message:
        return {
            "category": "water",
            "priority": "medium"
        }

    elif "trapped" in message or "rescue" in message:
        return {
            "category": "rescue",
            "priority": "critical"
        }

    else:
        return {
            "category": "general",
            "priority": "low"
        }