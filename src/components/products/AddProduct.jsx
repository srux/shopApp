import React, {Component} from 'react';
import {navigate} from '@reach/router';
import {api} from '../../API';
import NumberFormat from 'react-number-format';
import {Button, Form} from 'react-bootstrap';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state ={
            price:''
        }
    }

    submitForm = (e) => {
        e.preventDefault();

        let form = new FormData(this.form);

        api
            .uploadPhotos(form)
            .then(res => {

                let files = res.data
                let inputPrice = this.state.price;

                let data = {
                    name: form.get('name-input'),
                    description: form.get('description-input'),
                    price: inputPrice,
                    cat_name: form.get('cat-input'),
                    seller_id: this.props.user.id,
                    photos: files
                }
                api
                    .addProduct(data)
                    .then(() => {
                        this
                            .props
                            .refreshCurrentUser()
                        navigate('/products')
                    })
            })
    }

    handleCurrency = (e) => {
        e.preventDefault(e)
        // Convert input string to a number and store as a variable.
        let price = e.target.value;   
        this.setState({
            price:price+'.00',
        })
    }

    render() {

        return (

            <Form
                className="productForm"
                onSubmit={this.submitForm}
                ref={(el) => {
                    this.form = el
                }}>
                <Form.Group className="catSelect" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Category:</Form.Label>
                    <Form.Control id="cat-input" name="cat-input" as="select">
                        <option value="pants">Pants</option>
                        <option value="footwear">Footwear</option>
                        <option value="tops">Tops</option>
                        <option value="accessories">Accessories</option>
                        <option value="suits">Suits</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBnaasicName">
                    <Form.Control
                        type="text"
                        className="form-control"
                        name="name-input"
                        id="name-input"
                        placeholder="Name of your product"/>
                </Form.Group>
                <Form.Group controlId="formBasicDesc">
                    <Form.Control
                        type="text"
                        className="form-control"
                        name="description-input"
                        id="description-input"
                        placeholder="Product description"/>
                </Form.Group>
                <Form.Group className="price-input-group" controlId="formBasicPrice">
                    <div className="priceInput">
                        <span>$</span><Form.Control
                            onChange={this.handleCurrency}
                            type="number"
                            className="form-control"
                            name="price-input"
                            id="price-input"
                            placeholder="Enter price"/></div>
                </Form.Group>

                <Form.Group controlId="formBasicPhoto">
                    <Form.Control
                        type="file"
                        className="form-control"
                        name="photo-input"
                        id="photo-input"
                        placeholder="Add photo"
                        multiple="multiple"/>

                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Product
                </Button>
            </Form>

        );
    }
}

export default AddProduct;
