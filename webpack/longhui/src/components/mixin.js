import { JsBridge, ActUtils as _ } from 'act-js-lib';
// import * as _ from 'cdo-act-utils';
// import * as JsBridge from 'cdo-js-bridge';
import * as Constants from './sinkTypeConstants';
import * as System from '@src/utils/system';
export default {
    methods: {
        goDetail(id, place) {
            JsBridge.openAppDetail(id, JsBridge.getEnv());
        },

        sortApp(apps) {
            apps = apps || [];

            let operateApps = {};
            let vipList = [];
            let normalList = [];
            let sinkList = [];
            let length = apps.length;

            for (let i = 0; i < length; i++) {
                let app = apps[i];
                let appInfoMap = app.appInfoMap || {};

                if (+appInfoMap.isVip) {
                    vipList.push(app);
                } else if (+app.positionType === 0) {
                    operateApps[app.position] = app;
                } else if (
                    (+this.sinkType === Constants.SINK_INSTALLED && JsBridge.isInstalled(app.pkgName)) ||
                    (+this.sinkType === Constants.SINK_OPEN && _.hasOpenRecord(app.pkgName)) ||
                    (+this.sinkType === Constants.SINK_GET_POINT && ((this.downloadPoint && _.hasDownloadRecord(app.pkgName)) || (this.openPoint && _.hasOpenRecord(app.pkgName)))) ||
                    (+this.sinkType === Constants.NO_SINK) ||
                    (+this.sinkType === Constants.FLOAT_INSTALLED && !JsBridge.isInstalled(app.pkgName)) ||
                    (+this.sinkType === Constants.FLOAT_OPEN && !_.hasOpenRecord(app.pkgName))
                ) {
                    sinkList.push(app);
                } else {
                    normalList.push(app);
                }
            }

            let finalApps = [];
            for (let i = vipList.length + 1; i < length + 2; i++) {
                if (operateApps[i]) {
                    finalApps.push(operateApps[i]);
                } else if (normalList.length > 0) {
                    finalApps.push(normalList.shift());
                } else if (sinkList.length > 0) {
                    finalApps.push(sinkList.shift());
                }
            }
            finalApps = vipList.concat(finalApps);

            return finalApps;
        },
        /**
         * 添加签到领奖机会
         * @param {*} pkg  app|快应用|快游戏包名
         */
        addSignChance(pkg) {
            if (!window.hasCumulativeSignCom) {
                return;
            }
            if (window.sessionStorage.getItem('hasAddSignChance')) {
                return;
            }
            return _.jsonpFn({
                url: `${System.actDomain}/activity-page/info/event/v1`,
                data: {
                    type: 2, //目前只是打开才算
                    actId: _.getActId(),
                    packageNames: pkg
                },
                encrypt: window.pageData && window.pageData.pageMap ? window.pageData.pageMap.secret : ''
            }).then(
                (res) => {
                    if (+res.code === 1001) {
                        window.sessionStorage.setItem('hasAddSignChance', 1);
                    }
                },
                (res) => {
                    console.log(res);
                }
            );
        }
    }
};
