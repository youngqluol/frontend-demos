function fn(a, b) {
    this.a = a;
    this.b = b;
    this.run = function() {
        const a = this.a;
        return function() {
            console.log(a);
        }
    }
}

const fn1 = new fn(2,3);
// fn.run();

// console.log(fn1.run()())

class CLI {
    constructor(a) {
        this.a = a;
    };

    run(b) {
        this.a = b;
    }
}

class CLI2 extends CLI {
    constructor(a, b, c) {
        super(a);
        this.b = b;
    };

    run2() {
        super.run(c);
        console.log(222);
    }
}

const cliInstance = new CLI2(2,3,5);
console.log(cliInstance.a);
console.log(cliInstance.b);
cliInstance.run2();
console.log(cliInstance.a);