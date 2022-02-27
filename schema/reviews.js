const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


let ReviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 150
    },
    body: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 2000
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "user"
    },
    created: {
        type: Date, 
        default: Date.now
    },
    likes: [{
        type: ObjectId, 
        ref: "user"
    }],
    comments: [{
        text: String, 
        created: {type: Date, default: Date.now},
        postedBy: {
            type: ObjectId,
            ref: "user",
        },
    }],
},
{
    timestams: true,
}
);


const ReviewSchema = mongoose.model("reviews", ReviewsSchema);

module.exports = ReviewSchema;