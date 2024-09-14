const func = require("./index");
const makeMockRes = require("../../../helpers/makeMockRes");
const mockingoose = require("mockingoose");
const {getJSON} = require("../../../helpers/readFile");
const PlankCookingModel = require("../models/Plankcooking");
test("StepTwoPut return status code 404 for missing body", async()=>{
    let req = {
        header:{},
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing body of request" });
});
test("StepTwoPut return status code 404 for missing userId", async()=>{
    let req = {
        header:{},
        body: {}
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing userId in body" });
});
test("StepTwoPut return status code 404 for missing address in body", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5"
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing address in body" });
});
test("StepTwoPut return status code 404 for missing billing in address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {},
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing billing in address" });
});
test("StepTwoPut return status code 404 for missing firstName in billing address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {

                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing firstName in billing address" });
});
test("StepTwoPut return status code 404 for missing lastName in billing address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing lastName in billing address" });
});
test("StepTwoPut return status code 404 for missing address in billing address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing address in billing address" });
});
test("StepTwoPut return status code 404 for missing city in billing address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing city in billing address" });
});
test("StepTwoPut return status code 404 for missing state in billing address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing state in billing address" });
});
test("StepTwoPut return status code 404 for missing zip in billing address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing zip in billing address" });
});
test("StepTwoPut return status code 404 for missing country in billing address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing country in billing address" });
});
test("StepTwoPut return status code 404 for missing shipping in address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing shipping in address" });
});
test("StepTwoPut return status code 404 for missing firstName in shipping address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US",
                },
                shipping: {

                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing firstName in shipping address" });
});
test("StepTwoPut return status code 404 for missing lastName in shipping address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US",
                },
                shipping: {
                    firstName: "Eli"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing lastName in shipping address" });
});
test("StepTwoPut return status code 404 for missing address in shipping address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US",
                },
                shipping: {
                    firstName: "Eli",
                    lastName: "Krohn"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing address in shipping address" });
});
test("StepTwoPut return status code 404 for missing city in shipping address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US",
                },
                shipping: {
                    firstName: "Eli",
                    lastName: "Krohn",
                    address: "901 Tulip Street"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing city in shipping address" });
});
test("StepTwoPut return status code 404 for missing state in shipping address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US",
                },
                shipping: {
                    firstName: "Eli",
                    lastName: "Krohn",
                    address: "901 Tulip Street",
                    city: "WA"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing state in shipping address" });
});
test("StepTwoPut return status code 404 for missing zip in shipping address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US",
                },
                shipping: {
                    firstName: "Eli",
                    lastName: "Krohn",
                    address: "901 Tulip Street",
                    city: "Coulee Dam",
                    state: "WA"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing zip in shipping address" });
});
test("StepTwoPut return status code 404 for missing country in shipping address", async()=>{
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US",
                },
                shipping: {
                    firstName: "Eli",
                    lastName: "Krohn",
                    address: "901 Tulip Street",
                    city: "Coulee Dam",
                    state: "WA",
                    zip: "99116"
                }
            },
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing country in shipping address" });
});
test("StepTwoPut return status code 403 for user not found", async()=>{
    mockingoose(PlankCookingModel).toReturn([],"find")
    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US",
                },
                shipping: {
                    firstName: "Eli",
                    lastName: "Krohn",
                    address: "901 Tulip Street",
                    city: "Coulee Dam",
                    state: "WA",
                    zip: "99116",
                    country: "US"
                }
            },
            comments: null
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    //expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
});
test("StepTwoPut return status code 200 for successful updating", async()=>{
    const shoppingDocument = getJSON("../api/_test/documents/shopping-cart-address-put-document.json")
    const shoppingResponse = getJSON("../api/_test/json-responses/shopping-cart-address-put-response.json")

    mockingoose(PlankCookingModel).toReturn(shoppingDocument, "findOne").toReturn(shoppingResponse, "findOneAndUpdate");

    let req = {
        header:{},
        body: {
            userId: "6661ddab9b40d5747b2430a5",
            address: {
                billing: {
                    firstName: "Bill",
                    lastName: "Smith",
                    address: "710 S.Pines",
                    city: "Spokane Valley",
                    state: "WA",
                    zip:"99202",
                    country: "US",
                },
                shipping: {
                    firstName: "Eli",
                    lastName: "Krohn",
                    address: "901 Tulip Street",
                    city: "Coulee Dam",
                    state: "WA",
                    zip: "99116",
                    country: "US"
                }
            },
            comments: null
        }
    }

    let res = makeMockRes();
    await func.inject({PlankCookingModel})(req, res);
    const body = res.json.mock.calls[0][0];
    expect(res.status).toHaveBeenCalledWith(200);
    expect(JSON.stringify(body)).toEqual(JSON.stringify(shoppingResponse))
});


