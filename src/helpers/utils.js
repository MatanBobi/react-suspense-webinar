export const simulateSleep = ms => {
    let now = Date.now();
    while (Date.now() < now + ms) {
        // noop
    }
};

export const sendAnalyticsPing = (value) => {
    performance.mark("analytics-start");
    simulateSleep(25);
    performance.mark("analytics-end");
    performance.measure(
        "Analytics: " + value,
        "analytics-start",
        "analytics-end"
    );
};

