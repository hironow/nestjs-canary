import http from 'k6/http';
import { sleep } from 'k6';

const base = 'http://localhost:3000';

export const options = {
  duration: '.5m',
  vus: 5,
  iterations: 10,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
  },
};

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

  pingAndHello();
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

const pingAndHello = () => {
  let query = `
    query Multi {
        ping
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
};
