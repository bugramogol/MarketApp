import React from 'react';
import { connect } from "react-redux";
import './header.css';
import Logo from '../../../assets/logo/logo.svg';
import Basket from '../../../assets/images/basket.svg';
class Header extends React.Component {

  render() {
    return (
      <div className='header-container header-background-color flex-row'>
        <div className='main-container'>
          <div className='header-content'>
            <div className='empty'></div>
            <div className='header-image-container'>
              <img src={Logo} className='header-image' alt='Logo' />
            </div>
            <div className='header-basket-containerr'>
              <div className='header-basket-content'>
                <div className='basket-image-content'>
                  <img src={Basket} className='basket-image' alt='Basket' />
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