const BrandUser = require("../../schema/branduser");


module.exports = (req, res)=> {
    BrandUser.find((err, brandusers) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({brandusers})
    }).select("brandname email updated created url key");
};