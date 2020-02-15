import React, {Component} from 'react';
import Product from '../components/products/Product';
import {api} from '../API';
import {Container, Row} from 'react-bootstrap';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";


class RouteCat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: null,
            loadingClass:'hide'
        }
    }

    routeGetCat = (id) => {
        api
            .getCategory(id)
            .then(res => this.setState({category: res.data}))
    }

    componentDidMount() {
        var {
            id
        } = this
            .props
            this
            .routeGetCat(id)
    }

    componentDidUpdate(prevProps, prevState) {
        var {
            id
        } = this.props

  

        if (id !== prevProps.id) {
            this.setState({
                 loading:true,
                 loadingClass:''
            })
            this.routeGetCat(id)
            setTimeout( () => {
                this.setState({
                    loading:false,
                    loadingClass:'hide'
                })
            },800)
        }
    }

    render() {
        let {
            category,
            loading,
            loadingClass
        } = this.state

        const override = css`
            display: block;
            margin: 0 auto;
            border-color: red;
            `;

        return category
            ? (
                <Container className="categoryContainer">
                <div className={"loading "+loadingClass}>
                <BarLoader
                  css={override}
                  className={'loader'}
                  size={150}
                  //size={"150px"} this also works
                  color={"#A68B3C"}
                  loading={this.state.loading}
                />
              </div>  
                <Row className="noListing">
                    <h6>Sorry, there are currently 0 listings under
                        <p>{category.name}</p>
                    </h6>
                </Row>
                <Row className="productsListing">

                    {
                        category
                            .products
                            .reverse()
                            .map((item) => {
                                var itemProps = {
                                    ...item,
                                    key: item.id,
                                    refreshData: () => this.routeGetCat(category.name)
                                };
                                return (<Product {...itemProps}/>)
                            })
                    }

                </Row>
            </Container>
               
            )
            : null

    }
}

export default RouteCat;