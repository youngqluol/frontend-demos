/**
 * 系统变量配置
 *
 * 公司内部数据Mock服务: http://doc.myoas.com/pages/viewpage.action?pageId=40078126
 * */

const isDebug = ['development'].indexOf(process.env.NODE_ENV) !== -1; // 是否开启VUE的debug模式
const isDev = isDebug; // 是否使用开发环境的接口
const isMock = false; // 是否使用mock数据

module.exports = {
    isDebug,
    isDev,
    isMock,
    actDomain: getActDomain(),
    cardActId: isDebug ? 'MNdORX' : 'wdLxaw',
    testActId: isDebug ? 'PGB1jX' : 'XzjN7X'
};
function getActDomain() {
    if(isDev) {
        return 'http://cn.activity-test.wanyol.com';
    }
    let actDomain = 'https://iactivity.cdo.oppomobile.com';
    if (typeof window === 'undefined') {
        return '';
    }
    // let region = '';
    if (window && window.pageData && window.pageData.pageMap && window.pageData.pageMap.region) {
        switch (window.pageData.pageMap.region) {
            case 'CN': // 中国大陆
                actDomain = 'https://iactivity.cdo.oppomobile.com';
                break;
            case 'IN': // 印度
                actDomain = 'https://in-activity.oppomobile.com';
                break;
            case 'ID': // 印尼
                actDomain = 'https://id-activity.oppomobile.com';
                break;
            case 'VN': // 越南
                actDomain = 'https://gl-activity.oppomobile.com';
                break;
            case 'TH': // 泰国
                actDomain = 'https://gl-activity.oppomobile.com';
                break;
            case 'PH': // 菲律宾
                actDomain = 'https://gl-activity.oppomobile.com';
                break;
            case 'MY': // 马来西亚
                actDomain = 'https://gl-activity.oppomobile.com';
                break;
            case 'TW': // 台湾
                actDomain = 'https://gl-activity.oppomobile.com';
                break;
            default:
                actDomain = 'https://iactivity.cdo.oppomobile.com';
                break;
        }
    }
    return actDomain;
}
