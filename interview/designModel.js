// 单例模式
class CreateUser {
  constructor(name) {
    this.name = name;
    this.getName();
  }
  getName() {
    return this.name;
  }
}
var ProxyMode = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new CreateUser(name);
    }
    return instance;
  };
})();
// 测试单体模式的实例
var a = new ProxyMode("aaa");
var b = new ProxyMode("bbb");
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(a === b); //true

// 策略模式
function checkAuth(data) {
  if (data.role !== "金蝶") {
    console.log("不是金蝶");
    return false;
  }
  if (data.year < 1) {
    console.log("入职时间小于1年");
    return false;
  }
  if (data.job !== "FE") {
    console.log("不是前端开发");
    return false;
  }
  if (data.department !== "user serve") {
    console.log("不是用户平台部");
    return false;
  }
}

// 维护权限列表
const jobList = ["FE", "BE"];

// 策略
var strategies = {
  checkRole: function (value) {
    return value === "juejin";
  },
  checkGrade: function (value) {
    return value >= 1;
  },
  checkJob: function (value) {
    return jobList.indexOf(value) > 1;
  },
  checkEatType: function (value) {
    return value === "eat melons";
  },
};

// 定义策略
class Strategies {
  static checkCompany(value) {
    return value === "jindie";
  }
  static checkAge(value) {
    return value >= 1;
  }
  static checkDepartment(value) {
    return value === "用户平台";
  }
  static checkRole(value) {
    return value === "前端";
  }
}

// 定义验证
class Validator {
  constructor() {
    this.cache = [];
  }

  add(value, method) {
    this.cache.push(function () {
      return Strategies[method](value);
    });
  }

  check() {
    let flag = true;
    for (let i = 0; i < this.cache.length; i++) {
      let valiFn = this.cache[i];
      var data = valiFn();
      if (!data) {
        flag = false;
        break;
      }
    }
    return flag;
  }
}

// 使用策略模式进行验证
const compose = function () {
  var validator = new Validator();
  const info = {
    role: "前端",
    year: 3,
  };
  validator.add(info.role, "checkRole");
  validator.add(info.year, "checkAge");
  const result = validator.check();
  return result;
};

// 发布订阅
function applySuccess() {
  // 通知消息中心获取最新内容
  MessageCenter.fetch();
  // 更新订单信息
  Order.update();
  // 通知相关方审核
  Checker.alert();
}

// 定义发布订阅类
const EventEmit = function () {
  this.events = {};
  this.on = function (name, cb) {
    if (this.events[name]) {
      this.events[name].push(cb);
    } else {
      this.events[name] = [cb];
    }
  };
  this.trigger = function (name, ...arg) {
    if (this.events[name]) {
      this.events[name].forEach((eventListener) => {
        eventListener(...arg);
      });
    }
  };
};

// 定义发布订阅类
class EventEmit {
  constructor() {
    this.events = {};
  }

  // 订阅
  on(name, cb) {
    if (this.events[name]) {
      this.events[name].push(cb);
    } else {
      this.events[name] = [cb];
    }
  }

  // 发布
  emit(name, ...arg) {
    this.events[name].forEach((cb) => {
      cb(...arg);
    });
  }
}

// 使用发布订阅模式
let eventInstance = new EventEmit();

// 订阅1
MessageCenter.fetch = function() {
  eventInstance.on('success', () => {
    console.log('更新消息中心');
  });
}
// 订阅2
Order.update = function () {
  eventInstance.on('success', () => {
    console.log('更新订单信息');
  });
}
// 订阅3
Checker.alert = function() {
  eventInstance.on('success', () => {
    console.log('通知管理员');
  });
}

// 发布 
eventInstance.emit('success');