<template>
    <ul class="download-app-list"
        :style="styles"
        ref="apps">
        <li v-for="app in appsList"
            :key="app.appId"
            :id="'app_'+app.appId"
            class="app">
            <slot name="app"
                  :app="app">
                <div class="appIcon-wrapper"
                     @click="goDetail(app.appId)">
                    <img :src="app.appInfoMap.iconUrl"
                         :alt="app.appInfoMap.appName" />
                </div>

                <div class="appInfo-wrapper">
                    <p class="appName"
                       @click="goDetail(app.appId)"
                       :style="{'color': mainColor}">{{app.appInfoMap.appName}}</p>

                    <div v-show="app.appInstallStatus === 'downloading'"
                         :style="{background: outerProgressColor}"
                         class="appProgress">
                        <div :style="{width: app.progress, background: innerProgressColor}"
                             class="innerProgress"></div>
                    </div>
                    <div v-show="app.appInstallStatus !== 'downloading'"
                         class="appSize"
                         :style="{'color': subColor}">
                        <div class="appRate"
                             v-show="showScore">
                            <div>
                                <div class="actual"
                                     :style="{'color': actualScoreColor, 'width': app.appInfoMap.scoreWidth}">★★★★★</div>
                                <div class="total"
                                     :style="{'color': totalScoreColor}">★★★★★</div>
                            </div>
                        </div>
                        <div class="appSizeNum">{{app.appInfoMap.sizeDesc}}</div>
                    </div>

                    <p v-show="app.appInstallStatus === 'downloading'"
                       class="appSizeProgress"
                       :style="{'color': subColor}">{{app.curSize}}/{{app.appInfoMap.sizeDesc}}</p>
                    <p v-show="app.appInstallStatus !== 'downloading'"
                       class="appDesc"
                       @click="goDetail(app.appId)"
                       :style="{'color': subColor}">{{app.appInfoMap.shortDesc || app.appInfoMap.summary}}</p>
                </div>

                <download-app-btn :app="app"
                                  :show-progress="showProgress"
                                  @emit-app-status="listenAppStatusUpdate"
                                  :colors="btnColors"
                                  :texts="btnTexts"
                                  :download-add-chance="downloadAddChance"
                                  :open-add-chance="openAddChance"
                                  :download-point="downloadPoint"
                                  :open-point="openPoint"></download-app-btn>
            </slot>
        </li>
    </ul>
</template>

<script>
    import { ActStat, ActUtils as _ } from 'act-js-lib';
    // import * as _ from 'cdo-act-utils';
    import DownloadAppBtn from './downloadAppBtn.vue';
    import * as Constants from './sinkTypeConstants';
    import Mixin from './mixin';
    import local from '../local/mixin'
    // import * as ActStat from 'cdo-act-stat';

    export default {
        name: 'download-app-list',

        mixins: [Mixin, local],

        components: {
            'download-app-btn': DownloadAppBtn
        },

        props: {
            // APP列表
            apps: {
                type: Array,
                default: function() {
                    return [];
                }
            },

            styles: {
                type: Object,
                default: function() {
                    return {};
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

            // 是否下载送次数
            downloadAddChance: {
                type: Boolean,
                default: function() {
                    return false;
                }
            },

            // 是否打开送次数
            openAddChance: {
                type: Boolean,
                default: function() {
                    return false;
                }
            },

            // 主文案颜色
            mainColor: {
                type: String,
                default: function() {
                    return '#333';
                }
            },

            // 子文案颜色
            subColor: {
                type: String,
                default: function() {
                    return '#7f7c7d';
                }
            },

            // 外层进度条颜色
            outerProgressColor: {
                type: String,
                default: function() {
                    return '#eef2f0';
                }
            },

            // 内部进度条颜色
            innerProgressColor: {
                type: String,
                default: function() {
                    return '#2ad181';
                }
            },

            // 是否展示评分
            showScore: {
                type: Boolean,
                default: function() {
                    return false;
                }
            },

            // 实际得分的星星颜色
            actualScoreColor: {
                type: String,
                default: function() {
                    return '#2ad181';
                }
            },

            // 得分栏的背景色
            totalScoreColor: {
                type: String,
                default: function() {
                    return '#e5e5e5';
                }
            },

            // 按钮文字
            btnTexts: {
                type: Object,
                default: function() {
                    return {
                        uninstall: this.$i18n.t('lg.l_downLoadApp.uninstall'), //安装 未下载
                        waitUpdate: this.$i18n.t('lg.l_downLoadApp.waitUpdate'), //安装 未下载
                        downloading: this.$i18n.t('lg.l_downLoadApp.downloading'), //暂停 下载中
                        pause: this.$i18n.t('lg.l_downLoadApp.pause'), //继续 暂停中
                        waiting: this.$i18n.t('lg.l_downLoadApp.waiting'), // 等待中
                        installing: this.$i18n.t('lg.l_downLoadApp.installing'), // 安装中
                        installed: this.$i18n.t('lg.l_downLoadApp.installed') //打开 已安装
                    };
                }
            },

            // 按钮进度样式
            btnColors: {
                type: Object,
                default: function() {
                    return {
                        downloadBtnBg: '#dff8ec',
                        downloadBtnBorderColor: '#dff8ec',
                        downloadBtnTextColor: '#2ad181',
                        openBtnBg: '#2ad181',
                        openBtnBorderColor: '#2ad181',
                        openBtnTextColor: '#fff',
                        tipColor: '#2ad181'
                    };
                }
            },

            sinkType: {
                type: [Number, String],
                default: function() {
                    return Constants.NO_SINK;
                }
            }
        },

        data() {
            return {
                sortedApps: [],
                showProgress: false,
                tmpAppStatuses: {},
                appStatuses: {},
                timer: '',
                delayer: null, //object of setTimeout for input delay trigger
                exposureList: '', // 曝光app数组
            };
        },

        computed: {
            appsList() {
                let list = this.sortedApps || [];
                let finalList = [];
                let statuses = this.appStatuses || {};
                for (let i = 0; i < list.length; i++) {
                    let app = { ...list[i] };
                    let appId = app.appId;
                    if (!app.appInfoMap) {
                        app.appInfoMap = {};
                    } else {
                        app.appInfoMap = { ...app.appInfoMap };
                    }

                    // 更新icon
                    if (app.appInfoMap && _.isString(app.appInfoMap.iconUrl)) {
                        app.appInfoMap.iconUrl = _.addWebpExt(_.clearHttpProtocol(app.appInfoMap.iconUrl), {
                            width: 120
                        });
                    }

                    // 补全其他信息
                    app.appInfoMap.sizeDesc = app.appInfoMap.sizeDesc || '';
                    app.appInfoMap.avgGrade = app.appInfoMap.avgGrade || 0;
                    app.appInfoMap.scoreWidth = (app.appInfoMap.avgGrade / 5) * 100 + '%';

                    // 更新状态
                    if (statuses[appId]) {
                        let appInstallStatus = statuses[appId].appInstallStatus || 'uninstall';
                        let progress = +(statuses[appId].progress || 0);
                        let size = parseFloat(app.appInfoMap.sizeDesc);
                        let unit = app.appInfoMap.sizeDesc.match(/[^\d]*$/)[0];

                        this.$set(app, 'appInstallStatus', appInstallStatus);
                        this.$set(app, 'progress', `${progress}%`);
                        if (progress === 0) {
                            this.$set(app, 'curSize', '0B');
                        } else {
                            this.$set(app, 'curSize', `${Number((progress * size) / 100).toFixed(2)}${unit}`);
                        }
                    } else {
                        this.$set(app, 'appInstallStatus', 'uninstall');
                        this.$set(app, 'progress', '0%');
                        this.$set(app, 'curSize', '0B');
                    }

                    finalList.push({
                        ...app,
                        isExposure: false,
                    });
                }
                return finalList;
            }
        },

        watch: {
            apps: {
                handler(val) {
                    console.log('watch apps');
                    this.sortedApps = this.sortApp(val);
                },
                deep: true
            }
        },

        beforeMount() {
            this.sortedApps = this.sortApp(this.apps);
        },

        mounted() {
            if (document.getElementsByClassName('page')[0]) {
                document.getElementsByClassName('page')[0].addEventListener('scroll', () => {
                    this.debounce(this.exposureApp, 1000);
                });
            }
        },

        methods: {
            /*节流函数*/
            debounce: function(action, delay) {
                clearTimeout(this.delayer);
                this.delayer = setTimeout(function() {
                    action.apply(self, arguments)
                }, delay);
            },

            /*app列表曝光埋点上报*/
            exposureApp: function() {
                this.exposureList = `0-0-${new Date().getTime()}|0-0#`;
                for (let key in this.appsList) {
                    let tempDom = document.getElementById(`app_${this.appsList[key].appId}`);
                    if (tempDom && tempDom.getBoundingClientRect().top >= 0 && tempDom.getBoundingClientRect().bottom <= window.screen.availHeight && !this.appsList[key].isExposure) { // 资源出现在页面中
                        this.exposureList += `${this.appsList[key].appId}-${key}-0-0-0-0&`;
                        this.appsList[key].isExposure = true;
                    }
                }
                if (this.exposureList.match(/&/i)) { // 有新增未曝光app
                    this.exposureList = this.exposureList.slice(0, -1);
                    ActStat.reportExposure(this.exposureList);
                }
            },

            listenAppStatusUpdate(appId, appInstallStatus, progress) {
                this.$set(this.tmpAppStatuses, appId, {
                    appInstallStatus,
                    progress
                });

                if (this.timer) {
                    return;
                }

                this.timer = setTimeout(() => {
                    this.timer = null;
                    this.updateAppStatus();
                }, 180);
            },

            updateAppStatus() {
                console.log('update download app list data');
                for (let appId in this.tmpAppStatuses) {
                    this.$set(this.appStatuses, appId, {
                        appInstallStatus: this.tmpAppStatuses[appId].appInstallStatus,
                        progress: this.tmpAppStatuses[appId].progress
                    });
                }
            }
        }
    };
</script>

<style lang="stylus">
    .download-app-list {
        position: absolute;
        right: 0;
        left: 0;
        overflow: auto;
        padding: 0 .48rem;
        font-size: 12px;

        .app {
            position: relative;
            overflow: hidden;
            padding: .24rem 0;
            white-space: nowrap;
        }

        /* App Icon */
        .appIcon-wrapper {
            position: relative;
            float: left;
            overflow: hidden;
            padding-top: 1.92rem;
            width: 1.92rem;
            height: 0;
            border-radius: 15px;
            font-size: 0;

            img {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 15px;
            }
        }

        /* app信息 */
        .appInfo-wrapper {
            float: left;
            box-sizing: border-box;
            padding-left: .46rem;
            width: 4.8rem;
            height: 1.92rem;

            > * {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .appName {
                margin-top: .11rem;
                font-weight: bold;
                font-size: .42rem;
                line-height: .6rem;
            }

            .appSize,
            .appDesc,
            .appSizeProgress {
                /*width: 4.8rem;*/
            }

            .appSize {
                margin: .04rem 0 .13rem;
                font-size: .3rem;
                line-height: .4rem;
            }

            .appDesc,
            .appSizeProgress {
                font-size: .36rem;
                line-height: .48rem;
            }

            .appProgress {
                overflow: hidden;
                margin: .2rem 0;
                height: .16rem;
                border-radius: 999px;
                background: #eef2f0;

                .innerProgress {
                    height: .16rem;
                    border-radius: 999px;
                    transition: width .1s;
                }
            }

            .appSizeNum {
                display: inline-block;
            }

            .appRate {
                position: relative;
                display: inline-block;
                margin-right: .12rem;
                height: .4rem;
                font-size: .3rem;

                .actual {
                    position: absolute;
                    z-index: 2;
                    overflow: hidden;
                }

                .actual,
                .total {
                    letter-spacing: 2px;
                }
            }
        }

        /* 下载按钮 */
        .download-app-btn {
            position: absolute;
            top: 50%;
            right: 0;
            box-sizing: border-box;
            margin: 0;
            padding: 0 7px;
            min-width: 48px;
            height: 24px;
            outline: 0;
            border-radius: 4px;
            text-align: center;
            font-size: 14px;
            line-height: 24px;
            transform: translateY(-50%);
            overflow: visible;

            .download-app-tip {
                position: absolute;
                right: 0;
                bottom: -24px;
                left: 0;
                text-align: center;
                font-size: 11px;
            }
        }
    }
</style>
