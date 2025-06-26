# Hardware API Integration Guide

## Problem Solved

This API solves the issue where hardware repeatedly opens/closes the gate for the same log entry by introducing a processing tracking system.

## How It Works

### 1. Check for Latest Unprocessed Log

**Endpoint:** `GET /api/v1/hardware/check-latest?garage_id=YOUR_GARAGE_ID`

**Response when there's an unprocessed log:**

```json
{
  "status": "success",
  "action": "accepted", // or "denied"
  "data": {
    "logId": "60d5ecb74b24a1234567890a",
    "accessTime": "2024-01-15T10:30:00.000Z",
    "user": {
      "name": "John Doe",
      "phoneNumber": "1234567890"
    },
    "plateId": "ABC123"
  }
}
```

**Response when no unprocessed logs:**

```json
{
  "status": "success",
  "message": "No unprocessed logs found",
  "action": "denied",
  "data": null
}
```

### 2. Mark Log as Processed

**Endpoint:** `POST /api/v1/hardware/mark-processed`

**Request Body:**

```json
{
  "logId": "60d5ecb74b24a1234567890a"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Log marked as processed",
  "data": {
    "logId": "60d5ecb74b24a1234567890a",
    "processed": true
  }
}
```

## Updated Hardware Code

Replace your current hardware code with this:

```cpp
// API base URL
const char* apiBaseUrl = "http://server.com/api/v1/hardware/check-latest";

// Garage ID
const String garage_id = "GATE_1";

void checkGateAccess() {
  // Build the full API URL with garage_id as a query parameter
  String apiUrl = String(apiBaseUrl) + "?garage_id=" + garage_id;
  Serial.println("Requesting: " + apiUrl);

  http.begin(apiUrl);
  int httpCode = http.GET();

  if (httpCode == HTTP_CODE_OK) {
    String response = http.getString();
    Serial.println("Response: " + response);

    // Parse JSON response (you might want to use ArduinoJson library)
    if (response.indexOf("\"action\":\"accepted\"") >= 0) {
      // Extract logId from response (implement JSON parsing)
      String logId = extractLogIdFromResponse(response);

      // Open the gate
      openGate();

      // Mark the log as processed so it won't trigger again
      markLogAsProcessed(logId);

    } else {
      // Either denied or no unprocessed logs
      ensureGateClosed();
    }
  }

  http.end();
}

void markLogAsProcessed(String logId) {
  HTTPClient httpPost;
  httpPost.begin("http://server.com/api/v1/hardware/mark-processed");
  httpPost.addHeader("Content-Type", "application/json");

  String postData = "{\"logId\":\"" + logId + "\"}";

  int httpCode = httpPost.POST(postData);
  if (httpCode == HTTP_CODE_OK) {
    Serial.println("Log marked as processed successfully");
  } else {
    Serial.println("Failed to mark log as processed");
  }

  httpPost.end();
}

String extractLogIdFromResponse(String response) {
  // Implement JSON parsing to extract logId
  // For now, simple string parsing (better to use ArduinoJson)
  int logIdStart = response.indexOf("\"logId\":\"") + 9;
  int logIdEnd = response.indexOf("\"", logIdStart);
  return response.substring(logIdStart, logIdEnd);
}

void loop() {
  checkGateAccess();
  delay(5000); // Check every 5 seconds
}
```

## Benefits

1. **No Repeated Actions**: Each log entry is only processed once
2. **Stateful Tracking**: The system remembers which logs have been acted upon
3. **Clean State Management**: Hardware and backend stay in sync
4. **Audit Trail**: You can see which logs have been processed and when

## Migration Notes

- Existing logs will have `processed: false` by default
- No authentication required for hardware endpoints (adjust if needed)
- The system is backward compatible with existing log viewing functionality
