const obj = {
  a: 2
}

function fn(a) {
  console.log('====', a);
}

module.exports = obj;
module.exports.fn = fn;