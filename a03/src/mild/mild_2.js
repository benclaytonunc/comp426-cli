/**
 *
 * @param variable
 * @returns {{type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value: *}}
 * example: identifyVariable(4);
 * returns: { type: 'number', value: 4 }
 */
export function identifyVariable(variable) {
let thing = {};
thing.type = typeof variable;
thing.value = variable;
return thing;
}

console.log(identifyVariable('jeff'));
console.log(identifyVariable(8));

/**
 *
 * @param array
 * @returns {[]}
 * example: identifyArray(['some', 3, [3, 4], false]);
 * returns: [
 { type: 'string', value: 'some' },
 { type: 'number', value: 3 },
 { type: 'object', value: [ 3, 4 ] },
 { type: 'boolean', value: false }
 ]

 */
export function identifyArray(array) {
   let arroy = [];
   for(var i = 0; i <array.length; i++) {
      let thing = {};
      thing.type = typeof array[i];
      thing.value = array[i];
      arroy[i] = thing;
   }
   return arroy;
}
console.log(identifyArray(['somebody', 'once', [3,4], 2, 6]));

/**
 * mutates the object that is passed in.
 * @param object
 * @param key
 * @returns {*} does not have to return anything
 *
 * example:
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 removeKey(obj, 'password');
 obj now does not contain the `password` field
 */
export function removeKey(object, key) {
delete object[key];
return ('obj now does not contain the ' + key + ' field');
}
let obj = {
   name: 'Mr. Boss',
   title: 'boss',
   age: 33,
   password: 'pass123'
};
console.log(removeKey(obj, 'age'));
/**
 * Does not mutate the object passed in
 * @param object
 * @param key
 * @returns {*} The object with its keys removed
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 obj = removeKeyNonDestructive(obj, 'password');
 obj will not have the `password` field only because it was assigned the result of the function.
 If only `removeKeyNonDestructive` was called, nothing would have changed.
 */
export function removeKeyNonDestructive(object, key) {
let thing = {};
Object.assign(thing, object);
delete thing[key];
return thing;
}
let obj2 = {
   name: 'Epic Boss',
   title: 'Doctor',
   age: 33,
   password: 'pass123'
};
console.log(removeKeyNonDestructive(obj2, 'password'));

/**
 * Remove and return the listed keys. Without mutating the object passed in.
 * @param object
 * @param {string[]} keyList
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * example:


 let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
 obj = removeKeys(obj, ['password', 'age']);
 // object not looks like this
 { name: 'Mr. Boss', title: 'boss' }

 * @return {*} The object with its keys removed.
 */
export function removeKeys(object, keyList) {
   let thing ={};
   Object.assign(thing, object);
   for (let i=0; i<keyList.length; i++){
      delete thing[keyList[i]];
   }
   return thing;
}
console.log(removeKeys(obj2, ['age', 'password']))