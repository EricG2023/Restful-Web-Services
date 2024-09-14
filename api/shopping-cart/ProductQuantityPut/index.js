const {Types} = require("mongoose");
const makeInjectable =  require("../../../helpers/makeInjectable");


module.exports = makeInjectable({
    defaults: {
        PlankCookingModel: () => require("../models/Plankcooking")
    }
}, async function ({PlankCookingModel}, req, res) {

    //Error check for params product and fields
    if(!req.params){
        return res.status(404).json({error: "Missing params"})
    }
    if (!req.params.userId){
        return res.status(404).json({error: "Missing userId params"});
    }
    if(!req.body){
        return res.status(404).json({error : "Missing body of request"});
    }
    if(!req.body._id){
        return res.status(404).json({error: "Missing _id in body"});
    }
    if(req.body.quantity === undefined){
        return res.status(404).json({error: "Missing quantity in body"});
    }
    //finding the shopping cart with userId
    let shoppingCart = await PlankCookingModel.findOne({ userId :req.params.userId });
    if (!shoppingCart) {
        return res.status(404).json({error: "User not found"})
    }
    //Updating quantity if 0 then we will delete the product
    let updatedQuantity;
    if (req.body.quantity === 0){
        updatedQuantity = { $pull: {products: {_id: req.body._id}}}
    } else {
        updatedQuantity = {$set: {"products.$.quantity": req.body.quantity}}
    }
    //finding and updating into the database
    let updatedProduct = await PlankCookingModel.findOneAndUpdate(
    { "products._id":  req.body._id },
    updatedQuantity,
    { new: true }
    )
    if (!updatedProduct){
        return res.status(404).json({error: "Product not found"})
    }
    return res.status(200).json({ message: "Quantity Updated" });
});

