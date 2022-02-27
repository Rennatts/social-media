const BrandUser = require('./../../schema/branduser');


module.exports = (req, res) => {
    const { size, key, location: url = ""} = req.file;
    BrandUser.findByIdAndUpdate(req.params.branduserId, 
        {$set: 
            {
                name: req.file.originalname,
                size,
                key,
                url,
                updated: Date.now(),
                brandname: req.body.brandname,
                about: req.body.about,
                password: req.body.password,
            }},
            {new: true},
            function(err, branduser){
                if(err) {
                    res.json({error: err});
                }else{
                    branduser.hashed_password = undefined;
                    branduser.salt = undefined;
                    res.send(branduser);
                }
            }
    );

};


