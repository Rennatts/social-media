module.exports = (req, res, next) => {
    const authorized = req.brandprofile && req.auth && req.brandprofile._id === req.auth._id;
    if(!authorized) {
        return res.json({
            error: "User is not authorized to perform this action"
        });
    }
    next();
};



