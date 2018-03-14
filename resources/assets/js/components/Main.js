import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            currentProduct: null,
            isEdit: false
        }

        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
        this.doUpdateProduct = this.doUpdateProduct.bind(this);
    }

    componentDidMount() {
        axios.get('/api/products')
            .then(res => {
                const products = res.data
                this.setState({ products });
            })
    }

    handleClick(product) {
        this.setState({ currentProduct: product, isEdit: false})
    }

    handleAddProduct(product) {
        product.price = Number(product.price)

        axios.post('/api/products', product)
            .then(res => {
                this.setState((prevState) => ({
                    products: prevState.products.concat(res.data),
                    currentProduct: res.data
                }))
            })
            .catch(error => {
                console.error(error.toString())
            })
    }

    handleDeleteProduct(product) {
        axios.delete('/api/products/'+product.id)
            .then(res => {
                this.setState((prevState) => ({
                    products: prevState.products.filter(p => p.id != product.id ),
                    currentProduct: null
                }))
            })
            .catch(error => {
                console.error(error.toString())
            })
    }

    handleUpdateProduct() {
        this.setState((prevState) => ({
            isEdit: !prevState.isEdit
        }))
    }

    doUpdateProduct(product) {
        axios.put('/api/products/' + product.id, product)
            .then(res => {
                this.setState((prevState) => ({
                    products: prevState.products.filter(p => p.id != product.id ).concat(res.data),
                    currentProduct: res.data
                }))
            })
            .catch(error => {
                console.error(error.toString())
            })
        this.handleUpdateProduct()
    }

    renderProducts() {
        return this.state.products.map(product => {
            return (
                <li className="list-product" onClick={
                    () => this.handleClick(product)} key={product.id} >
                    { product.title }
                </li>
            );
        })
    }

    render() {
        return (
            <div>
                <div className="main-div-style">
                    <div className="div-style">
                        <h3> All products </h3>
                        <ul>
                            { this.renderProducts() }
                        </ul>

                    </div>
                    { !this.state.isEdit ? <Product product={this.state.currentProduct}
                                                    onDeleteProduct={this.handleDeleteProduct}
                                                    onUpdateProduct={this.handleUpdateProduct} />
                        : <EditProduct product={this.state.currentProduct} onBack={this.handleUpdateProduct}
                                                                            onUpdate={this.doUpdateProduct} />
                    }
                    <AddProduct onAdd={this.handleAddProduct} />
                </div>

            </div>
        )
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}