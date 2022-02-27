const Branduser = require('./../../schema/branduser');


module.exports = async (req, res) => {
  Branduser.findByIdAndUpdate(
    req.params.branduserId,
    {$push: {likes: req.params.userId}},
    {new: true}
  ).exec((err, result) => {
    if(err) {
      res.json({error: err});
    } else {
      res.json(result);
    }
  });
  

};