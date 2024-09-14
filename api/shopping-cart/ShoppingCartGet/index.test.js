const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const {getJSON} = require("../../../helpers/readFile");
const PlankCookingModel = require("../models/Plankcooking");

test("ShoppingCartGet return status code 404 for missing params", async()=>{
    let req = {
        header:{}
    }
    let res = makeMockRes();

    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
});
test("ShoppingCartGet return status code 404 for missing userId", async()=>{
    let req = {
        header:{},
        params:{}
    }
    let res = makeMockRes();

    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
});
test("ShoppingCartGet return status code 404 if document is not found for userId", async()=>{
    let req = {
        header:{},
        params:{
            userId: "asdasdasd"
        }
    }
    let res = makeMockRes();

    mockingoose(PlankCookingModel).toReturn([], "find");

    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
});

test("ShoppingCartGet returns 200 if shopping cart based of userId",
    async () => {
        const shoppingDocument = getJSON("../api/_test/documents/shopping-cart-userId-get-document.json");
    
        mockingoose(PlankCookingModel).toReturn(shoppingDocument,"find");

        let req = {
            header: {},
            params:{
                userId:"6661ddab9b40d5747b2430a5"
            }
        }
        let res = makeMockRes();

        await func.inject({PlankCookingModel})(req, res);
        const body = res.json.mock.calls[0][0];

        expect(res.status).toHaveBeenCalledWith(200);

        const shoppingCartResponse = getJSON("../api/_test/json-responses/shopping-cart-userId-get-response.json")
        
        
        expect(JSON.stringify(body)).toBe(JSON.stringify(shoppingCartResponse))
    });