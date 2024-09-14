const {Types} = require("mongoose");
const makeInjectable =  require("../../../helpers/makeInjectable");


module.exports = makeInjectable({
    defaults: {
        PlankCookingModel: () => require("../models/Plankcooking")
    }
}, async function ({PlankCookingModel}, req, res) {
    //Eror Checking for required fields
    if(!req.body){
        return res.status(404).json({error : "Missing body of request"});
    }
    if (!req.body.userId){
        return res.status(404).json({error: "Missing userId in body"});
    }
    if (!req.body.shipping) {
        return res.status(404).json({ error: "Missing shipping in body" });
    }
    if (!req.body.shipping.method) {
        return res.status(404).json({ error: "Missing shipping method in shipping" });
    }
    if (!req.body.shipping.cost) {
        return res.status(404).json({ error: "Missing shipping cost in shipping" });
    }
    if (!req.body.payment) {
        return res.status(404).json({ error: "Missing payment in body" });
    }
    if (!req.body.payment.method) {
        return res.status(404).json({ error: "Missing payment method in body"});
    }
    //finding the shopping cart with userID
    let shoppingCart = await PlankCookingModel.findOne({userId : req.body.userId})
    if(!shoppingCart) {
        return res.status(403).json({error: "User not found"})
    }
    //Creating a total subtotal
    let total = 0;
    if (shoppingCart.products && shoppingCart.products.length > 0) {
        for (let productItem = 0; productItem < shoppingCart.products.length; productItem++) {
            let product = shoppingCart.products[productItem];
            total += product.quantity * product.price;
        }
    }
    total += req.body.shipping.cost;
    //Creating a randrom confirmation code

    function generateconfirmationCode(){
        return Math.random().toString(36).slice(2)+
        Math.random().toString(36).toUpperCase().slice(2)
    } let confirmationCode = generateconfirmationCode();

    //Updating information appropriate fields
    let updatedInfo = {
        shipping: {
            method: req.body.shipping.method,
            cost: req.body.shipping.cost
        },
        payment: {
            method:req.body.payment.method,
            confirmationCode : confirmationCode,
            total: total
        }
    }
    //Updating the cart based of of the updating infromation 
    let updatedCart = await PlankCookingModel.findOneAndUpdate(
        {userId: req.body.userId},
        {$set:updatedInfo},
        {new: true}
    )
    if(!updatedCart){
        return res.status(403).json({error: "Failed to update information in cart"});
    }
    return res.status(200).json({ message: "Updated successfully" });

});