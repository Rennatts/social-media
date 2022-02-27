const BrandUser = require('./../../schema/branduser');


module.exports =  async(req, res) => {
    try{
        let {brandname, email, password, city, zip_code, state, address } = req.body;
        let userExists = await (await BrandUser.findOne({email}));

        if(userExists) return res.status(401).send("email already registered");

        const branduser = await new BrandUser({
            brandname, 
            email,
            password,
            city, 
            zip_code, 
            state, 
            address 
        });

        await branduser.save();
        res.status(200).json({branduser});

    } catch(error) {
        console.error(error.message);
        return res.status(500).send("server error");
    }

    res.send("branduser is created");
    
};