import axios from 'axios';


// var url = 'ec2-52-62-211-212.ap-southeast-2.compute.amazonaws.com:4001';
// var server = 'ec2-52-62-211-212.ap-southeast-2.compute.amazonaws.com:4001';

// var url = 'http://localhost:4001/api';
// var server = 'http://localhost:4001/';

var url = 'https://3b0fc7ac.au.ngrok.io/api';
var server = 'https://3b0fc7ac.au.ngrok.io/';

// var url = 'https://quick-tiger-49.localtunnel.me/api';
// var server = 'https://quick-tiger-49.localtunnel.me/';

// var url = 'https://shopappapi.appspot.com/api';
// var server = 'https://shopappapi.appspot.com/';

var api = {


    addProduct : (data) => {
        return axios.post(url+'/products',data)
    },
    
    updateProduct : (id,data) => {
        return axios.put(url+'/products/'+id,data)
    },

    updateProducts : (id,data) => {
        return axios.put(url+'/products/'+id,data)
    },
    
    
    deleteProduct : (id) => {
        return axios.delete(url+'/products/'+id)
    },
    
    getProducts : () => {
        return axios.get(url+'/products')
    },

    getProduct : (id) => {
        return axios.get(url+'/products/'+id)
    },
    
    getCategories : () => {
        return axios.get(url+'/categories')
    },

    getCategory : (id) => {
        return axios.get(url+'/categories/'+id)
    },
    
    uploadPhoto : (data) => {
        return axios.post(url+'/upload',data)
    },

    uploadPhotos : (data) => {
        return axios.post(url+'/uploads',data)
    },

    authenticate : (data) => {
        return axios.post(url+'/authenticate',data)
    },

    getUser : (id) => {
        return axios.get(url+'/users/'+id)
    },
    addUser: (data) => {
       return axios.post(url+'/users/',data)
    },

    updateUser: (id,data) => {
        return axios.put(url+'/users/'+id,data)
     },
    deleteUser: (id) => {
        return axios.delete(url+'/users/'+id)
    },

    addReview : (data) => {
        return axios.post(url+'/reviews',data)
    },
    

}





export {server, api}