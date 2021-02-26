class MyPromise {
  constructor(fn) {
    this.fn = fn;
    fn();
  }
}