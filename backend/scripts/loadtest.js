import http from "k6/http";
import { check } from "k6";
import { Counter } from "k6/metrics";

const unexpectedResponses = new Counter("unexpected_responses");

export const options = {
  vus: 100,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    unexpected_responses: ["count<1"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  // Use a random test slug to distribute requests
  const id = Math.floor(Math.random() * 50000);
  const url = `${BASE_URL}/loadtest-${id}`;

  const response = http.get(url, {
    redirects: 0,
    tags: { endpoint: "redirect" },
  });

  const success = check(response, {
    "status is 302": (r) => r.status === 302,
  });

  if (!success) {
    unexpectedResponses.add(1);
  }
}
