import React, { Component } from 'react';
import Message from '../message/message.component'

import './chat.styles.css'

class Chat extends Component {

    componentDidUpdate(_prevProps, _prevState) {
        this.scrollList.scrollTop = this.scrollList.scrollHeight;
    }

    render() {
        return (
            <div className="message-list" ref={el => this.scrollList = el}>
                {this.props.messages.map((message, i) => {
                    return <Message message={message} key={i} />;
                })}
            </div>);
    }
}

export default Chat;