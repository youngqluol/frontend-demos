// 数组前i个之和 组成新数组
function fn(arr) {
    if(arr.length === 0) return [];
    let _arr = []
    arr.forEach((item, index) => {
        const arrItem = arr.slice(0,index+1);
        const sumItem = arrItem.reduce((pre,cur) => pre + cur, 0);
        _arr.push(sumItem);
    })
    return _arr;
}

// 最长的子字符串不重复字符 的长度
function getlongest(str) {
    let arr = [];
    let Arrlength = 0;
    for (let i = 1; i < str.length; i++) {
        const index = arr.indexOf(str[i]);
        if(index !== -1) {
            arr.splice(0, index+1);
        } 
        arr.push(str[i]);
        Arrlength = Math.max(arr.length, Arrlength);
    };
    return Arrlength;
}

// 数组和最大的子项

// 1. 粗暴
function getLargestSemi(arr) {
    const sumArr = [];
    arr.forEach((itemI, i) => {
        arr.forEach((itemJ, j) => {
            if(i >= j+1) return;
            const _arr = arr.slice(i, j+1);
            console.log(_arr);
            const sum = _arr.reduce((pre,cur) => pre + cur, 0);
            sumArr.push(sum);
        })
    })
    return Math.max.apply(null, sumArr);
}

// 2. 有更好的办法 