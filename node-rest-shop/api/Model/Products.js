const mongooes = require('mongoose');
const productschema = mongooes.Schema({
    _id : mongooes.Schema.Types.ObjectId,
    name : String,
    price : { type :Number, required : true}
})

module.exports = mongooes.model('Product', productschema);