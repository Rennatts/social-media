const Products = require('../../schema/products');



module.exports = (req, res) => {
    const posts = Products.find()
    .select("_id productname category description brand created likes rating url key")
    .sort({ created: -1})
    .then(posts => {
        res.json(posts);
    })
    .catch(err => console.log(err));
};