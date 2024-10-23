const express = require('express');
const router = express.Router();
const Product = require('../model/productModle');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dx6hzlis9',
    api_key: '263623349676867',
    api_secret: '5nM_JHi5hRYY4TCE2qB7bhToZso'
});

// GET Request

router.get('/',checkAuth ,(req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).json({
                productData: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Product.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                productData: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


// POST request 
router.post('/', (req, res, next) => {
    console.log(req.body);
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result);
        let product = new Product({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            code: req.body.code,
            price: req.body.price,
            description: req.body.description,
            sp: req.body.sp,
            disconnectPercent: req.body.disconnectPercent,
            imagePath: result.url
        });
        product.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    new_product: result
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    Error: err
                });
            });
    });
    
});

// DELET Request 

router.delete('/:id', (req, res, next) => {
    Product.findByIdAndDelete({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Deleted data',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});


// PUT Request

router.put('/:id', (req, res, next) => {
    // const id = mongoose.Types.ObjectId(res)
    Product.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            code: req.body.code,
            price: req.body.price,
            description: req.body.description,
            sp: req.body.sp,
            disconnectPercent: req.body.disconnectPercent,
            imagePath: req.body.imagePath
        }
    })
        .then(result => {
            res.status(200).json({
                updated: result
            })
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({
                error: err.message
            })
        })
});



module.exports = router;