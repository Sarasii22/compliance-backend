type Rule record {
    string rule;
    string status;
    string process;
};

type ScanResponse record {
    Rule[] results;
    string[] alerts;
};