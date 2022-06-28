import React, { Component } from 'react';
import closeIcon from '../../assets/close-icon.png';
import headerImg from '../../assets/logo2.png'

import './header.styles.css'

function Header(props) {
    return (
        <div className="header">
            <img className="header--img" src={headerImg} alt="" />
            <div className="header--team-name"> Weather Bot </div>
            <div className="header--close-button" onClick={props.onClose}>
                <img src={closeIcon} alt="" />
            </div>
        </div>
    );
}

export default Header;