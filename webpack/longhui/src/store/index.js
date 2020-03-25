import Vuex from 'vuex';
import Vue from 'vue';
import { fetchPageData, fetchDownloadNum } from '../api'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appLists: [],
        endTime: ''
    },
    mutations: {
        updateState(state, payload) {
            for(let key in payload) {
                Vue.set(state, key, payload[key])
            }
        }
    },
    actions: {
        fetchPageData({ state, commit, dispatch }) {
            return fetchPageData().then(
                res => {
                    let appLists = res && res.actList;
                    let endTime = res && res.actMap && res.actMap.actEndTime;
                    dispatch('fetchDownloadNum').then(res => {
                        let numList = res && res.datas;
                        console.log(numList);
                        appLists.forEach(appList => {
                            appList = appList.positionListList;
                            appList.forEach(app => {
                                app = app.exclusiveList[0];
                                app.appId = app.gameMasterid;
                                app.pkgName = app.gamePackage;
                                numList.forEach(num => {
                                    if (+num.masterId === +app.gameMasterid) {
                                        app.downloadNum = num.pv
                                    }
                                })
                            })
                        })
                        commit("updateState", {
                            appLists,
                            endTime
                        })
                    })
                    
                    console.log(state)
                },
                err => {
                    console.log(err)
                }
            )
        },
        fetchDownloadNum({ state, commit, dispatch }) {
            return fetchDownloadNum()
        }
    }
})