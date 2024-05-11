import { WebSocketServer } from "ws";


const wss = new WebSocketServer({ port: 8080 });

let senderSocket: any = null;
let receiverSocket: any = null;

wss.on("connection", function connection(ws){
    ws.on("message", function message(data:any){
        const message= JSON.parse(data);
        console.log(message);


    if(message.type === "sender"){
        senderSocket = ws;
    }
    else if(message.type==="receiver"){
        receiverSocket = ws;
    } 
    else if(message.type==="create-offer"){
        receiverSocket.send(JSON.stringify({
            type:"create-offer",
            offer: message.offer
        }))
    }
        else if(message.type==="create-answer"){
            senderSocket.send(JSON.stringify({
                type: "create-answer",
                answer:message.answer
            }))
        }
    }

    )
})

