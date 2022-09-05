import React from 'react';
import { connect } from "react-redux";
import './Header.css';
import Logo from '../../../assets/logo/logo.png';
import Basket from '../../../assets/images/basket.svg';
class Header extends React.Component {

  constructor(props) {
    super(props);
    var A = 0;

  }

  render() {
    return (
      <div className='Header HeaderBackground flex-row'>
        <div className='header-container'>
          <img src={Logo} className='Logo' alt='Logo' />
        </div>
        <div className='Basket'>
          <div>
            <img src={Basket} className='basket-icon' alt='Basket' />
          </div>
          ₺ {this.props.price.toFixed(2)}
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
  onPushToBasket: value => dispatch({ type: 'ADDTOBASKET', value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);