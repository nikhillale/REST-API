const Product = require('../Model/Products');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './upload/');
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const upload = multer({storage :storage});


exports.get_all_product= (req, res, next) => {
    Product
    .find()
    .select("id name price")
    .exec()
    .then(result =>{
       const response ={
           count : result.length,
            producct : result.map(doc =>{
                return {
                    Name : doc.name,
                    Price : doc.price,
                    ID : doc._id,
                    request :{
                        type :'GET',
                        url : "http://localhost:3000/Product/"+ doc._id
                    }
                }
            }) 
       }
        res.status(200).json({response});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({err});
    })
}

exports.add_product= upload.single('productImage'),(req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongooes.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
   
  
    product
        .save()
        .then(result =>{
          
            res.status(200).json({
                message: 'handling POST request',
                createdproduct: {
                    Name : result.name,
                    Price : result.price,
                    ID : result._id,
                    request :{
                        type :'POST',
                        url : "http://localhost:3000/Product/"+ result._id
                    }
                }

                
            });
        })
        .catch(error =>{upload.single('productImage'),(req, res, next) => {
            console.log(req.file);
            const product = new Product({
                _id: new mongooes.Types.ObjectId(),
                name: req.body.name,
                price: req.body.price
            });
           
          
            product
                .save()
                .then(result =>{
                  
                    res.status(200).json({
                        message: 'handling POST request',
                        createdproduct: {
                            Name : result.name,
                            Price : result.price,
                            ID : result._id,
                            request :{
                                type :'POST',
                                url : "http://localhost:3000/Product/"+ result._id
                            }
                        }
        
                        
                    });
                })
                .catch(error =>{
                    console.log(error);
                    res.status(500).json({
                        error : error
                    })
                }) 
        }
            console.log(error);
            res.status(500).json({
                error : error
            })
        }) 
}


exports.get_product_by_ID =(req, res, next) => {
    const id = req.params.productID;
    Product
    .findById(id).
    exec()
    .then(doc =>{
        console.log(doc);
        if(doc){
            res.status(200).json({
                product : doc,
                request :{
                    type :'GET',
                    url : "http://localhost:3000/Product/"+ doc._id
                }
            })
        }else{
            res.status(404).json({message : "Not valid Id"})
        }
       
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            error :error
        });
    })
}

exports.update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOops ={};
    for(const ops of req.body){
        updateOops[ops.propName]= ops.value;
    }

    Product.update({ _id : id },{ $set : updateOops })
    .exec()
    .then(result =>{
        res.status(200).json({
            message : 'product updated',
            request :{
                type :'GET',
                url : "http://localhost:3000/Product/"+id
            }
        });
    })
    .catch(err =>{
        res.status(500).json(err);
    })
}

exports.delete_product =(req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id : id })
    .exec()
    .then(result =>{
        res.status(200).json({
            message : "product Delected",
            request :{
                type :'POST',
                url : "http://localhost:3000/Product/"+id,
                body : { name : String , price : Number}
            }
        });
    })
    .catch(error =>{
        res.status(500).json({error :error});
    });
}