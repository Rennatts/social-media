const Product = require("../../schema/products");

module.exports = async (req, res) => {
  try {
    let posts = await Product.find({ branduser: req.params.branduserId });
    res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};