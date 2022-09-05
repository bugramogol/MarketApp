import React from 'react';
import { connect } from "react-redux";
import './Basket.css';
import minus from '../../../assets/images/minus.svg';
import plus from '../../../assets/images/plus.svg';
import basket from '../../../assets/images/basket-blue.svg';
class Basket extends React.Component {

    render() {
        return (
            <div className='basket-container'>
                <div className='basket-content'>
                    <div>
                        {this.props.basket === null || this.props.basket.length === 0 ? (
                            <div className='basket-empty basket-product-name'>
                                <div className='container-x'>
                                    <img src={basket} className="basket-empty-icon" alt='basket' />
                                    <br />
                                    Yout basket is empty
                                    <br />

                                    Add items to your cart to order
                                </div>

                            </div>
                        ) : (
                            <div className='test'>
                                {this.props.basket.map((item, index) => (
                                    <div className='basket-card-container'>
                                        <div className='basket-card flex-row'>
                                            <div>
                                                <div className='basket-product-name'>
                                                    {item.product.name}
                                                </div>
                                                <div className='basket-price'>
                                                    {item.product.price}
                                                </div>

                                            </div>
                                            <div className='basket-button flex-row'>
                                                <div className='basket-button-icon'>
                                                    <img src={minus} className='basket-button-img' alt='minus'></img>
                                                </div>
                                                <div className='basket-button-count'>
                                                    {item.count}
                                                </div>
                                                <div className='basket-button-icon'>
                                                    <img src={plus} className='basket-button-img' alt='plus'></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                    {this.props.basket === null || this.props.basket.length === 0 ? (
                        null
                    ) : (
                        <div className='basket-total'>
                            {this.props.price.toFixed(2)}
                        </div>
                    )
                    }

                </div>

            </div >

        )
    }
}

const mapStateToProps = (state) => {
    return {
        price: state.price,
        basket: [...state.basket]
    };
}
const mapDispatchToProps = dispatch => ({
    onPushToBasket: value =>
        dispatch({ type: 'ADDTOBASKET', value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);