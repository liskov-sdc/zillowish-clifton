import http from "k6/http";
import { sleep } from "k6";
import mock from '../database/createMockData.js';

export const options = {
    vus: 200,
    duration: "5m"
}

export default function() {
    let update = mock.createFeatures(1);
    let randomInt = Math.floor(Math.random() * (10000000 - 9000000)) + 9000000;
    http.put("http://localhost:3003/house/" + randomInt+ "/", {features: update[0]});
};