import mpg_data from "./data/mpg_data.js";
import { getStatistics } from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allyrStats} The output of calling `getStatistics` from medium_1.js on
 * the yrs the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export function avgMpg(array) {

    var cityCount = 0;
    var citySum = 0;
    var hwayCount = 0;
    var hwaySum = 0; // sum of highway mpgs of cars
    for (var i = 0; i < array.length; i++) {
        hwaySum += array[i].highway_mpg;
        citySum += array[i].city_mpg;
        hwayCount++;
        cityCount++;
    }
    let city = citySum / cityCount;
    let highway = hwaySum / hwayCount;
    return { city, highway };
}

console.log(avgMpg(mpg_data));

export function allYearStats(array) {
    let arr = [];
    for (var i = 0; i < array.length; i++) {
        arr[i] = mpg_data[i].year;
    }
    return getStatistics(arr);
}

console.log(allYearStats(mpg_data));

export function hybridRatio(array) {
    var total = 0;
    var a = 0;
    var hybridCount = 0;
    for (var i = 0; i < array.length; i++) {
        a++;
        if (mpg_data[i].hybrid) {
            hybridCount++;
        }
    }
    return hybridCount / a;
}
console.log(hybridRatio(mpg_data));

export const allCarStats = {
    avgMpg: avgMpg(mpg_data),
    allYearStats: allYearStats(mpg_data),
    ratioHybrids: hybridRatio(mpg_data),
};

console.log(allCarStats.avgMpg);
console.log(allCarStats.allYearStats);


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByyrAndHybrid} Object where keys are yrs and each yr
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only yrs in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export function getMakerHybrids(){
    var output = mpg_data.reduce(function(acc, value){
        if (acc.findIndex(elem => elem.make === value.make)==-1){
            let hybrids = mpg_data.filter(item => item.make === value.make).filter(item => item.hybrid).map(item => item.id)
            if (hybrids.length >0){
                acc.push({make: value.make, hybrids});
            }
            }
            return acc;
        },[]);
        return output;
}
console.log(getMakerHybrids());
export function avgMpgByYrAndHybrid(){
    let thing = {};
    let yr = mpg_data.map(elem => elem.year);
    let hybrid = mpg_data.filter(elem => elem.hybrid === true);
    let reg = mpg_data.filter( elem => elem.hybrid ===false);
    for(let a = 0; a<yr.length; a++){
        let yrs = yr[a];
        let obj ={hybrid: avgMpg(hybrid.filter(elem => elem.year == yrs)),
            notHybrid: avgMpg(reg.filter(elem => elem.year ==yrs))
        }
            thing[yrs] =obj;

    };
    return thing;
}
console.log(avgMpgByYrAndHybrid());
export const moreStats = {
    makerHybrids: getMakerHybrids(),
    avgMpgByYearAndHybrid: avgMpgByYrAndHybrid()
};
