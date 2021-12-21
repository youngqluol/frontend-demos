const obj = {
  a: 2
}

function fn(a) {
  console.log('====', a);
}

try {
  fn(1);
} catch {

}

module.exports = obj;
module.exports.fn = fn;