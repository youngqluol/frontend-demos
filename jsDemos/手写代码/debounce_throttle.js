const debounce = (fn, wait) => {
  let timer = null;
  return function(...params) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...params);
      timer = null;
    }, wait)
  }
}

const throttle = (fn, wait) => {
  let timer = null;
  return function(...params) {
    if(timer) return;
    fn(...params);
    timer = setTimeout(() => {
      timer = null;
    }, wait);
  }
}