import React from 'react';
import chatIconUrl from './../../assets/chat-icon.svg';
import Linkify from 'react-linkify';
import './message.styles.css'


function Message(props) {

    let contentClassList = [
        'message--content',
        (props.message.sender === 'me' ? 'sent' : 'received')
    ];
    return (
        <div className="message">
            <div className={contentClassList.join(' ')}>
                <div className="message--text">{
                    <Linkify properties={{ target: '_blank' }}>{props.message.data.text}</Linkify>
                }</div>
            </div>
        </div>
    );
};

export default Message;



