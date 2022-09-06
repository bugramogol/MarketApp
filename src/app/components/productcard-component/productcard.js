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

    componentDidUpdate(prevProps) {
        if (this.props.product !== prevProps.product) {
            this.setState({ product: this.props.product });
        }
    }

    render() {
        return (
            <div className="Product-main-Container">
                <div className="product-container">
                    <div className="product-image-container">
                        {
                            this.state.product.itemType == "mug" ? (
                                <img src={MugIcon} className='product-image' />
                            ) : (null)
                        }

                        {
                            this.state.product.itemType == "shirt" ? (
                                <img src={ShirtIcon} className='product-image' />
                            ) : (null)
                        }
                    </div>
                    <div className='product-price-label'>₺ {this.state.product.price}</div>
                    <div className='product-name-label'>{this.state.product.name}</div>
                    <button className="product-add-button" onClick={() => {
                        this.props.onPriceAddition(this.state.product.price)
                        this.props.onPushProductBasket(this.state.product);
                    }}>
                        Add
                    </button>
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
        dispatch({ type: 'ADDTOBASKET', value: value }),
    onPriceAddition: value =>
        dispatch({ type: 'ADDITION', value: value }),
    onPriceExtraction: value =>
        dispatch({ type: 'EXTRACTION', value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);

