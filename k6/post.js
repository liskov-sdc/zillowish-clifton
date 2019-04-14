import http from "k6/http";
import { sleep } from "k6";
import mock from '../database/createMockData.js';

export const options = {
    vus: 200,
    duration: "5m"
}

export default function() {
    let post = mock.createFeatures(1);
    http.post("http://localhost:3003/house/", {features: post[0]});
};