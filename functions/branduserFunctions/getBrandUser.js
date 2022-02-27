
module.exports = (req, res) => {
    req.brandprofile.hashed_password = undefined;
    req.brandprofile.salt = undefined;
    return res.json(req.brandprofile);
    
};