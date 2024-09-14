const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const {getJSON} = require("../../../helpers/readFile");
const PlankCookingModel = require("../models/Plankcooking");
test("StepThreePut return status code 404 for missing body", async()=>{
    let req = {
        header:{},
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing body of request" });
});
test("StepThreePut return status code 404 for missing userId", async()=>{
    let req = {
        header:{},
        body: {}
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing userId in body" });
});
test("StepThreePut return status code 404 for missing shipping", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5"
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing shipping in body" });
});
test("StepThreePut return status code 404 for missing shipping method", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            shipping:{}
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing shipping method in shipping" });
});
test("StepThreePut return status code 404 for missing shipping cost", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            shipping:{
                method: "USPS Parcel",
            }
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing shipping cost in shipping" });
});
test("StepThreePut return status code 404 for missing payment in body", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            shipping:{
                method: "USPS Parcel",
                cost: 23.95
            }
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing payment in body" });
});
test("StepThreePut return status code 404 for missing payment method in payment", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            shipping:{
                method: "USPS Parcel",
                cost: 23.95
            },
            payment:{}
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing payment method in body" });
});
test("StepThreePut return status code 403 for payment fail", async()=>{
    mockingoose(PlankCookingModel).toReturn([],"find")
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            shipping:{
                method: "USPS Parcel",
                cost: 23.95
            },
            payment:{
                method: "Visa"
            }
        }
    }
    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
});
test("StepThreePut return status code 200 for successful updating", async()=>{
    const shoppingDocument = getJSON("../api/_test/documents/shopping-cart-payment-put-document.json")
    const shoppingResponse = getJSON("../api/_test/json-responses/shopping-cart-payment-put-response.json")

    mockingoose(PlankCookingModel).toReturn(shoppingDocument, "findOne").toReturn(shoppingResponse, "findOneAndUpdate");

    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            shipping:{
                method: "USPS Parcel",
                cost: 23.95
            },
            payment:{
                method: "Visa"
            }
        }
    }
    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);
    const body = res.json.mock.calls[0][0];
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Updated successfully" });
});


