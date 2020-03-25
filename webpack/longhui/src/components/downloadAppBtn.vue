<template>
    <div @click="click()"
         class="download-app-btn"
         :class="[installStatus]"
         :style="computedStyles"
         :statistics-expose="addAdvStat"
         :adv-id="advId"
         :adv-pkg="packageName"
         :adv-role="1"
         :adv-darea="1"
         :adv-action="advAction"
         :adv-pos="advPos"
         :adv-platform="adType === 'cpdAd' ? 'cpd-app' : false"
         :adv-passthrough="advPassthrough">
        {{btnText}}
        <!-- 下载送积分 -->
        <div :style="{'color': colors.tipColor}"
             v-show="showTip && !(bgs && (bgs.uninstall || bgs.waitUpdate)) && +downloadPoint > 0 && !hasGetDownloadPoint && event === 'download'"
             class="download-app-tip">+{{downloadPoint}}{{t('lg.l_downLoadApp.score')}}</div>
        <!-- 打开送积分 -->
        <div :style="{'color': colors.tipColor}"
             v-show="showTip && !(bgs && (bgs.uninstall || bgs.waitUpdate)) && +openPoint > 0 && +downloadPoint > 0 && !hasGetOpenPoint && event === 'open'"
             class="download-app-tip">+{{openPoint}}{{t('lg.l_downLoadApp.score')}}</div>
        <!-- 仅仅打开才获得积分 -->
        <div :style="{'color': colors.tipColor}"
             v-show="showTip && !(bgs && (bgs.uninstall || bgs.waitUpdate)) && +openPoint > 0 && +downloadPoint === 0 && !hasGetOpenPoint"
             class="download-app-tip">+{{openPoint}}{{t('lg.l_downLoadApp.score')}}
        </div>
    </div>
</template>

<script>
    // import EventBus from 'cdo-act-event-bus';
    import { JsBridge, ActStat, ActUtils as _ } from 'act-js-lib';
    import * as System from '@src/utils/system';
    import Mixin from './mixin';
    import local from '@act-block/local/mixin'
    const ACTION_DOWNLOAD = '1';
    const ACTION_OPEN = '2';

    export default {
        name: 'download-app-btn',
        mixins: [Mixin, local],
        props: {
            app: {
                type: Object,
                default: function() {
                    return {};
                }
            },

            // 下载的前置操作，目前仅支持同步函数
            beforeDownloadFn: {
                type: Function,
                default: function() {
                    return function() {
                        return true;
                    };
                }
            },

            // 打开的前置操作，目前仅支持同步函数
            beforeOpenFn: {
                type: Function,
                default: function() {
                    return function() {
                        return true;
                    };
                }
            },

            afterDownloadFn: {
                type: Function,
                default: function() {
                    return function() {};
                }
            },

            afterOpenFn: {
                type: Function,
                default: function() {
                    return function() {};
                }
            },

            // 下载送积分
            downloadPoint: {
                type: [Number, String],
                default: function() {
                    return 0;
                }
            },

            // 打开送积分
            openPoint: {
                type: [Number, String],
                default: function() {
                    return 0;
                }
            },

            // 下载送次数
            downloadAddChance: {
                type: Boolean,
                default: function() {
                    return false;
                }
            },

            // 打开送次数
            openAddChance: {
                type: Boolean,
                default: function() {
                    return false;
                }
            },

            // 按钮样式
            styles: {
                type: Object,
                default: function() {
                    return {};
                }
            },

            // 按钮不同状态下对应的背景图
            bgs: {
                type: Object,
                default: function() {
                    return {
                        uninstall: '', // 未下载
                        waitUpdate: '', // 有更新
                        downloading: '', // 下载中
                        pause: '', // 暂停中
                        waiting: '', // 等待中
                        installing: '', // 安装中
                        installed: '' // 已安装
                    };
                }
            },

            // 按钮不同状态下对应的文案
            texts: {
                type: Object,
                default: function() {
                    return {
                        uninstall: '下载参与', // 未下载
                        waitUpdate: '', // 有更新
                        downloading: '下载中', // 下载中
                        pause: '继续', // 暂停中
                        waiting: '', // 等待中
                        installing: '', // 安装中
                        installed: '' // 已安装
                    };
                }
            },

            // 按钮颜色
            colors: {
                type: Object,
                default: function() {
                    return {
                        downloadBtnBg: '',
                        downloadBtnBorderColor: '',
                        downloadBtnTextColor: '',
                        openBtnBg: '',
                        openBtnBorderColor: '',
                        openBtnTextColor: '',
                        tipColor: ''
                    };
                }
            },

            // 是否展示进度条
            showProgress: {
                type: Boolean,
                default: function() {
                    return true;
                }
            },

            // 是否展示tip
            showTip: {
                type: Boolean,
                default: function() {
                    return true;
                }
            }
        },

        data: function() {
            return {
                downloadAppThisTime: false, // 本次是否下载过APP
                channel: '',
                clickCbTimer: null, // 点击后触发回调的定时器
                statusTimer: null, // 监听APP状态的定时器
                btnText: '',
                btnBg: '', // 按钮背景色
                btnBorder: '', // 按钮边框颜色
                event: '',
                installStatus: 'uninstall',
                progress: 0,
                hasGetDownloadPoint: false,
                hasGetOpenPoint: false,
                hasReqServer: false, // 请求过服务端下载送次数接口
                downloadFlag: 0, // 0:未触发下载 1:已触发下载，未发放奖励 2:发放奖励
                isCN: true // 国内
            };
        },

        computed: {
            appInfo() {
                return this.app || {};
            },

            computedStyles() {
                let styles = this.styles || {};
                let bgs = this.bgs || {};
                let appStatus = this.installStatus || 'uninstall';
                let progress = this.progress || 0;

                if (bgs.uninstall) {
                    let bgUrl = bgs[appStatus] || bgs.uninstall;

                    switch (appStatus) {
                        case 'waitUpdate':
                        case 'uninstall':
                            bgUrl = bgs.uninstall;
                            break;

                        case 'downloading':
                            bgUrl = bgs.downloading || '';
                            break;

                        case 'pause':
                        case 'waiting':
                            bgUrl = bgs[appStatus] || bgs.waiting || '';
                            break;

                        case 'installing':
                        case 'installed':
                            bgUrl = bgs[appStatus] || bgs.installed || '';
                            break;
                    }

                    styles.backgroundImage = `url(${bgUrl})`;
                    styles.backgroundPosition = 'center';
                    styles.backgroundRepeat = 'no-repeat';
                    styles.backgroundSize = 'contain';
                } else {
                    this.btnTextColor = this.calcTextColor(appStatus);
                    this.btnBg = this.calcBg(appStatus, progress);
                    this.btnBorder = this.calcBorder(appStatus, progress);

                    styles = {
                        ...styles,
                        color: this.btnTextColor,
                        border: this.btnBorder,
                        background: this.btnBg,
                        lineHeight: styles['lineHeight'] ? styles['lineHeight'] : (this.btnBorder ? '22px' : '24px')
                    };
                }

                return styles;
            },

            /* app信息 */

            masterId() {
                return this.appInfo.appId || '';
            },

            packageName() {
                return this.appInfo.pkgName || '';
            },

            pid() {
                return (
                    +(this.appInfo.appInfoMap && this.appInfo.appInfoMap.versionId
                        ? this.appInfo.appInfoMap.versionId
                        : 0) + Math.pow(10, 8)
                );
            },

            /* 商业化信息 */

            addAdvStat() {
                return !!this.appInfo.commerceMap;
            },

            advId() {
                return this.addAdvStat ? this.appInfo.commerceMap.cpdId || '' : false;
            },

            advPos() {
                return this.addAdvStat ? this.appInfo.commerceMap.positionId || '' : false;
            },

            advPassthrough() {
                return this.addAdvStat ? this.appInfo.commerceMap.cpdJson || '' : false;
            },

            advAction() {
                return this.installStatus !== 'installed' ? 2 : this.downloadAppThisTime ? 3 : 1;
            },

            adType() {
                let appInfoMap = this.appInfo.appInfoMap || {};
                return appInfoMap.adType || '';
            },

            border() {
                let colors = this.colors || {};
                return colors.downloadBtnColor ? `1px solid ${colors.downloadBtnColor}` : '';
            }
        },

        watch: {
            bgs: {
                handler(newBgs) {
                    if (newBgs) {
                        for (let key in newBgs) {
                            if (newBgs[key] && typeof newBgs[key] === 'string') {
                                let img = new Image();
                                img.src = newBgs[key];
                            }
                        }
                    }
                },
                deep: true
            }
        },

        beforeMount() {
            let bgs = this.bgs || {};
            if (bgs) {
                for (let key in bgs) {
                    if (bgs[key] && typeof bgs[key] === 'string') {
                        let img = new Image();
                        img.src = bgs[key];
                    }
                }
            }
        },

        mounted() {
            if(!window.pageData) { //没有pageData并且不是国外域名当国内处理
                this.isCN = window.location.host !== 'incdopic.oppomobile.com';
            }else {
                this.isCN = !!(window.pageData && window.pageData.pageMap && window.pageData.pageMap.region === 'CN');
            }
            this.channel = _.getQueryString('channelName') || '';
            let pkg = this.packageName || '';
            this.hasGetDownloadPoint = _.hasDownloadRecord(pkg);
            this.hasGetOpenPoint = _.hasOpenRecord(pkg);
            this.getAppStatus();
        },

        beforeDestroy() {
            clearInterval(this.clickCbTimer);
            clearInterval(this.statusTimer);
        },

        methods: {
            loginGuide() {
                JsBridge.makeToast(this.t('lg.l_downLoadApp.loginGuid'));
            },

            /**
             * 获取APP状态并根据状态判断是否需要添加监控
             * */
            getAppStatus() {
                let params = { masterId: this.masterId, packageName: this.packageName, pid: this.pid };
                let status = JsBridge.getAppStatus(params);
                let progress = JsBridge.getAppProgress(params) || 0;

                console.log('appStatus:');
                console.log(status);
                // console.log(this.downloadFlag);

                this.event = status.event;
                this.installStatus = status.appInstallStatus;
                this.progress = progress;
                // 根据传入的参数展示按钮文字
                this.btnText = this.texts[status.appInstallStatus] || '';

                // emit app status
                this.$emit('emit-app-status', this.masterId, status.appInstallStatus, progress);

                // 展示文字 & 正在下载中
                if (status.appInstallStatus === 'downloading' && this.texts['downloading']) {
                    if (progress >= 0 && progress < 100 && this.showProgress) {
                        this.btnText = `${Number(progress).toFixed(1)}%`;
                    }
                }
                this.btnTextColor = this.calcTextColor(status.appInstallStatus);
                this.btnBg = this.calcBg(status.appInstallStatus, progress);
                this.btnBorder = this.calcBorder(status.appInstallStatus, progress);

                // 下载领奖品  之前是点击下载就领取，现在改为下载后领取
                if (
                    this.isCN && this.downloadFlag === 1 &&
                    (status.appInstallStatus === 'installing' || status.appInstallStatus === 'installed')
                ) { //国内走下载完成
                    // console.log('enter get prize after');
                    this.getPrizeAfterDownload(params);
                    // 下载的后置操作
                    if (this.afterDownloadFn && typeof this.afterDownloadFn === 'function') {
                        this.afterDownloadFn();
                    }
                    //
                    // clearInterval(this.clickCbTimer);
                    // this.clickCbTimer = null;
                }
                if(this.downloadFlag === 1 &&   (status.appInstallStatus === 'downloading' ||
                    status.appInstallStatus === 'installing' ||
                    status.appInstallStatus === 'waiting' ||
                    status.appInstallStatus === 'installed')) {
                    if(!this.isCN) { //海外不走下载完成后送次数和抽奖机会逻辑
                        this.getPrizeAfterDownload(params);
                        // 下载的后置操作
                        if (this.afterDownloadFn && typeof this.afterDownloadFn === 'function') {
                            this.afterDownloadFn();
                        }
                    }
                    clearInterval(this.clickCbTimer);
                    this.clickCbTimer = null;
                }

                // 根据应用状态判断是否增加监控
                if (
                    status.appInstallStatus === 'downloading' ||
                    status.appInstallStatus === 'installing' ||
                    status.appInstallStatus === 'waiting'
                ) {
                    if (!this.statusTimer) {
                        this.statusTimer = setInterval(() => {
                            this.getAppStatus();
                        }, 2000);
                    }
                } else {
                    clearInterval(this.statusTimer);
                    this.statusTimer = null;
                }

                return status;
            },

            click() {
                console.log("click...");
                let params = { masterId: this.masterId, packageName: this.packageName, pid: this.pid };
                let status = this.getAppStatus();

                switch (status.event) {
                    case 'continue':
                    case 'waitUpdate':
                    case 'download':
                        if (this.beforeDownloadFn && !this.beforeDownloadFn()) {
                            console.log('not fit beforeDownloadFn');
                            return;
                        }

                        ActStat.reportDownloadApp(params.packageName);
                        // 添加参与次数统计
                        ActStat.reportJoin()
                        if (this.channel) {
                            ActStat.reportCustom(`download-app-${this.channel}-${params.packageName}`);
                        }

                        if (status.event === 'download') {
                            JsBridge.download(params);
                        } else {
                            JsBridge.continueDownload(this.packageName);
                        }
                        // 只有监听到APP状态变为下载中或者安装中才发放奖励
                        if(!this.downloadFlag && this.isCN) {
                            if (+this.$props.downloadPoint > 0) {
                                JsBridge.makeToast(this.t('lg.l_downLoadApp.downLoadCompleteTip') + '！');
                            }
                            if (this.$props.downloadAddChance) {
                                JsBridge.makeToast(this.t('lg.l_downLoadApp.downLoadCompleteTip2') + '！');
                            }
                        }
                        this.downloadFlag = 1;
                        this.downloadAppThisTime = true;

                        let times;
                        let interval;
                        if ((JsBridge.getNetworkType() || '').toLowerCase() === 'wifi') {
                            // wifi状态下，快速检查四次保证及时获得应用状态
                            times = 4;
                            interval = 300;
                        } else {
                            // 非wifi状态下，连续检查30次，确保用户点击了
                            times = 30;
                            interval = 500;
                        }

                        // 保证多次点击只存在一个点击回调监听器
                        if (!this.clickCbTimer) {
                            this.clickCbTimer = setInterval(() => {
                                if (times-- <= 0) {
                                    clearInterval(this.clickCbTimer);
                                    this.clickCbTimer = null;
                                } else {
                                    this.getAppStatus();
                                }
                            }, interval);
                        }
                        // 2018.11.22 新版广告不需要调用服务端的扣费
                        this.reportAdStat();

                        // H5活动扣费（cpd: 广告按下载收费）,已废弃
                        this.reportCommerceStat();
                        break;

                    case 'open':
                        if (this.beforeOpenFn && !this.beforeOpenFn()) {
                            return;
                        }
                        if (this.downloadFlag <= 0 && this.isCN) { //下载中关闭页面在我的下载管理界面下载完成后再次进来，按钮状态变成打开，这时候应该补发机会
                            let params = { masterId: this.masterId, packageName: this.packageName, pid: this.pid };
                            this.getPrizeAfterDownload(params);
                        }
                        // 打开后送积分
                        if (!_.hasOpenRecord(params.packageName) && JsBridge.isLogin()) {
                            this.addRecord(ACTION_OPEN, params.packageName);
                            if (+this.$props.openPoint > 0) {
                                this.getPoint(ACTION_OPEN, params.packageName);
                            }
                        } else if (!_.hasOpenRecord(params.packageName) && !JsBridge.isLogin()) {
                            this.loginGuide();
                        }

                        // 打开送次数
                        console.log("JsBridge.is", JsBridge.isLogin())
                        if (this.$props.openAddChance && JsBridge.isLogin()) {
                            console.log("打开送次数。。。。")
                            this.addLotteryChance(ACTION_OPEN, params.packageName);
                        } else if (this.$props.openAddChance && !JsBridge.isLogin()) {
                            this.loginGuide();
                        }
                        this.getAppStatus();

                        this.reportAdStat();
                        ActStat.reportOpenApp(params.packageName);
                        // 添加参与次数统计
                        ActStat.reportJoin()
                        if (this.channel) {
                            ActStat.reportCustom(`open-app-${this.channel}-${params.packageName}`);
                        }
                        //打开获取签到抽奖机会
                        this.addSignChance && this.addSignChance(params.packageName);
                        JsBridge.openApp(params.packageName);

                        // 打开的后置操作
                        if (this.afterOpenFn && typeof this.afterOpenFn === 'function') {
                            this.afterOpenFn();
                        }
                        break;

                    case 'pause':
                        JsBridge.pauseDownload(params);
                        setTimeout(() => {
                            this.getAppStatus();
                        }, 0);
                        break;

                    case 'none':
                    default:
                        this.getAppStatus();
                        break;
                }
            },

            /**
             * 领积分
             * */
            getPoint(type = ACTION_DOWNLOAD, pkg = '') {
                this.addRecord(type, pkg);

                if (!JsBridge.isLogin()) {
                    return;
                }

                _.jsonpFn({
                    url: `${System.actDomain}/activity-download/turntable/task/do`,
                    data: {
                        actId: _.getActId(),
                        type,
                        pkgName: pkg,
                        source: JsBridge.getEnv() === 'gamecenter' ? '2' : '1'
                    },
                    encrypt: window.pageData && window.pageData.pageMap ? window.pageData.pageMap.secret : ''
                }).then(
                    (res) => {
                        if (!res.awardName) {
                            this.resetRecord(type, pkg);
                            return;
                        }

                        if (type === ACTION_DOWNLOAD) {
                            if (!this.isCN) {
                                JsBridge.makeToast(this.t('lg.l_downLoadApp.downLoadCompleteTip') + '！');
                            }
                            ActStat.reportCustom('get-point-by-download');
                            this.hasGetDownloadPoint = true;
                        } else if (type === ACTION_OPEN) {
                            this.$OpPopup.messageAlert({
                                type: 'msg',
                                msg: this.t('lg.l_downLoadApp.openTip') + `${res.awardName}！`
                            });
                            ActStat.reportCustom('get-point-by-open');
                            this.hasGetOpenPoint = true;
                        }
                    },
                    (res) => {
                        if (
                            res &&
                            res.code &&
                            (res.code === '36001' || res.code === '36002' || res.code === '36003' || res.code === '36004')
                        ) {
                            // 服务端判定，用户已经领取了奖励
                            type === ACTION_DOWNLOAD ? (this.hasGetDownloadPoint = true) : (this.hasGetOpenPoint = true);
                        } else if (!res || !res.code || res.code === '408' || res.code === '1') {
                            // 网络超时，将操作记录清除
                            this.resetRecord(type, pkg);
                        }
                        if (res && +res.code === 19014) {
                            this.resetRecord(type, pkg);
                            this.getPoint(type, pkg);
                        }else {
                            this.$OpPopup.messageAlert({
                                type: 'msg',
                                msg: res.msg
                            });
                        }
                    }
                );
            },

            /**
             * 获取抽奖次数，每次都想服务端请求来判断是否安装过或下载过
             * */
            addLotteryChance(type = ACTION_DOWNLOAD, pkg = '') {
                this.addRecord(type, pkg);

                if (!JsBridge.isLogin()) {
                    return;
                }

                _.jsonpFn({
                    url: `${System.actDomain}/activity-download/turntable/chance/add`,
                    data: {
                        actId: _.getActId(),
                        type,
                        pkgName: pkg,
                        source: JsBridge.getEnv() === 'gamecenter' ? '2' : '1'
                    },
                    encrypt: window.pageData && window.pageData.pageMap ? window.pageData.pageMap.secret : ''
                }).then(
                    (res) => {
                        console.log("次数的请求接口", res)
                        if (type === ACTION_DOWNLOAD) {
                            ActStat.reportCustom('get-chance-by-download');
                        } else if (type === ACTION_OPEN) {
                            ActStat.reportCustom('get-chance-by-open');
                        }

                        // 在组件中触发‘add-chance-callback’事件
                        this.$emit('add-chance-callback', res.chance || 0);
                        // 通过eventBus全局触发'addLotteryChance'
                        EventBus.$emit('addLotteryChance');
                        JsBridge.makeToast(this.t('lg.l_downLoadApp.addLotteryChance'));
                    },
                    (res) => {
                        this.$OpPopup.messageAlert({
                            type: 'msg',
                            msg: res.msg
                        });
                    }
                );
            },

            /**
             * 添加记录
             * */
            addRecord(type = '', pkg) {
                if (type === ACTION_DOWNLOAD) {
                    _.addDownloadRecord(pkg);
                } else if (type === ACTION_OPEN) {
                    _.addOpenRecord(pkg);
                }
            },

            /**
             * 重置记录
             * */
            resetRecord(type = '', pkg = '') {
                if (type === ACTION_DOWNLOAD) {
                    _.rmDownloadRecord(pkg);
                } else if (type === ACTION_OPEN) {
                    _.rmOpenRecord(pkg);
                }
            },

            /**
             * 完成cpd一次扣费操作
             * 目前只保证"一次"访问中只"扣费一次"
             * */
            reportCommerceStat() {
                let key = `cpd-${this.packageName.replace(/\./g, '_')}`;
                let hasReport = sessionStorage.getItem(key) || '';
                if (!hasReport && this.advId) {
                    _.jsonpFn({
                        url: `${System.actDomain}/activity-resource/commerce/charge`,
                        data: {
                            appId: this.masterId,
                            adId: this.advId,
                            adPos: this.advPos
                        },
                        encrypt: window.pageData && window.pageData.pageMap ? window.pageData.pageMap.secret : ''
                    });
                    sessionStorage.setItem(key, '1');
                }
            },

            // 新版广告上报
            reportAdStat() {
                if (this.advId && this.advPassthrough) {
                    let params = {
                        advId: this.advId,
                        advAppId: this.masterId,
                        advPkg: this.packageName,
                        advPos: this.advPos,
                        advPassthrough: this.advPassthrough,
                        advAction: this.advAction, //打开
                        darea: 1,
                        advRole: 1, //按钮
                        repeat: this.advAction === 3 ? '1' : '' //下载后打开，则当前页不去重
                    };

                    if (this.adType === 'actAd') {
                        params.platform = 'act';

                        window.reporter && window.reporter.triggerClick(params);
                    } else if (this.adType === 'cpdAd') {
                        params.platform = 'cpd-app';

                        window.reporter && window.reporter.triggerDown(params);
                    }
                }
            },

            calcTextColor(installStatus = 'uninstall') {
                let colors = this.$props.colors;
                if (installStatus === 'uninstall' || installStatus === 'waitUpdate') {
                    return colors.downloadBtnTextColor;
                } else {
                    return colors.openBtnTextColor;
                }
            },

            /**
             * 动态计算安装进度的按钮背景色
             * 未下载使用 downloadBtnBg，其余状态使用 openBtnBg
             * */
            calcBg(installStatus = 'uninstall', progress = 0) {
                if (this.$props.bgs.uninstall) {
                    return '';
                }

                let colors = this.$props.colors;
                if (installStatus === 'uninstall' || installStatus === 'waitUpdate') {
                    return colors.downloadBtnBg;
                } else {
                    return colors.openBtnBg;
                }

                /* let colors = this.$props.colors;
                                if (installStatus === 'downloading' && (progress >= 0 && progress < 100)) {
                                    return `-webkit-linear-gradient(left, ${colors.openBtnColor} ${progress}%, ${
                                        colors.downloadBtnColor
                                    } ${progress}%`;
                                } else if (installStatus === 'installed' || installStatus === 'installing') {
                                    return colors.openBtnBg;
                                } else {
                                    return colors.downloadBtnBg;
                                } */
            },

            /**
             * 未下载使用 downloadBtnBroderColor，其余状态使用 openBtnBorderColor
             * */
            calcBorder(installStatus = 'uninstall', progress = 0) {
                return installStatus === 'uninstall' || installStatus === 'waitUpdate'
                    ? (this.colors.downloadBtnBorderColor ? `1px solid ${this.colors.downloadBtnBorderColor}` : '')
                    : (this.colors.openBtnBorderColor ? `1px solid ${this.colors.openBtnBorderColor}` : '');
            },
            getPrizeAfterDownload(params) {
                if(!_.hasDownloadRecord(params.packageName)) {
                    if (JsBridge.isLogin()) {
                        //下载送积分
                        if (+this.$props.downloadPoint > 0) {
                            this.getPoint(ACTION_DOWNLOAD, params.packageName);
                        } else if (!this.$props.downloadAddChance) { // 过滤掉下载送次数的，不然下载送次数也会被提前加记录  游戏下载不送积分，打开才送
                            this.addRecord(ACTION_DOWNLOAD, params.packageName);
                        }
                        this.downloadFlag = 2;
                        //下载送次数
                        console.log("下载送次数")
                        console.log(this.$props.downloadAddChance)
                        console.log("下载送次数")
                        if (this.$props.downloadAddChance && !this.hasReqServer) {
                            this.hasReqServer = true;
                            this.addLotteryChance(ACTION_DOWNLOAD, params.packageName);
                        }
                    } else {
                        this.loginGuide();
                    }
                }
            }
        }
    };
</script>

<style lang="stylus">
    .download-app-btn {
        position: absolute;

        .download-app-tip {
            position: absolute;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
