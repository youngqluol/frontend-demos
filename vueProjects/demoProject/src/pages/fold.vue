<template>
    <div>
        <div class="wrapper">
            <span v-html="text1"></span>
        </div>
        <button @click="handle">insertText</button>
        <div id="box"></div>
        <div id="box2"
             v-html="text2"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            text1: '换行换行换行换行换r sad sss行换行行换行换行换换行换行换行换行换行换行行换行换行换行换行换行换行换行换行换',
            text2: ''
        };
    },

    methods: {
        /**
         * @params wrapperWidth 容器宽度
         * @params text 内容
         * @params isSecond 是否第二行
         *
         */
        handleText(wrapperWidth, text, isSecond = false) {
            if (!text || !wrapperWidth) {
                return {
                    firstLineText: '',
                    otherText: ''
                };
            }
            const _text = text;
            const span = document.createElement('span');
            span.style['white-space'] = 'nowrap'; //不换行
            let innerText = '';
            let firstLineText = '';
            let otherText = '';
            for (let i = 0; i < _text.length; i++) {
                isSecond && (innerText = innerText.replace(/\.\.\./, '')); // 去掉结尾的...
                innerText += isSecond ? _text[i] + '...' : _text[i]; // 结尾加上...再去判断
                span.innerHTML = innerText;
                box.appendChild(span);
                console.log(span.offsetWidth);
                // span的宽度超过box宽度或遇到换行符，则表示需要换行
                if (span.offsetWidth >= wrapperWidth || _text[i] === '<') {
                    if (isSecond) {
                        if (span.offsetWidth > wrapperWidth) {
                            firstLineText = text.slice(0, i) + '...<br>';
                            otherText = text.slice(i + 1);
                        } else if (span.offsetWidth === wrapperWidth) {
                            firstLineText = text.slice(0, i + 1) + '...<br>';
                            otherText = text.slice(i + 2);
                        } else if (_text[i] === '<') {
                            firstLineText = text.slice(0, i) + '...<br>';
                            otherText = text.slice(i + 4);
                        }
                    } else {
                        if (span.offsetWidth > wrapperWidth) {
                            firstLineText = text.slice(0, i);
                            otherText = text.slice(i + 1);
                        } else if (span.offsetWidth === wrapperWidth) {
                            firstLineText = text.slice(0, i + 1);
                            otherText = text.slice(i + 2);
                        } else if (_text[i] === '<') {
                            firstLineText = text.slice(0, i);
                            otherText = text.slice(i + 4);
                        }
                    }
                    box.removeChild(span);
                    break;
                }
                box.removeChild(span);
            }
            console.log('firstLineText', firstLineText);
            console.log('otherText', otherText);
            return {
                firstLineText: firstLineText || _text,
                otherText
            };
        },

        handle() {
            const box = document.querySelector('#box');
            const boxWidth = box.offsetWidth;
            const imageWidth = 40; // for test
            console.log('boxWidth', boxWidth);
            const texts1 = this.handleText(boxWidth, this.text1);
            const firstLineText = texts1.firstLineText; // 第一行text
            const otherText = texts1.otherText;
            const texts2 = this.handleText(
                boxWidth - imageWidth,
                otherText,
                true
            );
            const secondLineText = texts2.firstLineText; // 第二行text
            const otherText2 = texts2.otherText; // 剩下的text
            const finalText =
                firstLineText + '<br>' + secondLineText + otherText2;
            this.text2 = finalText;
        },

        test(param) {
            return param => {
                console.log(param);
            };
        }
    }
};
</script>
<style lang="less">
    .wrapper {
        width: 8rem;
        margin: 0 auto;
        height: auto;
        box-sizing: border-box;
        border: 1px solid red;

        span {
            display: inline-block;
            width: 100%;
        }
    }

    #box {
        width: 8rem;
        height: auto;
        word-wrap: break-word;
    }

    #box2 {
        width: 100%;
        height: auto;
        border: 1px solid red;
    }
</style>