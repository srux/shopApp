import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import {api} from '../../API';
import Item from './Item';
import {FiChevronRight, FiChevronLeft} from "react-icons/fi";
import {
    Row,
    Container,
    Button
} from 'react-bootstrap';

class ProductsListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            sorted:false,

            offset: 0,
            perPage: 10,
            currentPage: 0,
            pageCount: 0,

            purchaser_id: null,
            product: null
        }
        this.handlePageClick = this
        .handlePageClick
        .bind(this);
    }

    

    componentDidMount() {
        this.getProducts()
    }


    getProducts = () => {
        api.getProducts()
        .then(res => {
           
            const data = res.data;
            console.log(data.length)
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

            this.setState({
                products:slice,
                pageCount: Math.ceil(data.length / this.state.perPage),
            })
        });

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

        handlePageClick = (e) => {
            const selectedPage = e.selected;
            const offset = selectedPage * this.state.perPage;
    
            this.setState({
                currentPage: selectedPage,
                offset: offset
            }, () => {
                this.getProducts()
            });
    
        };

        handleSwipeProductsLeft = () => {
            let currentPage = this.state.currentPage
            let newPage = currentPage +1
            let pageCount = this.state.pageCount

    
            const selectedPage = currentPage;
            const offset = selectedPage * this.state.perPage;

            if (currentPage != pageCount-1) {
                this.setState({
                    currentPage: newPage,
                    offset: newPage*10
                }, () => {
                    this.getProducts()
                });
            }
            else {
                return
            }
            console.log('swipteLeft')
        }

        handleSwipeProductsRight = () => {
            let currentPage = this.state.currentPage
            let newPage = currentPage -1

            const selectedPage = currentPage;
            const offset = selectedPage * this.state.perPage;
            
            if (currentPage !== 0) {
                this.setState({
                    currentPage: newPage,
                    offset: newPage*10
                }, () => {
                    this.getProducts()
                });
            }
           
            
            console.log('swipteRigt')
        }

        addDefaultSrc(ev) {
            ev.target.src = '/coming-soon.png'
        }

    render() {
        let {
            products,
        } = this.state;

        let loading = this.state.loading;

        return (
            <Container className="productsListing-Container">
            <Row className="filter">
                <Row className="filter-container">
                <Button
                    className="filter-button"
                    onClick={this.handleProductsSortName}
                    value="pants">Sort by Title</Button>
                <Button
                    className="filter-button"
                    onClick={this.handleProductsSortPrice}
                    value="footwear">Sort by Price</Button>
                </Row>
            </Row>
            <ReactScrollWheelHandler
                rightHandler={this.handleSwipeProductsRight}
                leftHandler={this.handleSwipeProductsLeft}
                className="swipeHandler"
            >
           
                <Row className="productsListing">
                <Item products={products}/>
                </Row>
                </ReactScrollWheelHandler>
            
            <ReactPaginate
                    previousLabel={<FiChevronLeft/>}
                    nextLabel={<FiChevronRight/>}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </Container>
        );
    }
}

export default ProductsListing;
