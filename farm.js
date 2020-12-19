//Get Yield Value
const getYieldForPlant = (plant) => plant.yield;

//Yield for Crop = Number of Crops * Yield Value
const getYieldForCrop = (plant) => plant.numCrops * plant.crop.yield;

//Sum of all Yield for Crops
const getTotalYield = (plant) => {
  let totalYield = 0;
  for (let i = 0; i < plant.crops.length; i++) {
    totalYield += plant.crops[i].numCrops * plant.crops[i].crop.yield;
  }
  return totalYield;
};

//Costs for Crop = Number of Crops * Costs Value
const getCostsForCrop = (plant) => plant.costs;

//Revenue for Crop = Yield Value * Sale Price
const getRevenueForCrop = (plant) => plant.crop.yield * plant.crop.salePrice;

//Profit for Crop = Revenue for Crop - Costs for Crop
const getProfitForCrop = (plant) => plant.crop.yield * plant.crop.salePrice - plant.crop.costs;

//Sum of all Profits
const getTotalProfit = (plant) => {
  let totalProfit = 0;
  for (let i = 0; i < plant.crops.length; i++) {
    totalProfit += plant.crops[i].numCrops * (plant.crops[i].crop.yield * plant.crops[i].crop.salePrice - plant.crops[i].crop.costs);
  }
  return totalProfit;
}

module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit };