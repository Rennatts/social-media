const Products = require("./../../schema/products");


module.exports = async (req, res) => {
  const { searchBrand, searchProductname } = req.body;

  try {
    let products = await Products.find()
    .populate("brand", "_id brandname url key")
    .select("_id productname category description created likes url key");

    if (searchBrand === "" || searchBrand === null || searchProductname === "" || searchProductname === null) {
      res.status(401).json(products);
    } else {
      const findPostBySearchInput = products.filter(
        (product) => 
          String(product.brand.brandname).toLowerCase().split(" ").join("") ===
          String(searchBrand).toLowerCase().split(" ").join("") &&
          String(product.productname).toLowerCase().split(" ").join("") ===
          String(searchProductname).toLowerCase().split(" ").join("")
      );
      res.json(findPostBySearchInput);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }

};