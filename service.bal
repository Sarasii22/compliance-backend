import ballerina/http;
import ballerina/log;
import ballerina/email;

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

        string[] alerts = ["Alert: New " + country + " regulation detected."];
        ScanResponse response = { results: results, alerts: alerts };

        http:Response res = new;
        res.statusCode = 200;
        res.setJsonPayload(response.toJson());
        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }

    resource function options scan(http:Request req) returns http:Response {
        http:Response res = new;
        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }

    // POST /contact endpoint
    resource function post contact(http:Request request) returns http:Response|error {
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

    // Convert to ContactRequest record
    ContactRequest|error contactData = payload.cloneWithType(ContactRequest);
    if contactData is error {
        log:printError("Invalid contact data", 'error = contactData);
        http:Response res = new;
        res.statusCode = 400;
        res.setJsonPayload({ "error": "Invalid contact data" });
        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }

    log:printInfo("Received contact data: " + contactData.toString());

    // Set up SMTP configuration with START_TLS_AUTO on port 587
    email:SmtpConfiguration smtpConfig = {
        port: 587,
        security: email:START_TLS_AUTO
    };

    // Set up SMTP client
    email:SmtpClient smtpClient = check new (
        "smtp.gmail.com",
        "warnakulasarasi@gmail.com",
        "bjoiztvbxkjvwzaw",  
        smtpConfig
    );

    log:printInfo("SMTP client initialized");

    // Compose the email
    email:Message emailMsg = {
        to: ["warnakulasarasi@gmail.com"],
        'from: "warnakulasarasi@gmail.com",
        subject: "New Contact Message from " + contactData.name,
        body: "Message: " + contactData.message + "\n\nFrom: " + contactData.name + " (" + contactData.email + ")"
    };

    log:printInfo("Email message composed");

    // Send the email
    error? sendResult = smtpClient->sendMessage(emailMsg);
    if sendResult is error {
        log:printError("Failed to send email", 'error = sendResult);
        http:Response res = new;
        res.statusCode = 500;
        res.setJsonPayload({ "error": "Failed to send message" });
        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }

    log:printInfo("Email sent successfully");

    // Success response
    http:Response res = new;
    res.statusCode = 200;
    res.setJsonPayload({ "message": "Message sent successfully" });
    res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.addHeader("Access-Control-Allow-Headers", "Content-Type");
    return res;
    }
    resource function options contact(http:Request req) returns http:Response {
        http:Response res = new;
        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }
}

