const axios = require('axios');
const Tree = require('./Tree');

/**
 * @function getData fetches data from the API
 * @param {string} url - the url to fetch data from
 * @returns {Promise} - a promise that resolves to the data
 */

const getData = async (url = '') => {
  try {
    const req = await axios.get(url);
    return req.data.values;
  } catch (error) {
    console.log(error);
    throw Error('Somethin went wrong!');
  }
};

/**
 * @function findPairs provides a function to find pairs
 * @param {number} sum - the sum to find pairs for
 * @returns {Void} - does not return anything
 */

const findPairs = async (sum) => {
  const arr = await getData('https://mach-eight.uc.r.appspot.com/');
  const tree = new Tree();
  arr.forEach((item, idx) => {
    tree.add({ ...item, id: idx });
  });
  tree.printPairs(sum);
};

if (parseInt(process.argv[2], 10) > 0) {
  findPairs(parseInt(process.argv[2], 10));
} else {
  console.log('Args must be a integer');
}
