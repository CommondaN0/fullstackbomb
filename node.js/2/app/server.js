import { addNum, getArr } from "./stores/arr.js"
import http from 'http'

const server = http.createServer((req, res) => {
    res.end(JSON.stringify(getArr()));
    addNum(5);
    addNum(10);
    console.log(getArr());
});

server.listen(3000);