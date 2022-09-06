import React from 'react';
import { connect } from "react-redux";

import minusIcon from '../../../assets/images/minus.svg';
import plusIcon from '../../../assets/images/plus.svg';
import basketIcon from '../../../assets/images/basket-blue.svg';
import './basket.css'

class Basket extends React.Component {

    /* trigger redux event to update or delete, for count and prices*/
    onRemoveProductFromBasket(productItem, productIndex) {
        var count = { value: productItem.count - 1, index: productIndex }
        if (count.value === 0) {
            this.props.onPriceExtraction(productItem.product.price)
            this.props.onDeleteFromBasket(productIndex)
        } else {
            this.props.onPriceExtraction(productItem.product.price)
            this.props.onChangeCountByIndexForBasket(count)
        }
    }
    /* trigger redux event to update count and price */
    onAddProductToBasket(productItem, productIndex) {
        var val = { value: productItem.count + 1, index: productIndex }
        this.props.onPriceAddition(productItem.product.price)
        this.props.onChangeCountByIndexForBasket(val)
    }

    render() {
        return (
            <div className='basket-container'>
                <div className='basket-content'>
                    <div>
                        {
                            this.props.basket === null || this.props.basket.length === 0 ? (
                                <div className='basket-empty-container basket-label flex-row' >
                                    <div className='basket-empty-content flex-column'>
                                        <img src={basketIcon} className="basket-empty-icon" alt='basket' />
                                        <br />
                                        Your basket is empty
                                        <br /><br />
                                        Add items to your cart to order
                                    </div>
                                </div>
                            ) : (
                                <div className='basket-content-items-container'>
                                    {this.props.basket.map((productItem, productIndex) => (
                                        <div className='basket-card-container'>
                                            <div className='basket-card flex-row'>
                                                <div className='basket-card-label-container'>
                                                    <div className='basket-label'>
                                                        {productItem.product.name}
                                                    </div>
                                                    <div className='basket-price'>
                                                        {productItem.product.price}
                                                    </div>
                                                </div>
                                                <div className='basket-button flex-row'>
                                                    <div className='basket-button-icon'
                                                        onClick={() => { this.onRemoveProductFromBasket(productItem, productIndex) }}>
                                                        <img src={minusIcon} alt='plus'></img>
                                                    </div>

                                                    <div className='basket-button-count'>
                                                        {productItem.count}
                                                    </div>

                                                    <div className='basket-button-icon'
                                                        onClick={() => { this.onAddProductToBasket(productItem, productIndex) }}>
                                                        <img src={plusIcon} alt='minus'></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}
                    </div>
                    {
                        this.props.basket === null || this.props.basket.length === 0 ? (null) : (
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
    onDeleteFromBasket: value =>
        dispatch({ type: 'DELETEPRODUCTFROMBASKET', value: value }),
    onChangeCountByIndexForBasket: value =>
        dispatch({ type: 'UPDATECOUNTOFPRODUCTSBYINDEX', value: value }),
    onPriceAddition: value =>
        dispatch({ type: 'ADDITIONTOPRICE', value: value }),
    onPriceExtraction: value =>
        dispatch({ type: 'EXTRACTIONFROMPRICE', value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basket);