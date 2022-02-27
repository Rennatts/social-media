const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


let ProductsSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 150,
    },
    category: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 50

    },
    description: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 1000
    },
    brand: {
        type: ObjectId, 
        ref: "branduser"
    },
    name: {
        type: Object
    },
    size: {
        type: Object
    },
    key: {
        type: Object
    },
    url: {
        type: Object
    },
    created: {
        type: Date, 
        default: Date.now
    },
    likes: [{
        type: ObjectId, 
        ref: "user"
    }],
    rating: [{
        type: ObjectId, 
        ref: "user"
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


ProductsSchema.pre('save', function(){
    if(!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});


ProductsSchema.pre('remove', function() {
    if(process.env.STORAGE_TYPE === "s3"){
        return s3.deleteObject({
            Bucket: 'my-first-buker',
            Key: this.key,
        }).promise()
    } else {
        return promisify(fs.unlink)(path.resolve(__dirname, "..", "uploads", this.key));

    }
});


module.exports = mongoose.model("products", ProductsSchema);