import React, {Component} from 'react';
import {Link} from '@reach/router';
import {api, server} from '../../API';
import {Card, Container, Carousel, Button, ListGroup} from 'react-bootstrap';
import Modal from 'react-awesome-modal';
import {MdClose} from "react-icons/md";


class UserProduct extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    }
  }
  
  openModal = () => {
    this.setState({visible: true});
  }

  closeModal = () => {
    this.setState({visible: false});
  }

  deleteProduct = () => {
    var {id, refreshData} = this.props;
    this.closeModal()
    api.deleteProduct(id).then(() => refreshData())
  }
  

  deletePhoto = (e) => {
    var photo = e.target.dataset.name;
    var {id,photos,refreshData} = this.props;

    var data = {
      photos: photos.filter(item => item!==photo)
      // console.log()
    }

    api.updateProduct(id, data).then(()=> refreshData());

  }

  addDefaultSrc(ev){
    ev.target.src = '/coming-soon.png'
  }


  render(){
    var {name, price, id, photos,seller_id} = this.props;

    return(
      
      <>
      <div className="Item userItem">
      <Card>
          {/* <Carousel interval={null}>
            {
              photos ? photos.map(photo =>
              <Carousel.Item className="productImage">
                <Card.Img variant="top" src={server+photo}/>
                <i data-name={photo} onClick={this.deletePhoto} className="fas fa-trash deleteButton"></i>
              </Carousel.Item>) : null
            }
          </Carousel> */}

          <Card.Body>
              <Carousel interval={null}>
                  {
                    photos ? photos.map(photo =>
                    <Carousel.Item className="productImage">
                      <Card.Img variant="top" src={server+photo} onError={this.addDefaultSrc}/> 
                      <i data-name={photo} onClick={this.deletePhoto} className="fas fa-trash deleteButton"></i>
                    </Carousel.Item>) : null
                  }
                </Carousel>
              <ListGroup variant="flush">


              <ListGroup.Item className="prodName"><Link to={'/products/'+id}>{name}</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                      <span className="itemPrice">$ {price}</span>
              </ListGroup.Item>

                 
                  {seller_id==localStorage.getItem('userID')?<><ListGroup.Item className="edit"><Link to={'/products/'+id+'/edit'} refreshData={this.refreshData}>Edit</Link></ListGroup.Item>
                  <ListGroup.Item onClick={this.openModal} className="delete linkColor">Remove</ListGroup.Item></>:null}
                  

              </ListGroup>

          </Card.Body>
      </Card>
 

<Container className="modalStyle">
<Modal
  visible={this.state.visible}
  width="90%"
  height="50%"
  effect="fadeInUp"
  onClickAway={() => this.closeModal()}>
  <div className="deleteModal">
      <span>
          <p onClick={() => this.closeModal()}>
          <MdClose/>
          </p>
      </span>
      <h3>Are You Sure You Want To Delete This Product?</h3>
      <div class="buttons">
        <Button variant="primary" onClick={() => this.closeModal()}>Cancel</Button>
        <Button variant="primary" onClick={() => this.deleteProduct()}>Delete</Button>
      </div>
  </div>
</Modal>
</Container>

    </div>

    </>
    );
  }
}

export default UserProduct;
