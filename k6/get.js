import http from "k6/http";

export const options = {
    rps: 2000,
    vus: 70,
    duration: "5m",
    thresholds: {
        'failed requests': ['rate<0.1']
    }
}

export default function() {
    let randomInt = Math.floor(Math.random() * (10000000 - 8000000)) + 8000000;
    http.get("http://localhost:3003/house/" + randomInt+ "/");
};