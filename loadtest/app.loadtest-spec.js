import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base = 'http://localhost:3000';

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data),
  };
}

export default function () {
  let query = `
    query  {
        sayHello
    }`;

  let headers = {
    'Content-Type': 'application/json',
  };

  let res = http.post(`${base}/graphql`, JSON.stringify({ query: query }), {
    headers: headers,
  });

  if (res.status === 200) {
    console.log(JSON.stringify(res.body));
  }

  sleep(1);

  ping();
}

const ping = () => {
  let query = `
    query  {
        ping
    }`;

  let headers = {
    'Content-Type': 'application/json',
  };

  let res = http.post(`${base}/graphql`, JSON.stringify({ query: query }), {
    headers: headers,
  });

  if (res.status === 200) {
    console.log(JSON.stringify(res.body));
  }
};
