import './Footer.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return (
        <footer title='Footer' id='footer'>
            <p id='footer-icon-group'>
                <FontAwesomeIcon icon={faTwitter} id='footer-icon' />
                <FontAwesomeIcon icon={faInstagram} id='footer-icon' />
                <FontAwesomeIcon icon={faFacebook} id='footer-icon' />
                <span id='footer-text'>© 2022 Bualadh Bus</span>
            </p>
        </footer>
    )
}