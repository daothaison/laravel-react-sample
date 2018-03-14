import React, { Component } from 'react';

class EditProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editedProduct: this.props.product
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUpdate(this.state.editedProduct)
    }

    handleInput(key, e) {
        var state = Object.assign({}, this.state.editedProduct);
        state[key] = e.target.value;
        this.setState({editedProduct: state });
    }

    render() {
        let product = this.state.editedProduct;
        if(!product) {

            return(<div className="product" ><h2>  No Product was selected </h2> </div>);
        }

        return(
            <div className="product">
                <h2> Edit product </h2>

                <form id="product" className="form-group" onSubmit={this.handleSubmit}>
                    <label>Title:</label>
                    <input className="form-control input-edit-product" type="text"
                           onChange={(e)=>this.handleInput('title',e)} value={ product.title } />

                    <label> Description:</label>
                    <input className="form-control input-edit-product" type="text"
                           onChange={(e)=>this.handleInput('description',e)} value={ product.description } />

                    <label> Price:</label>
                    <input className="form-control input-edit-product" type="number"
                           onChange={(e)=>this.handleInput('price', e)} value={ product.price }/>

                    <input className="form-control input-edit-product" type="submit" value="Save" />

                    <button className="btn btn-info btn-50" type="button"
                            onClick={() => this.props.onBack()}>
                        Back
                    </button>
                </form>
            </div>
        )
    }
}

export default EditProduct;