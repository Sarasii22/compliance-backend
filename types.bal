public type Rule record {
    string rule;
    string status;
    string process;
};

public type ScanResponse record {
    Rule[] results;
    string[] alerts;
};

public type ContactRequest record {
    string name;
    string email;
    string message;
};