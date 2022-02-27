module.exports = (req, res) => {
    let post = req.product;
    post.remove((err, product) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Post deleted successfully!"
        })

    });

};