const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const {getJSON} = require("../../../helpers/readFile");
const PlankCookingModel = require("../models/Plankcooking");
test("ProductQuantityPut return status code 404 for missing params", async()=>{
    let req = {
        header:{},
    }
    let res = makeMockRes();

    await func.inject({PlankCookingModel})(req, res);


    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing params" });
});
test("ProductQuantityPut return status code 404 for missing userId params", async()=>{
    let req = {
        header:{},
        params: {}
    }
    let res = makeMockRes();

    await func.inject({PlankCookingModel})(req, res);


    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing userId params" });
});test("ProductQuantityPut return status code 404 for missing body", async()=>{
    let req = {
        header:{},
        params: {
            userId:"6661ddab9b40d5747b2430a5"
        }
    }
    let res = makeMockRes();

    await func.inject({PlankCookingModel})(req, res);


    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing body of request" });
});
test("ProductQuantityPut return status code 404 for missing _id in body", async()=>{
    let req = {
        header:{},
        params: {
            userId:"6661ddab9b40d5747b2430a5"
        },
        body:{  
        }
    }
    let res = makeMockRes();

    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing _id in body" });
});

test("ProductQuantityPut return status code 404 for missing quantity", async()=>{
    let req = {
        header:{},
        params: {
            userId:"6661ddab9b40d5747b2430a5"
        },
        body:{
            _id: "656dfb178c6dd51c6ac62d0a"
        }
    }
    let res = makeMockRes();

    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing quantity in body" });
});
test("ProductQuantityPut return status code 404 for user not found", async()=>{
    let req = {
        header:{},
        params: {
            userId:"6661ddab9b40d5747b2430a5"
        },
        body:{
            _id: "656dfb178c6dd51c6ac62d0a",
            quantity: 5
        }
    }
    let res = makeMockRes();

    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
});
test("ProductQuantityPut returns status code 404 for product not found", async () => {
    mockingoose(PlankCookingModel).toReturn({}, "findOne");
    let req = {
      header: {},
      params: {
        userId: "6661ddab9b40d5747b2430a5",
      },
      body: {
        _id: "656dfb178c6dd51c6ac62d0a",
        quantity: 5,
      },
    };
    let res = makeMockRes();
  
    await func.inject({ PlankCookingModel })(req, res);
  
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });
test("ProductQuantityPut return status code 200 for updated product", async()=>{
    const shoppingDocument = getJSON("../api/_test/documents/shopping-cart-update-quantity-put-document.json")
    const shoppingResponse = getJSON("../api/_test/json-responses/shopping-cart-update-quantity-put-response.json")
    

    mockingoose(PlankCookingModel).toReturn({}, "findOne").toReturn(shoppingDocument, "findOneAndUpdate");
    let req = {
        header:{},
        params: {
            userId:"6661ddab9b40d5747b2430a5"
        },
        body:{
            _id: "656dfb178c6dd51c6ac62d0a",
            quantity: 5
        }
    }
    let res = makeMockRes();

    await func.inject({PlankCookingModel})(req, res);

    const body = res.json.mock.calls[0][0];
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({  message: "Quantity Updated"  });
  
});

