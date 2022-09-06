import React from 'react';
import { connect } from "react-redux";
import './header.css';
import Logo from '../../../assets/logo/logo.svg';
import Basket from '../../../assets/images/basket.svg';
class Header extends React.Component {

  render() {
    return (
      <div className='Header HeaderBackground flex-row'>
        <div className='Main-Container'>
          <div className='header-cont'>
            <div className='empty'>
              -
            </div>
            <div className='header-container'>
              <img src={Logo} className='Logo' alt='Logo' />
            </div>
            <div className='basket-containerr'>
              <div className='Basket'>
                <div className='image-content'>
                  <img src={Basket} className='basket-icon' alt='Basket' />
                </div>
                ₺ {Number(this.props.price).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.price
  };
}
const mapDispatchToProps = dispatch => ({
  onPushToBasket: value => dispatch({ type: 'ADDPRODUCTTOBASKET', value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);