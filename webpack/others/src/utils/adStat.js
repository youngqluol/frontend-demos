/**
 * 广告平台h5数据采集(曝光)接入说明文档： http://doc.myoas.com/pages/viewpage.action?pageId=23007489
 * */
import { JsBridge, ActUtils as _ } from 'act-js-lib';
import {isDev} from './system';
export const init = (selector = '#app') => {
    window._adv = {
        parModuleId: _.getQueryString("pm") || 501,
        platform: 'act',
        abtest: 501,
        posSrc: 2000,
        imei: JsBridge.getImei(),
        ssoid: '',
        model: JsBridge.getModel(),
        osVersion: '',
        romVersion: '',
        androidVersion: '',
        sdkVersion: '',
        appVersion: JsBridge.getAppVersion(),
        networkId: JsBridge.getNetworkType(),
        parPosId: '1-1-1',
        container: selector
    };
    if (!isDev && ['cdofs.oppomobile.com', 'fs-store-test.wanyol.com'].indexOf(window.location.host) !== -1) { //国外不走上报
        let script = document.createElement('script');
        script.src = 'https://adsfs.oppomobile.com/mp/lib/activity_lib/statistics-v3.min.js';
        document.body.appendChild(script);
    }
};
