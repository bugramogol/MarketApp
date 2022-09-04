import React from 'react';
import './Header.css';
import Logo from '../../../assets/logo/logo.png';

class Header extends React.Component {

  render() {
    return (
      <div className='Header HeaderBackground flex-row'>
        <div className=''>
          <img src={Logo} className='Logo' alt='Logo'/>
        </div>
        <div className='Basket'>
          BASKET
        </div>
      </div>
      
    )
    
  }
}

export default Header;