module.exports = (req, res) => {
    if(req.brandprofile.photo) {
        res.set(("Content-Type:", req.brandprofile.photo.contentType));
        return res.send(req.brandprofile.photo.data);
    } 
};
