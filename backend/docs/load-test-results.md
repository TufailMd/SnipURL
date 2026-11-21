# SnipURL - Load Test Results

## Baseline (Before Optimization)

### Configuration

- Tool: k6
- Virtual Users: 100
- Duration: 30 seconds
- Dataset: 50,000 URLs
- Endpoint: GET /:id
- Database: MongoDB Atlas
- Environment: Local Windows machine

### Results

| Metric          |  Baseline |
| --------------- | --------: |
| Total Requests  |     3,507 |
| Requests/sec    |    114.36 |
| Average Latency | 869.54 ms |
| Median Latency  | 951.79 ms |
| p90 Latency     |  1.08 sec |
| p95 Latency     |  1.14 sec |
| Maximum Latency |  3.01 sec |
| Failed Requests |         0 |
| Error Rate      |        0% |

### Observations

- All requests returned HTTP 302.
- No failed HTTP requests.
- p95 latency was 1.14 seconds.
- Baseline recorded before Redis caching and asynchronous analytics.

### Conclusion

This is the initial performance baseline.
The same test configuration will be used after optimization
to measure performance improvements.
