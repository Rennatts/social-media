const Post = require('../../schema/post');

module.exports = (req, res) => {
    const posts = Post.find()
    .populate("postedBy", "_id name url key followers")
    .populate("comments", "text created")
    .populate('comments.postedBy', '_id name')
    .select("_id brand productname url key body created likes")
    .sort({ created: -1})
    .then(posts => {
        res.json(posts);
    })
    .catch(err => console.log(err));
    
};


