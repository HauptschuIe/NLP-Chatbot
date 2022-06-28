import React, { Component } from 'react';
import SendIcon from '../../components/send-icon/send-icon.component';
import './input.styles.css'

class Input extends React.Component {

    constructor() {
        super();
        this.state = {
            inputActive: false,
            inputHasText: false,
        };
    }

    handleKeyDown(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            return this._submitText(event);
        }
    }

    handleKeyUp(event) {
        const inputHasText = event.target.innerHTML.length !== 0 &&
            event.target.innerText !== '\n';
        this.setState({ inputHasText });
    }

    _submitText(event) {
        event.preventDefault();
        const text = this.userInput.textContent;
        if (text && text.length > 0) {
            this.props.onSubmit({
                sender: 'me',
                data: { text }
            });
            this.userInput.innerHTML = '';
        }
        this.setState({ inputHasText: false });
    }


    _renderSend() {
        if (this.state.inputHasText) {
            return (
                <div className="user-input--button">
                    <SendIcon onClick={this._submitText.bind(this)} />
                </div>
            );
        }
    }

    render() {

        return (
            <form className={`user-input ${(this.state.inputActive ? 'active' : '')}`}>
                <div
                    role="button"
                    tabIndex="0"
                    onFocus={() => {
                        this.setState({ inputActive: true });

                    }}
                    onBlur={() => { this.setState({ inputActive: false }); }}
                    ref={(e) => { this.userInput = e; }}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    onKeyUp={this.handleKeyUp.bind(this)}
                    contentEditable="true"
                    placeholder="Write a reply..."
                    className="user-input--text"
                >
                </div>
                <div className="user-input--buttons">
                    <div className="user-input--button">
                        <SendIcon onClick={this._submitText.bind(this)} inputHasText={this.state.inputHasText} />
                    </div>
                </div>
            </form>
        );
    }
}



export default Input;