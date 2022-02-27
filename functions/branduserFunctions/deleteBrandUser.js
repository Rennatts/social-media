module.exports = (req, res, next) => {
    let branduser = req.brandprofile;
    branduser.remove((err, user) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({message: "user deleted"});
    });
};