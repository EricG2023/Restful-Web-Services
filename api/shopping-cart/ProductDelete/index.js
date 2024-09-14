const {Types} = require("mongoose");
const makeInjectable =  require("../../../helpers/makeInjectable");


module.exports = makeInjectable({
    defaults: {
        PlankCookingModel: () => require("../models/Plankcooking")
    }
}, async function ({PlankCookingModel}, req, res) {
    //Eror Checking for required fields
    if(!req.params){
        return res.status(404).json({error : "Missing params of request"});
    }
    if (!req.params.userId){
        return res.status(404).json({error: "Missing userId in params"});
    }
   if (!req.body) {
        return res.status(404).json({error: "Missing body of request"});
   }
   if (!req.body._id) {
    return res.status(404).json({error: "Missing _id in body of request"});
} 
    //Finding shopping cart by userId and updating it/delete
    let shoppingCart = await PlankCookingModel.findOneAndUpdate(
        { userId: req.params.userId },
        { $pull: { products: { _id: req.body._id }}},
        { new: true } 
    );
    if (!shoppingCart) {
        return res.status(403).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
});
