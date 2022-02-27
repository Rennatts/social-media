const Products = require('./../../schema/products');


module.exports = (req, res) => {
    Products.find({brand: req.brandprofile._id})
    .populate("brand", "_id brandname url")
    .select("_id productname category description created likes url key")
    .sort({ created: -1 })
    .exec((err, posts)=> {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(posts);
    });
};