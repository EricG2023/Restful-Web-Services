const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const {getJSON} = require("../../../helpers/readFile");
const PlankCookingModel = require("../models/Plankcooking");

test("ProductDelete return status code 404 for missing params", async()=>{
    let req = {
        header:{},
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing params of request" });
});
test("ProductDelete return status code 404 for missing userId", async()=>{
    let req = {
        header:{},
        params: {}
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing userId in params"});
});
test("ProductDelete return status code 404 for missing body", async()=>{
    let req = {
        header:{},
        params: {
            userId: "6661dd89478f500928b2f1da"
        }
    }
    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing body of request"});
});
test("ProductDelete return status code 404 for missing _id in body", async()=>{
    let req = {
        header:{},
        params: {
            userId: "6661dd89478f500928b2f1da"
        },
        body: {}
    }
    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing _id in body of request"});
});
test("ProductDelete returns status code 403 for user not found", async () => {
    mockingoose(PlankCookingModel).toReturn(null, "findOneAndUpdate");

    let req = {
        params: {
            userId: "6661ddab9b40d5747b2430a5"
        },
        body: {
            _id: "656dfb178c6dd51c6ac62d0a"
        }
    };

    let res = makeMockRes();
    await func.inject({ PlankCookingModel })(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
});
test("ProductDelete return status code 200 for successful delete", async()=>{
    const shoppingDocument = getJSON("../api/_test/documents/shopping-cart-delete-document.json")
    const shoppingResponse = getJSON("../api/_test/json-responses/shopping-cart-delete-response.json")
    mockingoose(PlankCookingModel).toReturn({}, "findOne");
    mockingoose(PlankCookingModel).toReturn(shoppingDocument, "findOneAndUpdate");


    let req = {
        header:{},
        params: {
            userId: "6661ddab9b40d5747b2430a5"
        },
        body: {
            _id: "656dfb178c6dd51c6ac62d0a"
        }
    }
    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Product deleted successfully" });
});
