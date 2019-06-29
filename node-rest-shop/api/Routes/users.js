const express = require('express');
const router = express.Router();
const mongooes = require('mongoose');
const User = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next)=>{
    
    User.find({ email : req.body.email})
    .exec()
    .then(result =>{
        if(result.length >= 1){
            res.status(409).json({
                message : "Email already Exist !"
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err , hash)=>{
                if(err){
                    res.status(500).json({error : err});
                }else{
                   const user = new User({
                       _id : new  mongooes.Types.ObjectId(),
                       email : req.body.email,
                       password : hash
                   })
                   user.save()
                    .then(result =>{
                        res.status(201).json({
                            message : 'User created',
                            user : result
                        })
                    })
                    .catch( err =>{
                        res.status(500).json({error : err});
                    });
                }
                
            })
        }
    })
    
})

router.post('/login',(req, res, next)=>{
    User.find({email : req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                message : "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err , resul)=>{
            if(err){
                return res.status(401).json({
                    message : "Auth failed"
                });
            }
            if(resul){
                const token = jwt.sign(
                    { email : user[0].email,
                      userId : user[0]._id
                    },
                    "secret",
                    {
                        expiresIn : "1h"
                    });
                return res.status(200).json({
                    message : "Auth Success",
                    Token : token
                });
            }
            res.status(401).json({
                message : "Auth failed"
            });
        })
        
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            error : error
        })
    });
})

router.delete('/:userId',function(req, res, next){
    
    User.remove({_id : req.params.userId})
    .exec()
    .then( result=>{
        res.status(200).json({
            message : 'User deleted'
        })
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            error : error
        })
    });
})

module.exports = router;