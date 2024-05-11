
import  { useEffect } from 'react';
export default function Receiver() {
    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type:"receiver",
            }))
        }

        ws.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if(message.type=== "create-offer"){
                console.log("offer received");
                const pc = new RTCPeerConnection();
                await pc.setRemoteDescription(message.offer);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                ws.send(JSON.stringify({
                    type: "create-answer",
                    answer: pc.localDescription
                }))
                console.log("answer sent to sender");

            }
        }

    }, []);
    return(
        <div>
            <h1>Receiver</h1>
        </div>  

    )
}
