import { generation } from "../types/index";

class Origin {
    // private name: string;
    private generation: number;
    private get age() {
        return Math.floor(Math.random() * 80);
    }
    private set age(num: number) {
        switch (true) {
            case num < 40:
                this.generation = generation.young;
                break;
            case num >= 40 && num < 60:
                this.generation = generation.middle;
                break;
            case num >= 60:
                this.generation = generation.old;
                break;
        }
    }

    constructor() {}

    public setAge(num?: number): void {
        this.age = num ? num : this.age;
        console.error('age:', this.age);
    }

    public doAction(num?: number): void {
        this.setAge(num);
        if (this.generation === generation.young) {
            console.log("蹦迪 唱歌");
        } else if (this.generation === generation.middle) {
            console.log("喝茶 养生");
        } else {
            console.log("唠嗑 晒太阳");
        }
    }
}

// class child extends Origin {}
/*
 * public private protected 三种修饰符
 * 抽象类
 */

export { Origin };
