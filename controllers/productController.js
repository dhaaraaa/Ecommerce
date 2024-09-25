const productModel = require('../models/productModel');
// get products api - /api/v1/products
exports.getProducts = async (req, res, next) => {
    // what im giving on api which fetch the product crtly even i dont
    // give it shows all the product -req.query.keyword....and this regex go and find data on the mongodb if it matches
    // options-i this matches whether it is case insensitive or upper/lowercase
    const query = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const products = await productModel.find(query);
    res.json({
        success: true,
        products
    })
}
// get singleproduct api - /api/v1/product/id

exports.getSingleProduct = async (req, res, next) => {
    try {

        console.log(req.params.id, 'ID')
        const product = await productModel.findById(req.params.id)
        res.json({
            success: true,
            product
        })
    } catch (error) {
        res.json({
            success: false,
            message: 'unable to get a product with that id'
        })
    }

}