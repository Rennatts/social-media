module.exports = (req, res) => {
    if(req.product.photo){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo)
    }

};

