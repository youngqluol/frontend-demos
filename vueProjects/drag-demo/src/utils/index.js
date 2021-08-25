export function formatDate() {
  const year = new Date().getFullYear();
  const month =
    new Date().getMonth() + 1 > 10
      ? new Date().getMonth()
      : '0' + (new Date().getMonth() + 1);
  const day =
    new Date().getDate() > 10
      ? new Date().getDate()
      : '0' + new Date().getDate();
  const hour =
    new Date().getHours() > 10
      ? new Date().getHours()
      : '0' + new Date().getHours();
  const minute =
    new Date().getMinutes() > 10
      ? new Date().getMinutes()
      : '0' + new Date().getMinutes();
  return year + month + day + hour + minute;
}

export const deepClone = obj => {
  if (typeof obj !== 'object') return obj;
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      newObj[key] = deepClone(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/**
* @params {String}
*/
export function $(mark) {
  return document.querySelector(mark);
}

/** 
* 防抖
*/
export function debounce(fn, delay) {
  let timer = null;
  return function(...params) {
    if(timer) {
      clearTimeout(timer);
    };
    timer = setTimeout(() => {
      fn(...params);
      timer = null;
    }, delay);
  };
}

/** 
* 节流
 */
export function throttle(fn, delay) {
  let timer = null;
  return function(...params) {
    if(timer) return;
    fn(...params);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

export function isDef(target) {
  return target !== null && target !== undefined;
}

export function sleep(time) {
}