import http from "k6/http";

export const options = {
    vus: 100,
    duration: "5m",
}

export default function() {
    let randomInt = Math.floor(Math.random() * (100000 - 90000)) + 90000;
    http.get("http://localhost:3003/house/all?page=" + randomInt);
};