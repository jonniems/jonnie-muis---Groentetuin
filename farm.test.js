const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30, //kilo
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3, //kilo
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3, //kilo
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4, //kilo
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3, //kilo
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    test("Calculate total costs for crop, simple", () => {
        const corn = {
            name: "corn",
            costs: 3, //euro per crop
        };
        const input = {
            crop: corn,
            numCrops: 5,
        };
        expect(getCostsForCrop(input)).toBe(15);
    });
});

describe("getRevenueForCrop", () => {
    test("Calculate revenue for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3, //kilo
            salePrice: 5, //euro per kilo
        };
        const input = {
            crop: corn,
            numCrops: 5,
        };
        expect(getRevenueForCrop(input)).toBe(75);
    });
});

describe("getProfitForCrop", () => {
    test("Calculate profit for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 10, //kilo
            costs: 2, //euro per crop
            salePrice: 5, //euro per kilo
        };
        const input = {
            crop: corn,
            numCrops: 5,
        };
        //(5*10*5)-(2*5)
        expect(getProfitForCrop(input)).toBe(240);
    });
});

describe("getTotalProfit", () => {
    test("Calculate total profit for multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3, //kilo
            costs: 2, //euro per crop
            salePrice: 5, //euro per kilo
            //profit = 13 euro * 5 = 65 euro
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4, //kilo
            costs: 5, //euro per crop
            salePrice: 5, //euro per kilo
            //protfit = 15 euro * 2 = 30 euro
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit({ crops })).toBe(95);
    });

    test("Calculate total profit with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3, //kilo
            costs: 3, //euro per crop
            salePrice: 3, //euro per kilo
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalProfit({ crops })).toBe(0);
    });
});

describe("getYieldForPlant", () => {
    test("Get yield for plant, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 15, //kilo
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -20,
                    medium: 0,
                    high: 20,
                },
                soil: {
                    sand: -20,
                    clay: 0,
                },
            },
        };
        const environmentFactorsA = {
            sun: "low",
            wind: "high",
            //15*0.5*1.2=9
        };
        const environmentFactorsB = {
            sun: "low",
            wind: "high",
            soil: "sand",
            //30*0.5*1.2*0.8=7.2
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForPlant(input, environmentFactorsA)).toBe(9);
        expect(getYieldForPlant(input, environmentFactorsB)).toBe(7.2);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 15, //kilo
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -20,
                    medium: 0,
                    high: 20,
                },
                soil: {
                    sand: -20,
                    clay: 0,
                },
            },
        };
        const environmentFactorsA = {
            sun: "low",
            wind: "high",
            //15*0.5*1.2=9 * 10
        };
        const environmentFactorsB = {
            sun: "low",
            wind: "high",
            soil: "sand",
            //30*0.5*1.2*0.8=7.2 * 10
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input, environmentFactorsA)).toBe(90);
        expect(getYieldForCrop(input, environmentFactorsB)).toBe(72);
    });
});

describe("getRevenueForCrop", () => {
    test("Get revenue for crop, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 15, //kilo
            salePrice: 5, //euro per kilo
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -20,
                    medium: 0,
                    high: 20,
                },
                soil: {
                    sand: -20,
                    clay: 0,
                },
            },
        };
        const environmentFactorsA = {
            sun: "low",
            wind: "high",
            //15*0.5*1.2=9 * 5
        };
        const environmentFactorsB = {
            sun: "low",
            wind: "high",
            soil: "sand",
            //30*0.5*1.2*0.8=7.2 * 5
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getRevenueForCrop(input, environmentFactorsA)).toBe(450);
        expect(getRevenueForCrop(input, environmentFactorsB)).toBe(360);
    });
});

describe("getProfitForCrop", () => {
    test("Get profit for crop, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 15, //kilo
            salePrice: 5, //euro per kilo
            costs: 2, //euro per crop
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -20,
                    medium: 0,
                    high: 20,
                },
                soil: {
                    sand: -20,
                    clay: 0,
                },
            },
        };
        const environmentFactorsA = {
            sun: "low",
            wind: "high",
        };
        const environmentFactorsB = {
            sun: "low",
            wind: "high",
            soil: "sand",
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        //A = (450) - (10*2)
        //B = (360) - (10*2)
        expect(getProfitForCrop(input, environmentFactorsA)).toBe(430);
        expect(getProfitForCrop(input, environmentFactorsB)).toBe(340);
    });
});