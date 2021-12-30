const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
class MyPromise {
    constructor(fn) {
        this.status = PENDING;
        this.resolveResult = null; 
        this.rejectResult = null; 
        this.resolveCallBacks = [];
        this.rejectCallBacks = [];
        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    static resolve(value) {
        if (this.status === PENDING) {
            this.resolveResult = value;
            this.status = RESOLVED;
            this.resolveCallBacks.forEach(cb => cb());
        }
    }
    static reject(err) {
        if (this.status === PENDING) {
            this.rejectResult = err;
            this.status = REJECTED;
            this.rejectCallBacks.forEach(cb => cb());
        }
    }
    then(resolveCallback, rejectCallback) {
      if(this.status === RESOLVED) {
        resolveCallback(this.resolveResult);
      }
      if(this.status === REJECTED) {
        rejectCallback(this.rejectResult);
      } 
      if(this.status === PENDING) {
        resolveCallBacks.push(() => {
          this.resolveCallBacks(this.resolveResult);
        });
        rejectCallBacks.push(() => {
          this.rejectCallBacks(this.resolveResult);
        })
      }
      
    }
}

// 先写一个实例参考
const promise = new Promise((resolve, reject) => {
    if (Math.random() * 10 > 5) resolve(1);
    else reject("error");
});

promise.then(
    () => {},
    () => {}
);
