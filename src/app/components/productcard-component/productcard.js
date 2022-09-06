import React from "react";
import { connect } from "react-redux";

import MugIcon from '../../../assets/images/mug.jpg';
import ShirtIcon from '../../../assets/images/shirt.jpg';
import "./productcard.css";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
        };
    }
    /* Update product when its changed on parent */
    componentDidUpdate(prevProps) {
        if (this.props.product !== prevProps.product) {
            this.setState({ product: this.props.product });
        }
    }

    onProductAdd() {
        this.props.onPriceAddition(this.state.product.price)
        this.props.onPushProductBasket(this.state.product);
    }

    render() {
        return (
            <div className="product-container">
                <div className="product-content">
                    <div className="product-content-image-container">
                        {
                            this.state.product.itemType === "mug" ? (
                                <img src={MugIcon} className='product-image' alt='mug-image' />
                            ) : (null)
                        }

                        {
                            this.state.product.itemType === "shirt" ? (
                                <img src={ShirtIcon} className='product-image' alt='shirt-image' />
                            ) : (null)
                        }
                    </div>
                    <div className='product-price-label'>₺ {this.state.product.price}</div>
                    <div className='product-name-label'>{this.state.product.name}</div>
                    <button className="product-add-button" onClick={() => this.onProductAdd()}> Add </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = dispatch => ({
    onPushProductBasket: value =>
        dispatch({ type: 'ADDPRODUCTTOBASKET', value: value }),
    onPriceAddition: value =>
        dispatch({ type: 'ADDITIONTOPRICE', value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);

