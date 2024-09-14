const makeInjectable = require("../../../helpers/makeInjectable");
const mongoose= require("mongoose");
const PlankCookingModel = require("../models/Plankcooking");

module.exports = makeInjectable({
    defaults: {
        PlankCookingModel: () => require("../models/Plankcooking")
    }
}, async function ({PlankCookingModel}, req, res) {

    //Error check for params and parmas.userId
    if(!req.params || !req.params.userId) {
        return res.status(404).send();
    }

    //Retrieve the list using the id
    let shoppingCart = await PlankCookingModel.find({userId: req.params.userId})

    //Check if that list was retrieved, return 404 if not found
    if(shoppingCart.length === 0){
        return res.status(404).send();
    } 
    //return 
    return res.status(200).json(shoppingCart);
    
})