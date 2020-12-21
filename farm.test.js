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
        expect(getCostsForCrop(corn)).toBe(3);
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
        };
        expect(getRevenueForCrop(input)).toBe(15);
    });
});

describe("getProfitForCrop", () => {
    test("Calculate profit for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3, //kilo
            costs: 2, //euro per crop
            salePrice: 5, //euro per kilo
        };
        const input = {
            crop: corn,
        };
        expect(getProfitForCrop(input)).toBe(13);
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
            yield: 30, //kilo
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
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "high",
        };
        const input = {
            crop: corn,
            numCrops: 10,
            environmentFactors,
        };
        expect(getYieldForPlant(input)).toBe(18);
    });
});