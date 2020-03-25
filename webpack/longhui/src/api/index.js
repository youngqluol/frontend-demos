import { JsBridge, ActUtils as _, ActStat } from 'act-js-lib';
import * as System from '../utils/system';
const actId = _.getActId();

export function fetchPageData() {
    let getPromise;
    if (System.isDev) {
        getPromise = _.jsonpFn({
            url: `${System.actDomain}/activity-admin/ebusiness/v2/exindex`,
            data: {
                actId
            }
        })
    } else {
        let pageData = window && window.pageData;
        getPromise = Promise.resolve(pageData)
    }
    return getPromise;
}

export function fetchDownloadNum() {
    return _.jsonpFn({
        url: `${System.actDomain}/activity-welfare/ebusiness/data`,
        data: {
            actId
        }
    })
}

export function updateDownloadNum() {
    return _.jsonpFn({
        url: `${System.actDomain}/activity-welfare/ebusiness/userAct`,
        data: {
            actId
        }
    })
}