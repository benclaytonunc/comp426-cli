/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
var sum = a + b;
return(a + ' + ' + b + ' = ' + sum);
}
console.log(sumToString(3,4));


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    var array = [];
    var count = startNumber;
    while(count <= endNumber) {
        array.push(count);
        count++;
    }
    return array;
}
console.log(getIncreasingArray(1, 7));

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    let thing = {};
    thing.min = Math.min.apply(Math, numbers);
    thing.max = Math.max.apply(Math, numbers);
    return thing;
}
console.log(maxAndMin([1,2,5,3,4]));

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let thing = {};
    for (var i = 0; i < array.length; i++) {
        if(thing[array[i]]) {
            thing[array[i]] = thing[array[i]] + 1;
        } else {
            thing[array[i]] = 1;
        }
    }
    return thing;
}
console.log(countArray([3,5,1,1,5,5, 'some', 'hello', [1,2]]));