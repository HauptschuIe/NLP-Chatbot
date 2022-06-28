import React, { Component, useEffect, useState } from 'react';
import Header from '../../components/header/header.component';
import Chat from '../../components/chat/chat.component';
import Input from '../../components/input/input.component';
import './chat-window.styles.css'

function ChatWindow(props) {

    const [messageList, setMessageList] = useState([{ sender: 'them', data: { text: 'Howdy!' } }, { sender: 'them', data: { text: 'I am a weather bot and you can ask me for the weather conditions in any city.' } }]);

    const _onMessageWasSent = (message) => {
        setMessageList(messageList => [...messageList, message]);
        rasaAPI(message)
    }

    const rasaAPI = async function handleClick(msg) {

        //chatData.push({sender : "user", sender_id : name, msg : msg});
        await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'charset': 'UTF-8',
            },
            credentials: "same-origin",
            body: JSON.stringify({ "sender": "me", "message": msg.data.text }),
        })
            .then(response => response.json())
            .then((response) => {
                if (response) {


                    response.map((respons, i) => {
                        if (respons.text) {

                            const response_temp = { sender: "them", data: { text: respons.text } };
                            setMessageList(messageList => [...messageList, response_temp]);
                        }
                        if (respons.image) {
                            const response_temp = { sender: "them", data: { text: respons.image } };
                            setMessageList(messageList => [...messageList, response_temp]);
                        }

                    })
                    // scrollBottom();

                }
            })

    }


    let classList = [
        'chat-window',
        (props.isOpen ? 'opened' : 'closed')
    ];
    return (
        <div className={classList.join(' ')}>
            <Header onClose={props.onClose} />
            <Chat messages={messageList} />
            <Input onSubmit={_onMessageWasSent.bind(this)} />
        </div>
    );
}




export default ChatWindow;