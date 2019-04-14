import http from "k6/http";
import { sleep } from "k6";

export const options = {
    rps: 2000,
    vus: 70,
    duration: "5m",
    thresholds: {
        'failed requests': ['rate<0.1']
    }
}

export default function() {
    let randomInt = Math.floor(Math.random() * (10000000 - 9000000)) + 9000000;
    http.get("http://localhost:3003/house/" + randomInt+ "/");
};