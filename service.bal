import ballerina/http;
import ballerina/log;

// Define a record for the response structure (matches frontend JSON)
type Rule record {
    string rule;
    string status;
    string process;
};

type ScanResponse record {
    Rule[] results;
    string[] alerts;
};

// Hardcoded regulations data (same as frontend regulations.json)
map<Rule[]> regulations = {
    "Singapore": [
        { "rule": "KYC verification within 24 hours", "status": "Gap Detected", "process": "Onboarding" },
        { "rule": "AML transaction monitoring", "status": "Compliant", "process": "Transactions" }
    ],
    "Sri Lanka": [
        { "rule": "Customer ID verification", "status": "Compliant", "process": "Onboarding" },
        { "rule": "Suspicious activity reporting", "status": "Gap Detected", "process": "Transactions" }
    ],
    "EU": [
        { "rule": "GDPR data consent", "status": "Compliant", "process": "Data Processing" },
        { "rule": "Data breach notification", "status": "Gap Detected", "process": "Security" }
    ]
};

// HTTP service on port 9090
service / on new http:Listener(9090) {

    // POST /scan endpoint
    resource function post scan(http:Request request) returns http:Response|error {
        // Parse incoming JSON payload
        json|error payload = request.getJsonPayload();
        if payload is error {
            log:printError("Invalid JSON payload", 'error = payload);
            http:Response res = new;
            res.statusCode = 400;
            res.setJsonPayload({ "error": "Invalid request payload" });
            res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.addHeader("Access-Control-Allow-Headers", "Content-Type");
            return res;
        }

        // Extract country from payload
        json|error countryJson = payload.country;
        if countryJson is error || !(countryJson is string) {
            log:printError("Missing or invalid country");
            http:Response res = new;
            res.statusCode = 400;
            res.setJsonPayload({ "error": "Missing or invalid country" });
            res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.addHeader("Access-Control-Allow-Headers", "Content-Type");
            return res;
        }
        string country = <string>countryJson;

        // Get mock results from regulations
        Rule[]? results = regulations[country];
        if results is () {
            log:printError("Unsupported country: " + country);
            http:Response res = new;
            res.statusCode = 400;
            res.setJsonPayload({ "error": "Country not supported" });
            res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.addHeader("Access-Control-Allow-Headers", "Content-Type");
            return res;
        }

        // Simulate alerts
        string[] alerts = ["Alert: New " + country + " regulation detected."];

        // Build response
        ScanResponse response = { results: results, alerts: alerts };

        // Create HTTP response with CORS headers
        http:Response res = new;
        res.statusCode = 200;
        res.setJsonPayload(response.toJson());
        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }

    // Handle OPTIONS for CORS preflight
    resource function options scan(http:Request req) returns http:Response {
        http:Response res = new;
        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }
}