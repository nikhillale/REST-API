const Order = require('../Model/order');
exports.orders_get_all = (req, res, next)=>{
   
    Order.find()
    .select('product quantity _id')
    .populate('product')
    .exec()
    .then( results =>{
        res.status(200).json({
            count : results.length,
            Orders : results.map(doc =>{
                return {
                    _id : doc._id,
                    Product : doc.product,
                    quantity : doc.quantity,
                    request :{
                        type : 'GET',
                        url : "http://localhost:3000/orders/" +doc._id
                    }
                }
            })
           
        })
    })
    .catch();
}

exports.order_create = (req, res, next)=>{
    
    const order = new Order({
        _id : mongooes.Types.ObjectId(),
        quantity : req.body.quantity,
        product : req.body.product
    }).save()
    .then(result =>{
        res.status(200).json({result})
    })
    .catch(error =>{
        res.status(500).json({error})
    })
}

exports.order_get_one=(req, res, next)=>{
    Order.find()
    .exec()
    .then( results =>{
        res.status(200).json({
            count : results.length,
            Orders : results,
            rrequest :{
                type : 'GET',
                url : 'http://localhost:3000/orders'
            }
        })
    })
    .catch();
}

exports.order_delete = (req, res, next)=>{
    res.status(200).json({
        message : "Order Deleted",
        Id : req.params.orderId
    })
}