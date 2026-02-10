const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const app = express();
app.use(cors());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// custom metric
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests"
});

app.get("/api", (req, res) => {
  httpRequestCounter.inc();
  res.json({ message: "Cloud Monitoring API working" });
});

// Prometheus endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
