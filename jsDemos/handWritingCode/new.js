function myNew(_constructor, ...params) {
  let obj = Object.create(null);
  obj.__proto__ = Object.create(_constructor.protoType);
  let res = _constructor.apply(obj, ...params);
  let isObject = typeof res === 'object' && res !== null;
  let isFunction = typeof res === 'function';
  return isObject || isFunction ? res : obj;
}