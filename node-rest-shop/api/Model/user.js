const mongooes = require('mongoose');

const userSchema = mongooes.Schema({
    _id : mongooes.Schema.Types.ObjectId,
    email : {type : String,
         requred : true,
        unique : true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
    password : {type : String, required : true}
})

module.exports = mongooes.model('User', userSchema);