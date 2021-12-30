const deepClone = (target) => {
    if(typeof target === 'object') {
        const result = Array.isArray(target) ? [] : {};
        for (const key in target) {
            result[key] = typeof target === 'object' ? deepClone(target[key]) : target[key];
        };
        return result;
    }
    return target;
}