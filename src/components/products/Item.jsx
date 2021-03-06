import React, {Component} from 'react';
import {Link} from '@reach/router';
import {api, server} from '../../API';
import {Card, Col} from 'react-bootstrap';
import NumberFormat from 'react-number-format';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaser_id: null,
            product: null
        }
    }

    routeGetProduct = (id) => {
        api
            .getProduct(id)
            .then(res => this.setState({product: res.data}))
    }

    componentDidMount() {
        var {
            purchaser_id
        } = this.props;
        this.setState({purchaser_id: purchaser_id})
        var {
            id
        } = this
            .props
            this
            .routeGetProduct(id)
    }

    addDefaultSrc(ev) {
        ev.target.src = '/coming-soon.png'
    }

    render() {
        var {
            products
        } = this.props;

        return (
            products.map((item) => {
                return ( this.state.purchaser_id ? null : 
                    <Col>
                        <Card>
                            <Link to={'/products/' + item.id}>
                            
                                <NumberFormat className="itemPrice" value={item.price} displayType={'text'} thousandSeparator={true} renderText={value => <div>{"$ "+value}</div>} />
                                {/* <Card.Text className="itemPrice">${price}</Card.Text> */}
                                <Card.Img variant="top" src={server + item.photos[0]} onError={this.addDefaultSrc}/>
                            </Link>
                            <Card.Body>
                                <Card.Title>
                                    <Link to={'/products/' + item.id}>{item.name}</Link>
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </Col>
                
                )}
            )
        );
    }
}

export default Item;
