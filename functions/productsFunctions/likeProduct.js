const Post = require('../../schema/post');


module.exports = (req, res) => {
  Post.findByIdAndUpdate(
      req.body.productId,
      {$push: {likes: req.body.branduserId}},
      {new: true}
  ).exec((err, result) => {
      if(err) {
        res.json({error: err});
      } else {
        res.json(result);
      }
  });

};