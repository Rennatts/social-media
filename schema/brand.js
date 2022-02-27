const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


let BrandSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 150
    },
    products: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 100
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    created: {
        type: Date, 
        default: Date.now
    },
    likes: [{
        type: ObjectId, 
        ref: "user"
    }],
    followers: [{
        type: ObjectId,
        ref: "user",
    }],
    posts: [{
        type: ObjectId,
        ref: "post",
    }],
},
{
    timestams: true,
}
);


const BrandModel = mongoose.model("brand", BrandSchema);

module.exports = BrandModel;