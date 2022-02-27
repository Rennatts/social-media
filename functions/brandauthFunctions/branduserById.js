const BrandUser = require('../../schema/branduser');


module.exports = (req, res, next, id) => {
    BrandUser.findById(id)
    //populate followers and following users array
    .exec((err, branduser) => {
        if(err || !branduser) {
            return res.status(400).json({
                error: "user not found"
            });
        }
        req.brandprofile = branduser //adds profile object in req with user info
        next();
    });
    
};