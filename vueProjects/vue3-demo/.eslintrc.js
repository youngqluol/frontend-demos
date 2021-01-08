module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: ['standard', 'plugin:vue/recommended'],
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // 允许 async-await
        'generator-star-spacing': 0,
        // 非线上环境允许 debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 引号
        quotes: 0,
        // 需要使用分号
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        // 不 禁用v-html
        'vue/no-v-html': 'off',
        // html中单行内容，不做限制
        'vue/singleline-html-element-content-newline': 'off',
        // html中多行内容，不做限制
        'vue/multiline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': 'off',
        // 组件名必须使用驼峰
        'vue/component-definition-name-casing': 'off',
        // 关闭 属性必须用中划线
        'vue/attribute-hyphenation': 'off',
        // 关闭 自封闭
        'vue/html-self-closing': 'off',
        // class必须换行
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 1,
                multiline: {
                    max: 1,
                    allowFirstLine: true
                }
            }
        ],
        // 强制缩进4个空格
        indent: [
            'off',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1
            }
        ],
        // vue template
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 1,
                switchCase: 1,
                ignores: []
            }
        ],
        // 中缀操作符周围一定有空格
        'space-infix-ops': 2,
        // 不强制使用 ===
        eqeqeq: 1,
        // 不需要优先使用const
        'prefer-const': 0,
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
        'no-trailing-spaces': 0,
        'no-callback-literal': 0,
        'prefer-promise-reject-errors': 0,
        'no-multi-spaces': 0,
        // 允许扩展native对象
        'no-extend-native': 0
    }
};
