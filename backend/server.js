const express = require('express');
const responseTime = require('response-time');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

client.collectDefaultMetrics({ register });

// Custom Counter
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status']
});

// Custom Histogram for response time
const httpResponseTime = new client.Histogram({
    name: 'http_response_time_seconds',
    help: 'Response time in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 3]
});

register.registerMetric(httpRequestCounter);
register.registerMetric(httpResponseTime);

app.use(responseTime((req, res, time) => {
    httpRequestCounter.inc({
        method: req.method,
        route: req.path,
        status: res.statusCode
    });

    httpResponseTime.observe({
        method: req.method,
        route: req.path,
        status: res.statusCode
    }, time / 1000);
}));

app.get('/api', (req, res) => {
    res.json({ message: "Monitored Backend Running 🚀" });
});

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
