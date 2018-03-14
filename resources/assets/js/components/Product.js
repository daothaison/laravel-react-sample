import React, { Component } from 'react';

class Product extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const product = this.props.product;
        if(!product) {

            return(<div className="product" ><h2>  No Product was selected </h2> </div>);
        }

        return(
            <div className="product">
                <h2> {product.title} </h2>
                <p> {product.description} </p>
                <h3> Status {product.availability ? 'Available' : 'Out of stock'} </h3>
                <h3> Price : {product.price} </h3>
                <button className="btn btn-primary btn-50" type="button"
                        onClick={() => this.props.onUpdateProduct(product)}>
                    Edit
                </button>
                <button className="btn btn-danger btn-50" type="button"
                        onClick={() => this.props.onDeleteProduct(product)}>
                    Delete
                </button>
            </div>
        )
    }
}

export default Product;