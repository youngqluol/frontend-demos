class MyPromise {
  constructor(fn) {
    this.PENDING = 'pending';
    this.RESOLVED = 'resolved';
    this.REJECTED = 'rejeced';
    this.status = this.PENDING;
    try{
      fn(resolve, reject);
    } catch(e) {
      reject(e);
    }
  };
  resolve(value) {
      if(this.status === this.PENDING) {
        
      } 
  };
}

// 先写一个实例参考
const promise = new Promise((resolve, reject) => {
  if (Math.random() * 10 > 5) resolve(1)
  else reject('error');
})

promise.then(
  () => {

  },
  () => {

  }
)