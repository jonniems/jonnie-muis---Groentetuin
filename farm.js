//Get Yield Value
const getYieldForPlant = (input, factors) => {
  if (input.hasOwnProperty('name') !== true) {
    let yieldForPlant = input.crop.yield;
    if (input.crop.hasOwnProperty('factors')) {
      if (factors === undefined) {
        return yieldForPlant;
      }
      else {
        let growthFactors = [];
        for (const [key, value] of Object.entries(factors)) {
          growthFactors.push((input.crop.factors[key][value] + 100) / 100);
        }
        let yieldForPlant = input.crop.yield;
        for (let i = 0; i < growthFactors.length; i++) {
          yieldForPlant = growthFactors[i] * yieldForPlant; 1
        }
        return yieldForPlant;
      }
    } else {
      return yieldForPlant;
    }
  }
  else {
    return input.yield;
  }
}

//Yield for Crop = Number of Crops * Yield Value
const getYieldForCrop = (input, factors) => input.numCrops * getYieldForPlant(input, factors);

//Sum of all Yield for Crops
const getTotalYield = (input) => {
  let totalYield = 0;
  for (let i = 0; i < input.crops.length; i++) {
    totalYield += input.crops[i].numCrops * input.crops[i].crop.yield;
  }
  return totalYield;
};

//Costs for Crop = Number of Crops * Costs Value
const getCostsForCrop = (input) => input.crop.costs * input.numCrops;

//Revenue for Crop = Yield Value * Sale Price
const getRevenueForCrop = (input, factors) => getYieldForPlant(input, factors) * input.crop.salePrice * input.numCrops;

//Profit for Crop = Revenue for Crop - Costs for Crop
const getProfitForCrop = (input, factors) => getRevenueForCrop(input, factors) - getCostsForCrop(input, factors);

//Sum of all Profits
const getTotalProfit = (input, factors) => {
  let totalProfit = 0;
  for (let i = 0; i < input.crops.length; i++) {
    totalProfit += getRevenueForCrop(input.crops[i], factors) - getCostsForCrop(input.crops[i], factors);
  }
  return totalProfit;
}

module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit };