const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const {getJSON} = require("../../../helpers/readFile");
const PlankCookingModel = require("../models/Plankcooking");

test("ProductAddPost return status code 404 for missing params", async () => {
    let req = {
        header: {},
    };
    let res = makeMockRes();

    await func.inject({ PlankCookingModel })(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing params" });
});
test("ProductAddPost return status code 404 for missing userId params", async () => {
    let req = {
        header: {},
        params: {},

    };
    let res = makeMockRes();

    await func.inject({ PlankCookingModel })(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing userId params" });
});
test("ProductAddPost return status code 404 for missing body", async () => {
    let req = {
        header: {},
        params: {
             userId: "6661ddab9b40d5747b2430a5"
        }
    };
    let res = makeMockRes();

    await func.inject({ PlankCookingModel })(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing body of request" });
});
test("ProductAddPost return status code 404 for missing name", async () => {
    let req = {
        header: {},
        params: {
            userId: "6661ddab9b40d5747b2430a5"
        },
        body: {
            _id: "656dfb178c6dd51c6ac62d0a",
        }
    };
    let res = makeMockRes();

    await func.inject({ PlankCookingModel })(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing name in body" });
});

test("ProductAddPost return status code 404 for missing price", async () => {
    let req = {
        header: {},
        params: {
            userId: "6661ddab9b40d5747b2430a5"
        },
        body: {
            _id: "656dfb178c6dd51c6ac62d0a",
            name: "Nut Driver",
        }
    };
    let res = makeMockRes();

    await func.inject({ PlankCookingModel })(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing price in body" });
});

test("ProductAddPost return status code 404 for missing quantity", async () => {
    let req = {
        header: {},
        params: {
            userId: "6661ddab9b40d5747b2430a5"
        },
        body: {
            _id: "656dfb178c6dd51c6ac62d0a",
            name: "Nut Driver",
            price: 3.00
        }
    };
    let res = makeMockRes();

    await func.inject({ PlankCookingModel })(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing quantity in body" });
});

test("ProductAddPost return status code 404 if product exists", async () => {
    const shoppingDocument = getJSON("../api/_test/documents/shopping-cart-new-product-post-document.json");
    
    mockingoose(PlankCookingModel).toReturn(shoppingDocument, "findOne");
    let req = {
        header: {},
        params: {
            userId: "6661ddab9b40d5747b2430a5"
        },
        body: {
            _id: "6668b8cae284c7d73a6ed8d3",
            name: "Nut Driver",
            price: 3.00,
            quantity: 2
        }
    };
    let res = makeMockRes();

    await func.inject({ PlankCookingModel })(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({error: "Product already exists"});
});

test("ProductAddPost returns status code 404 if shopping cart not found", async () => {
    mockingoose(PlankCookingModel).toReturn(null, "findOne");

    let req = {
        header: {},
        params: {
            userId: "6661ddab9b40d5747b2430a5"
        },
        body: {
            _id: "656dfb178c6dd51c6ac62d0a",
            name: "Nut Driver",
            price: 3.00,
            quantity: 2
        }
    };
    let res = makeMockRes();

    await func.inject({ PlankCookingModel })(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  
});
test("ProductAddPost returns status code 200 and the new product if added successfully", async () => {
    const shoppingDocument = getJSON("../api/_test/documents/shopping-cart-new-product-post-document.json");
    const shoppingResponse = getJSON("../api/_test/json-responses/shopping-cart-new-product-post-response.json");

    mockingoose(PlankCookingModel).toReturn(shoppingDocument, "findOneAndUpdate");

    let req = {
        header: {},
        params: {
            userId:"6661ddab9b40d5747b2430a5"
        },
        body: {
            _id: "656dfb178c6dd51c6ac62d0a",
            name: "Nut Driver",
            price: 3.00,
            quantity: 2
        }
    };
    let res = makeMockRes();
    await func.inject({ PlankCookingModel })(req, res);
    
    const body = res.json.mock.calls[0][0];

    expect(res.status).toHaveBeenCalledWith(200)
    //expect(JSON.stringify(body)).toEqual(JSON.stringify(shoppingResponse))
});