import React, {Component} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'

import Item from './Item';
import {Link} from '@reach/router';
import {api} from '../../API';
// import Carousel from 'react-multi-carousel';
import {
    Col,
    Card,
    Image,
    Row,
    Jumbotron,
    Container,
    Button
} from 'react-bootstrap';

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 3,
        partialVisibilityGutter: 55 // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 3,
        partialVisibilityGutter: 55 // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 100 // this is needed to tell the amount of px that should be visible.
    }
}

class ProductListings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            priceBy:false
        }
    }

    handleProductsSortName = e => {
        e.preventDefault();
        let array = this.state.products;
        if (this.state.sorted === false) {
            array.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        } else {
            array.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                return 0;
            });
        }
    
        this.setState({ products: array });
        this.setState(prevState => ({ sorted: !prevState.sorted }))
    };
    
    handleProductsSortPrice = e => {
        e.preventDefault();
        let array = this.state.products;
        if (this.state.sorted === false) {
            array.sort((a, b) => {
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                return 0;
            });
        } else {
            array.sort((a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            });
        }
    
        this.setState({ 
            products: array,
        });
        this.setState(prevState => ({ 
            sorted: !prevState.sorted, 
        }));
        

        };
        
      
    

    getProducts = () => {
        api.getProducts()

            .then(res => {
                this.setState({products: res.data})
            })
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        let {
            products
        } = this.state;
        return (

            <div className="Item carousel-container">
                <h3>Featured</h3>
                {/* <Carousel swipeable={true} draggable={false} showDots={true} responsive={responsive} ssr={true}
                    // means to render carousel on server-side.
                    infinite={true} autoPlay={this.props.deviceType !== "mobile"
                        ? false
                        : false} autoPlaySpeed={1000} keyBoardControl={true} customTransition="ease all .5s" transitionDuration={500} containerClass="carousel-container" removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={this.props.deviceType} dotListClass="custom-dot-list-style" itemClass="CarousalItem carousel-item-padding-40-px" partialVisbile={false}> */
                }
                <div className="hContainer">
                    <ScrollContainer className="hScroller">

                        <div className="Item">
                            <Card>
                                <Link to="/featured"><Card.Img variant="featured" src={require('../../assets/suit1.png')}/></Link>
                                <Card.Body>
                                    <Card.Title>Dries Van Noten Pin Stripe
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="Item">
                            <Card>
                                <Link to="/featured"><Card.Img variant="featured" src={require('../../assets/watch1.png')}/></Link>
                                <Card.Body>
                                    <Card.Title>Lorem ipsum dolor
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="Item">
                            <Card>
                                <Link to="/featured"><Card.Img variant="featured" src={require('../../assets/suit2.png')}/></Link>
                                <Card.Body>
                                    <Card.Title>Ut ut gravida augue
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="Item">
                            <Card>
                                <Card.Img variant="featured" src={require('../../assets/footwear1.png')}/>
                                <Card.Body>
                                    <Card.Title>Curabitur vitae
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="Item">
                            <Card>
                                <Card.Img variant="featured" src={require('../../assets/suit3.png')}/>
                                <Card.Body>
                                    <Card.Title>Suspendisse massa
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="Item">
                            <Card>
                                <Link to="/featured"><Card.Img variant="featured" src={require('../../assets/watch2.png')}/></Link>
                                <Card.Body>
                                    <Card.Title>Sed vel consequat ligula
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="Item">
                            <Card>
                                <Link to="/featured"><Card.Img variant="featured" src={require('../../assets/footwear2.png')}/></Link>
                                <Card.Body>
                                    <Card.Title>Aliquam egestas
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="Item">
                            <Card>
                                <Link to="/featured"><Card.Img variant="featured" src={require('../../assets/suit4.png')}/></Link>
                                <Card.Body>
                                    <Card.Title>Praesent quis est
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="Item">
                            <Card>
                                <Link to="/featured"><Card.Img variant="featured" src={require('../../assets/footwear3.png')}/></Link>
                                <Card.Body>
                                    <Card.Title>Interdum et malesuada
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="Item">
                            <Card>
                                <Link to="/featured"><Card.Img variant="featured" src={require('../../assets/watch3.png')}/></Link>
                                <Card.Body>
                                    <Card.Title>Sed ligula risus
                                    </Card.Title>

                                </Card.Body>
                            </Card>
                        </div>
                    </ScrollContainer>
                </div>
                {/* </Carousel> */}
                <Container className="productsListing-Container">
                    <Row className="filter">
                        <Button
                            className="filter-button"
                            onClick={this.handleProductsSortName}
                            value="pants">Sort A-Z</Button>
                        <Button
                            className="filter-button"
                            onClick={this.handleProductsSortPrice}
                            value="footwear">Sort by Price</Button>
                    </Row>
                      
                    <Row className="productsListing">
                        {
                            products
                                .map((item) => {
                                    let itemProps = {
                                        ...item,
                                        key: item.id,
                                        refreshData: this.getProducts,
                                    }
                                    return <Item {...itemProps}/>

                                })
                        }
                    </Row>
                </Container>
                <Container className="imageGrid">
                    <Row>
                        <Jumbotron fluid="fluid">
                            <Link to="/our-store">
                                <Container>
                                    <h1>Our Store</h1>
                                    <p>
                                        We stock a huge range of new & second hand trade in's. We check the listing
                                        matches the product for quality assurance, verify and then list.
                                    </p>
                                </Container>
                            </Link>
                        </Jumbotron>

                    </Row>
                    <Row>
                        <Col>
                            <Link to="/categories/accessories"><Image src="/accessories.jpg" fluid="fluid"/></Link>
                        </Col>
                        <Col>
                            <Link to="/categories/suits"><Image src="/suits.jpg" fluid="fluid"/></Link>
                            <Link to="/categories/footwear"><Image src="/footwear.jpg" fluid="fluid"/></Link>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }

}

export default ProductListings;
