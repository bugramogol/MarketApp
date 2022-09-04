import React from "react";
import "./ProductCard.css";
import Mug from '../../../assets/images/mug.jpg';
import Shirt from '../../../assets/images/shirt.jpg';

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
        };
    }

    componentDidMount() {

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
                            <div className='product-image'>

                            </div>
                            /*this.state.product.itemType == "mug" ? (
                                <img src={Mug} className='product-image' />
                            ) : (
                                <img src={Shirt} className='product-image' />
                            )*/
                        }
                    </div>
                    <div className='product-price-label'>₺ {this.state.product.price}</div>
                    <div className='product-name-label'>{this.state.product.name}</div>
                    <button className="product-add-button">Add</button>
                </div>
            </div>

        );
    }
}

export default ProductCard;
