"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocket = null;
let receiverSocket = null;
wss.on("connection", function connection(ws) {
    ws.on("message", function message(data) {
        const message = JSON.parse(data);
        console.log(message);
        if (message.type === "sender") {
            senderSocket = ws;
        }
        else if (message.type === "receiver") {
            receiverSocket = ws;
        }
        else if (message.type === "create-offer") {
            receiverSocket.send(JSON.stringify({
                type: "create-offer",
                offer: message.offer
            }));
        }
        else if (message.type === "create-answer") {
            senderSocket.send(JSON.stringify({
                type: "create-answer",
                answer: message.answer
            }));
        }
    });
});
