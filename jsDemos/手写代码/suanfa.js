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