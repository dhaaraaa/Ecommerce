const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
// create order - /api/v1/order
exports.createOrder =async (req, res, next) => {
    const cartitems = req.body;
     const amount = Number(cartitems.reduce((acc, item)=>(acc + item.product.price * item.qty),0)).toFixed(2);
     const status = 'pending'

      const order = await orderModel.create({cartitems,amount,status})

    //   updating product stock
    cartitems.forEach(async (item) => {
        const product= await productModel.findById(item.product._id);
        product.stock = product.stock - item.qty;
        await product.save();
        
    });

    // console.log(req.body, 'DATA');
    res.json({
        success: true,
        order
    })
}
