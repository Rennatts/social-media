const Product = require('../../schema/products');


module.exports = async(req, res, next) => {

    const name = new Array;
    for(let i= 0; i < req.files.length; i++){
        name.push(req.files[i].originalname);

    }

    const size= new Array;
    for(let i= 0; i < req.files.length; i++){
        size.push(req.files[i].size);

    };

    const key= new Array;
    for(let i= 0; i < req.files.length; i++){
        key.push(req.files[i].key);

    };

    
    const url = new Array;
    for(let i= 0; i < req.files.length; i++){
        url.push(req.files[i].location);

    };


    const product = await Product.create({
        created: Date.now(),
        productname: req.body.productname,
        category: req.body.category,
        description: req.body.description,
        brand: req.brandprofile,
        name: [],
        size: [],
        key: [],
        url: []
        
    });



    // Push an array to object
    product.name = name;
    product.size = size;
    product.key = key;
    product.url = url;

    
    product.brand.hashed_password = undefined;
    product.brand.salt = undefined;

    product.save((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(result);
    });

    console.log(product);
};
