import React from 'react';
import { connect } from "react-redux";

import minusIcon from '../../../assets/images/minus.svg';
import plusIcon from '../../../assets/images/plus.svg';
import basketIcon from '../../../assets/images/basket-blue.svg';
import './basket.css'

class Basket extends React.Component {

    render() {
        return (
            <div className='basket-container'>
                <div className='basket-content'>
                    <div>
                        {
                            this.props.basket === null || this.props.basket.length === 0 ? (
                                <div className='basket-empty basket-product-name'>
                                    <div className='container-x'>
                                        <img src={basketIcon} className="basket-empty-icon" alt='basket' />
                                        <br />
                                        Yout basket is empty
                                        <br />
                                        Add items to your cart to order
                                    </div>

                                </div>
                            ) : (
                                <div className='test'>
                                    {this.props.basket.map((productItem, productIndex) => (
                                        <div className='basket-card-container'>
                                            <div className='basket-card flex-row'>
                                                <div className='basket-button-cc'>
                                                    <div className='basket-product-name'>
                                                        {productItem.product.name}
                                                    </div>
                                                    <div className='basket-price'>
                                                        {productItem.product.price}
                                                    </div>

                                                </div>

                                                <div className='basket-button flex-row'>

                                                    <div className='basket-button-icon' onClick={() => {

                                                        debugger

                                                        var count = { value: productItem.count - 1, index: productIndex }
                                                        if (count.value === 0) {
                                                            console.log("delete Item Index", productIndex)
                                                            this.props.onPriceExtraction(productItem.product.price)
                                                            this.props.onDeleteFromBasket(productIndex)
                                                        } else {

                                                            this.props.onPriceExtraction(productItem.product.price)
                                                            this.props.onChangeCountByIndexForBasket(count)
                                                            console.log("Product Count Change", productItem.count)

                                                        }


                                                    }}>
                                                        <img src={minusIcon} className='basket-button-img' alt='plus'></img>
                                                    </div>

                                                    <div className='basket-button-count'>
                                                        {productItem.count}
                                                    </div>

                                                    <div className='basket-button-icon' onClick={() => {
                                                        debugger
                                                        var val = { value: productItem.count + 1, index: productIndex }

                                                        this.props.onPriceAddition(productItem.product.price)
                                                        this.props.onChangeCountByIndexForBasket(val)
                                                        console.log("Product Count Change", productItem.count)
                                                    }}>
                                                        <img src={plusIcon} className='basket-button-img' alt='minus'></img>
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
                            {Number(this.props.price).toFixed(2)}
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
    onDeleteFromBasket: value =>
        dispatch({ type: 'DELETEFROMBASKET', value: value }),
    onChangeCountByIndexForBasket: value =>
        dispatch({ type: 'UPDATECOUNTBYINDEX', value: value }),
    onPriceAddition: value =>
        dispatch({ type: 'ADDITION', value: value }),
    onPriceExtraction: value =>
        dispatch({ type: 'EXTRACTION', value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);