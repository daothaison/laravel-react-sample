import React, { Component } from 'react';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newProduct: {
                title: '',
                description: '',
                price: 0,
                availability: 0
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {
        var state = Object.assign({}, this.state.newProduct);
        state[key] = e.target.value;
        this.setState({newProduct: state });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.newProduct);
    }

    render() {
        return(
            <div className="add-product">
                <h2> Add new product </h2>

                <form onSubmit={this.handleSubmit}>

                    <label>
                        Title:
                        <input className="input-product" type="text" onChange={(e)=>this.handleInput('title',e)} />
                    </label>

                    <label>
                        Description:
                        <input className="input-product"  type="text" onChange={(e)=>this.handleInput('description',e)} />
                    </label>

                    <label>
                        Price:
                        <input className="input-product"  type="number" onChange={(e)=>this.handleInput('price', e)}/>
                    </label>

                    <input className="input-product"  type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default AddProduct;