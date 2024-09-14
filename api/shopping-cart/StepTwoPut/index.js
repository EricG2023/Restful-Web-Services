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
    if (!req.body.address){
        return res.status(404).json({error: "Missing address in body"});
    }
    if (!req.body.address.billing){
        return res.status(404).json({error: "Missing billing in address"});
    }
    if (!req.body.address.billing.firstName){
        return res.status(404).json({error: "Missing firstName in billing address"});
    }
    if (!req.body.address.billing.lastName){
        return res.status(404).json({error: "Missing lastName in billing address"});
    }
    if (!req.body.address.billing.address){
        return res.status(404).json({error: "Missing address in billing address"});
    }
    if (!req.body.address.billing.city) {
        return res.status(404).json({ error: "Missing city in billing address" });
    }
    if (!req.body.address.billing.state) {
        return res.status(404).json({ error: "Missing state in billing address" });
    }
    if (!req.body.address.billing.zip) {
        return res.status(404).json({ error: "Missing zip in billing address" });
    }
    if (!req.body.address.billing.country) {
        return res.status(404).json({ error: "Missing country in billing address" });
    }
    if (!req.body.address.shipping){
        return res.status(404).json({error: "Missing shipping in address"});
    }
    if (!req.body.address.shipping.firstName) {
        return res.status(404).json({ error: "Missing firstName in shipping address" });
    }
    if (!req.body.address.shipping.lastName) {
        return res.status(404).json({ error: "Missing lastName in shipping address" });
    }
    if (!req.body.address.shipping.address) {
        return res.status(404).json({ error: "Missing address in shipping address" });
    }
    if (!req.body.address.shipping.city) {
        return res.status(404).json({ error: "Missing city in shipping address" });
    }
    if (!req.body.address.shipping.state) {
        return res.status(404).json({ error: "Missing state in shipping address" });
    }
    if (!req.body.address.shipping.zip) {
        return res.status(404).json({ error: "Missing zip in shipping address" });
    }
    if (!req.body.address.shipping.country) {
        return res.status(404).json({ error: "Missing country in shipping address" });
    }
    //Finding shopping cart with userId
    let shoppingCart = await PlankCookingModel.find({userId : req.body.userId})
    if(!shoppingCart) {
        return res.status(403).json({error: "User not found"})
    }
    //Updating info 
    let updatedInfo = {
        "address.billing": req.body.address.billing,
        "address.shipping": req.body.address.shipping,
        comments: req.body.comments
    }
    //Sending the updated info into database
    let updatedCart = await PlankCookingModel.findOneAndUpdate(
        {userId: req.body.userId},
        {$set:updatedInfo},
        {new: true}
    )
    if(!updatedCart){
        return res.status(403).json({error: "Failed to update information in cart"});
    }
     return res.status(200).json(updatedInfo)

});