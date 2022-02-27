const Post = require('./../../schema/post');
const User = require('./../../schema/users');


module.exports = (req, res) => {
    let comment = {text: req.body.text};
    comment.postedBy = req.body.userId;

    Post.findByIdAndUpdate(
        req.body.postId,
        { $push: {comments: comment }},
        {new: true}
    )
    .sort({ created: -1 })
    .exec((err,result) => {
        if(err){
            res.json({error: err});
        } else {
            res.json(result);
        }
    });

};

