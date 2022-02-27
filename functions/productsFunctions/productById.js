const Product = require('./../../schema/products');

module.exports = (req, res, next, id) => {
  Product.findById(id)
  .populate("brand", "_id brandname")
  .select("_id productname category description created likes url key")
  .sort({ created: -1 })
  .exec((err, product) => {
      if(err || !product) {
          return res.status(400).json({
              error: err
          })
      }
      req.product = product
      next();

  });
};