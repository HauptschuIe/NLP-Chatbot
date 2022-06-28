import React, { Component } from 'react';
import ChatWindow from '../chat-window/chat-window.component';
import launcherIcon from '../../assets/logo-no-bg.svg';
import launcherIconActive from '../../assets/close-icon.png';
import openIcon from '../../assets/close-icon.png'
import closeIcon from '../../assets/chat-icon.svg'
import './launcher.styles.css'


class Launcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            launcherIcon,
            isOpen: false
        };
    }
    handleClick() {
        if (this.props.handleClick !== undefined) {
            this.props.handleClick();
        } else {
            this.setState({
                isOpen: !this.state.isOpen,
            });
        }
    }
    render() {
        const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
        const classList = [
            'launcher',
            (isOpen ? 'opened' : ''),
        ];
        return (
            <div id="launcher">
                <div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
                    <img className={'open-icon'} src={launcherIconActive} />
                    <img className={'closed-icon'} src={launcherIcon} />
                </div>
                <ChatWindow
                    isOpen={isOpen}
                    onClose={this.handleClick.bind(this)}
                />
            </div>

        );
    }
}


export default Launcher
