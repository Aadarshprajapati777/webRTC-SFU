import { useEffect, useState } from "react"

export default function Sender() {

    const[Socket, setSocket] = useState<WebSocket | null>(null);


    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type:"sender",
            }))
        }
        setSocket(ws);
    }, []);
    async function  startSendingVideo(){
            const pc = new RTCPeerConnection();
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            if (Socket) {
                Socket.send(JSON.stringify({
                    type: "create-offer",
                    offer: pc.setLocalDescription
                }))
                Socket.onmessage = async (event) => {
                    const message = JSON.parse(event.data);
                    if (message.type === 'create-answer') {
                        await pc.setRemoteDescription(message.sdp);
                        console.log("Answer set");
                    }
                }
            }

    }
    return(
        <div>
            <h1>Sender</h1>
            <button onClick={startSendingVideo}> send offer</button>
        </div>  

    )
}
