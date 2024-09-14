const { Types } = require("mongoose");
const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable({
    defaults: {
        PlankCookingModel: () => require("../models/Plankcooking")
    }
}, async function ({ PlankCookingModel }, req, res) {
    //Error check for params product and fields    
    if (!req.params) {
        return res.status(404).json({ error: "Missing params" })
    }
    if (!req.params.userId) {
        return res.status(404).json({ error: "Missing userId params" });
    }
    if (!req.body) {
        return res.status(404).json({ error: "Missing body of request" });
    }
    if (!req.body.name) {
        return res.status(404).json({ error: "Missing name in body" });
    }
    if (!req.body.price) {
        return res.status(404).json({ error: "Missing price in body" });
    }
    if (!req.body.quantity) {
        return res.status(404).json({ error: "Missing quantity in body" });
    }
    //Checking for existing prodcut with with finding userId
    let shoppingCart = await PlankCookingModel.findOne({ userId: req.params.userId });
    if (!shoppingCart) {
        return res.status(404).json({ error: "User not found" })
    }
    const { name, price, quantity } = req.body

    let existingProduct = await PlankCookingModel.findOne({ "products.name": name })
    if (existingProduct) {
        return res.status(404).json({ error: "Product already exists" });
    }
    //Creating a new product
    let newProduct = { _id: new Types.ObjectId(), name, price, quantity };

    // Add new product to shopping cart
    const shoppingList = await PlankCookingModel.findOneAndUpdate(
        { userId: req.params.userId },
        { $push: { products: newProduct } },
        { new: true }
    );
    return res.status(200).json(shoppingList.products);
});
