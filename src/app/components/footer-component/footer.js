import React from 'react';
import './footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className='footer-container footer-color'>
                <p className='footer-text'>©2019 Market</p>
                <p className='footer-text'>•</p>
                <p className='footer-text'>Privacy Policy</p>
            </div>
        )

    }
}

export default Footer;