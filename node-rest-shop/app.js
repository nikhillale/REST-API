const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ProductRoutes = require('./api/Routes/Product'); 
const OrderRoutes = require('./api/Routes/orders'); 
const UserRoutes = require('./api/Routes/users');
mongoose.connect('mongodb+srv://nikhil:nikhil@node-rest-shop-6yene.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser:true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, GET, PATCH, DELETE'); 
        return res.status(200).json({});
    }
    next();
});

//---------------------------------process.env.JWT_KEY---
app.use('/product', ProductRoutes);process.env.JWT_KEY
app.use('/orders', OrderRoutes);process.env.JWT_KEY
app.use('/users', UserRoutes);process.env.JWT_KEY
process.env.JWT_KEY
process.env.JWT_KEY
app.use((res, req, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error :{
            message : error.message
        }
    })
})

module.exports=app;