import Socket from './socket';

interface Message {
    roomID: string;
    type: string;
    message: string;
    time: string
};

const s = new Socket('ws://localhost:8765/');
const sendBtn: HTMLButtonElement = document.getElementById('SendBtn');
const textInput: HTMLTextAreaElement = document.getElementById('TextInput');

sendBtn.addEventListener('click', function(){
    const time = new Date();
    const hours: string = time.getHours().toString().padStart(2, '0');
    const minute: string = time.getMinutes().toString().padStart(2, '0');
    const seconds: string = time.getSeconds().toString().padStart(2, '0');

    let value: string = textInput.value;

    let msgJson: Message = {
        roomID: "1",
        type: "message",
        message: value,
        time: `${hours} : ${minute} : ${seconds}`
    }
    
})
