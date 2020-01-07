const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/categories', (req,res) => {
        admin.firestore()
        .collection('categories')
        .orderBy('name','desc')
        .get()
        .then(data => {
            let categories = [];
            data.forEach(doc => {
                categories.push({
                    categoryId: doc.id,
                    id:doc.data().id,
                    name:doc.data().name
                });
            });
            return res.json(categories);
        })
        .catch((err) => console.log(err));
    });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// exports.helloworld = functions.https.onRequest((req, res) => {
//     res.send('hello world');
// });

// exports.getCategories = functions.https.onRequest((req, res) => {


app.post('/category', (req,res) => {
    const newCat = {
        id: req.body.id,
        name: req.body.name,
        // createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };
    admin.firestore()
        .collection('categories')
        .add(newCat)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({ error: 'somethign went wrong'});
            console.error(err);
        });
    });

    // https://baseurl.com/api/categories

    exports.api = functions.https.onRequest(app);