class TimeCount {
    public num: number;
    public timer = null;
    public dom: any;

    constructor(dom: any, num?: number) {
        this.dom = dom;
        this.num = num || 10;
    }

    public startCounting(): void {
        this.timer = setInterval(() => {
            this.num--;
            this.dom.innerHTML = this.num;
            if (this.num <= 0) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }, 1000);
    }
}

export { TimeCount };
