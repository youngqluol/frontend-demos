// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: ['html'],
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 引号
        quotes: 0,
        // 分号
        semi: 0,
        // 缩进
        indent: 0,
        // 中缀操作符周围不一定有空格
        'space-infix-ops': 1,
        // 不强制使用 ===
        eqeqeq: 1,
        // 大括号风格
        'brace-style': 0,
        // 函数参数前的空格
        'space-before-function-paren': 0,
        // 未定义变量
        'no-undef': 1,
        // 文件尾新行
        'eol-last': 0,
        // 未使用变量
        'no-unused-vars': 1,
        // 注释的空格
        'spaced-comment': 0,
        'keyword-spacing': 0,
        yoda: 0,
        'comma-dangle': 0,
        'no-trailing-spaces': 0,
        'no-callback-literal': 0,
        'prefer-promise-reject-errors': 0,
        'no-multi-spaces': 0,
        "no-extend-native": 0,//允许扩展native对象
    }
};
