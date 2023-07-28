import http from 'k6/http';
import { check, sleep } from k6;

export const options = {

    stages: [
        { duration: '10s', target: 5 },
        { duration: '15s', target: 10 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of request should be below 200ms
        checks:['rate>0.9'], //the rate of successful checks should be higjer than 90%
    }
}

export default function () {
    const res = http.get('https://test.k6.io');
    check(res, {
        "response code was 200": (res) => res.status == 200,
    });
    sleep(1);
}